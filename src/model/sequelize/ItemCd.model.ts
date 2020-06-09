import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table({ timestamps: true, underscored: true, charset: 'utf8mb4' })
export default class ItemCd extends Model<ItemCd> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    fullCode: string;

    // @Unique
    @Column(DataType.INTEGER)
    itemCd: string;

    @Column(DataType.INTEGER)
    unitQty: string;

    @Column(DataType.STRING)
    unitCd: string;

    @Column(DataType.STRING)
    itemNmFull: string;

    @Column(DataType.STRING)
    itemNm: string;
}