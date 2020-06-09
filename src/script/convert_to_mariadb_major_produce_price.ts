import '../infrastructure/connect_mongoose'
import sequelize from "../infrastructure/sequelize";
import MajorProducePriceModel from "../model/mongoose/MajorProducePriceModel";
import MajorProducePrice from "../model/sequelize/MajorProducePrice.model";
import * as moment from 'moment';
import {backupDocument} from "../utils/BackupDocument";

(async () => {
    console.log(`Conver to MongoDB to MariDB of MajorProducePrice is started.`);

    await sequelize.sync({ force: false });

    setInterval(() => {
        MajorProducePrice.count()
            .then(cnt => console.log(`Current rows in MariaDB : ${cnt}`))
    }, 60 * 1000);

    MajorProducePriceModel
        .find()
        .cursor()
        .eachAsync(convertJob, err => console.log(err))
        // .then(() => console.log(`작업 완료`));
})();

async function convertJob(document: any) {
    // @ts-ignore
    const { BID_DTM, PUM_NM_A, PUM_CD, G_NAME_A, E_NAME, U_NAME, UNIT_CD, UNIT_QTY, AV_P_A, PAV_P_A, PAV_PY_A, A_B, A_C } = document;

    const entity = {
        bidDtm: moment(BID_DTM).format('YYYYMMDD'),
        itemNm: PUM_NM_A,
        itemCd: PUM_CD,
        gradeNm: G_NAME_A,
        gradeCd: E_NAME,
        unitNm: U_NAME,
        unitCd: UNIT_CD,
        unitQty: UNIT_QTY,
        avgPrice: AV_P_A,
        ystAvgPrice: PAV_P_A,
        preYearAvgPrice: PAV_PY_A,
        priceChangeToYst: A_B,
        priceChangeToPreYear: A_C,
    };

    MajorProducePrice.create(entity)
        .then(() => { })
        .catch(err => {
            console.log(err);
            backupDocument(entity, `${entity.bidDtm}_${entity.itemNm}`)
        });
}