import axios from 'axios';
import * as delay from "delay";
import sequelize from "../infrastructure/sequelize";
import {convertToJSON, getTotalPage, substringBefore} from "../utils/utils";
import ItemCd from "../model/sequelize/ItemCd.model";

// ?id=2762&passwd=garak1013!&dataid=getPrice4_fruitsItem&pagesize=10&pageidx=1&portal.templet=false
const axiosInstance = axios.create({ baseURL: 'https://www.garak.co.kr/publicdata/dataOpen.do' });
const defaultParameters = {
    id: 2762,
    passwd: 'garak1013!',
    dataid: 'getPrice4_fruitsItem',
    pagesize: 10,
    'portal.templet': false,
};
const dateFormat = 'YYYYMMDD';

(async () => {
    console.log(`Collect "Item Code" is started.`);

    await sequelize.sync({ force: false });

    const pageRequest = await axiosInstance.get('', { params: { ...defaultParameters, pageidx: 1 }});
    const parsedJSON = convertToJSON(pageRequest.data);
    const totalPage = getTotalPage(parsedJSON);

    for (let page = 1; page <= totalPage; page++) {
        axiosInstance.get('', { params: { ...defaultParameters, pageidx: page }})
            .then(({ data }) => {
                const { lists } = convertToJSON(data);
                Array.from(lists.list)
                    .forEach(item => {
                        // @ts-ignore
                        const { FULLCODE, PUM_CD, UNIT_QTY, UNIT_CD, PUM_NM } = item;
                        //console.log(item);
                        ItemCd.create({
                            fullCode: FULLCODE._text,
                            itemCd: PUM_CD._text,
                            unitQty: UNIT_QTY._text,
                            unitCd: UNIT_CD._text,
                            itemNmFull: PUM_NM._text,
                            itemNm: substringBefore(PUM_NM._text, ' '),
                        })
                        .then(() => console.log(`${PUM_CD._text} | ${PUM_NM._text}`))
                        .catch(err => console.log(err));
                    });
            })
            .catch(err => console.log(err));
        await delay(250);
    }
})();


