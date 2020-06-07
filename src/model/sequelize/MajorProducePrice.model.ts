import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({ timestamps: true, underscored: true, charset: 'utf8mb4' })
export default class MajorProducePrice extends Model<MajorProducePrice> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    bidDtm: string;

    @Column(DataType.STRING)
    itemNm: string;

    @Column(DataType.INTEGER)
    itemCd: number;

    @Column(DataType.STRING)
    gradeNm: string;

    @Column(DataType.STRING)
    gradeCd: string;

    @Column(DataType.STRING)
    unitNm: string;

    @Column(DataType.STRING)
    unitCd: string;

    @Column(DataType.INTEGER)
    unitQty: number;

    @Column(DataType.DECIMAL)
    avgPrice: number;

    @Column(DataType.DECIMAL)
    ystAvgPrice: number;

    @Column(DataType.DECIMAL)
    preYearAvgPrice: number;

    @Column(DataType.DECIMAL)
    priceChangeToYst: number;

    @Column(DataType.DECIMAL)
    priceChangeToPreYear: number;
}