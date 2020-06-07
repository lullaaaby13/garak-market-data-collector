import '../infrastructure/connect_mongoose'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios';
import * as convert from 'xml-js';
import * as moment from 'moment';
import MajoyProducePriceModel from "../model/MajoyProducePriceModel";
import {appRootPath} from "../utils/appRootPath";
import * as delay from "delay";

// http://www.garak.co.kr/publicdata/dataOpen.do?id=2759&passwd=gkdl!9gpffh0&dataid=data4&pagesize=10
// &pageidx=1&portal.templet=false&p_ymd=20140430&p_jymd=20140429&d_cd=2&p_jjymd=20130429
// &p_pos_gubun=1&pum_nm=

const axiosInstance = axios.create({ baseURL: 'http://www.garak.co.kr/publicdata/dataOpen.do' });
const defaultParameters = {
    id: 2759,
    passwd: 'gkdl!9gpffh0',
    dataid: 'data4',
    pagesize: 10,
    'portal.templet': false,
    d_cd: 2,
    p_pos_gubun: 1
};
const dateFormat = 'YYYYMMDD';

(async () => {

    const startDate = moment("20150701", dateFormat);
    const finishDate = moment().startOf('day');

    const p_ymd = startDate.clone();
    const p_jymd = startDate.clone().subtract('1', 'year');
    const p_jjymd = startDate.clone().subtract('2', 'year');

    while (true) {

        const dateParameter = {
            p_ymd: p_ymd.format(dateFormat),
            p_jymd: p_jymd.format(dateFormat),
            p_jjymd: p_jjymd.format(dateFormat)
        };

        console.log(`${dateParameter.p_ymd} 수집 시작`);

        const pageRequest = await axiosInstance.get('', { params: { ...defaultParameters, ...dateParameter, pageidx: 1 }});
        const parsedJSON = convertToJSON(pageRequest.data);
        const totalPage = getTotalPage(parsedJSON);

        for (let page = 1; page <= totalPage; page++) {
            const { data} = await axiosInstance.get('', { params: { ...defaultParameters, ...dateParameter, pageidx: page }})

            // const curPage = page;
            const converted = convertToJSON(data);

            const requests = Array.from(converted.lists.list).map(element => {
                const document = {};
                const keys = Object.keys(element);
                for (const key of keys) {
                    document[key] = element[key]._text;
                }
                document['BID_DTM'] = p_ymd;
                return document;
            }).map(document => MajoyProducePriceModel.create(document));

            await Promise.all(requests).then(() => console.log(`${dateParameter.p_ymd} 수집 완료`));
        }

        // // 날짜 증가
        p_ymd.add('1', 'day');
        p_jymd.add('1', 'day');
        p_jjymd.add('1', 'day');

        // // CheckLogic
        const targetDateStr = p_ymd.format(dateFormat);
        const finishDateStr = finishDate.format(dateFormat);
        if (targetDateStr === finishDateStr) break;
    }
    console.log(`수집 종료`);
})();

function convertToJSON (xml: string) {
    const replaced = xml.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
    const parsedJSONStr = convert.xml2json(replaced, { compact: true, spaces: 4 });
    return JSON.parse(parsedJSONStr);
}

function getTotalPage (resultObject: any) {
    const listTotalCount = Number.parseInt(resultObject.lists.list_total_count._text);
    return listTotalCount % 10 === 0 ? listTotalCount / 10 : Math.floor(listTotalCount / 10) + 1;
}

function backup(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}