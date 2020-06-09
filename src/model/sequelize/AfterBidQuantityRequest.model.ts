import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({ timestamps: true, underscored: true, charset: 'utf8mb4' })
export default class AfterBidQuantityRequest extends Model<AfterBidQuantityRequest> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    bidDtm: string;

    @Column(DataType.STRING)
    requestUrl: string;

    @Column(DataType.STRING)
    isProcessed: string;
}