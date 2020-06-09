
import * as moment from 'moment';
import ItemCd from "../model/sequelize/ItemCd.model";
import sequelize from "../infrastructure/sequelize";
import AfterBidQuantityRequest from "../model/sequelize/AfterBidQuantityRequest.model";

// http://www.garak.co.kr/publicdata/dataOpen.do?id=2759&passwd=gkdl!9gpffh0&dataid=data4&pagesize=10
// &pageidx=1&portal.templet=false&p_ymd=20140430&p_jymd=20140429&d_cd=2&p_jjymd=20130429
// &p_pos_gubun=1&pum_nm=

const BASE_URL = 'http://www.garak.co.kr/publicdata/dataOpen.do';
const startDateStr = '20150701';

const defaultParameters = {
    id: 2759,
    passwd: 'gkdl!9gpffh0',
    dataid: 'data7',
    pagesize: 10,
    'portal.templet': false,
    s_ycs_gubun: 2,
    s_pos_gubun: 1
};

const dateFormat = 'YYYYMMDD';

(async () => {

    console.log(`Generate after bid quantity request is started.`);

    await sequelize.sync({ force: false });

    let startDate = initStartDate();
    const finishDate = moment().startOf('day');

    const itemCds = await ItemCd.findAll();

    const list = Array.from(itemCds);
    for (const itemCd of list) {

        console.log(`${itemCd.itemNmFull} 시작`);

        while (startDate.isBefore(finishDate)) {
            const bidDtm = startDate.format(dateFormat);
            const params = {
                ...defaultParameters,
                p_jymd: bidDtm,
                s_pum_cd: itemCd.itemCd,
                s_unit_qty: itemCd.unitQty,
                s_unit_cd: itemCd.unitCd,
            }
            const requestURL = makeRequestURL(params);
            await AfterBidQuantityRequest.create({
                bidDtm: bidDtm,
                requestUrl: requestURL,
                isProcessed: 'N',
            });
            // console.log(`${bidDtm} | ${itemCd.itemNmFull}`);
            startDate.add('1', 'day');
        }
        startDate = initStartDate();
    }
})();

function initStartDate() {
    return moment(startDateStr, dateFormat);
}

function makeRequestURL(params: any) {
    let requestURL = `${BASE_URL}?`;
    const keys = Object.keys(params);
    for (const key of keys) {
        const value = params[key];
        requestURL = `${requestURL}${key}=${value}&`;
    }
    return requestURL;
}