import { model, Schema } from 'mongoose';

const MajoyProducePrice = new Schema(
    {
        PUM_NM_A: {
            type: String,
            required: true,
            trim: true,
        },
        PUM_CD: {
            type: Number,
            required: true,
            trim: true,
        },
        G_NAME_A: {
            type: String,
            required: true,
            trim: true,
        },
        UNIT_QTY: {
            type: Number,
            required: true,
            trim: true,
        },
        U_NAME: {
            type: String,
            required: true,
            trim: true,
        },
        AV_P_A: {
            type: Number,
            required: true,
            trim: true,
        },
        PAV_P_A: {
            type: Number,
            required: true,
            trim: true,
        },
        PAV_PY_A: {
            type: Number,
            required: true,
            trim: true,
        },
        A_B: {
            type: Number,
            required: true,
            trim: true,
        },
        A_C: {
            type: Number,
            required: true,
            trim: true,
        },
        E_NAME: {
            type: String,
            required: true,
            trim: true,
        },
        F_NAME: {
            type: String,
            required: true,
            trim: true,
        },
        GRADE_CD: {
            type: String,
            required: true,
            trim: true,
        },
        UNIT_CD: {
            type: String,
            required: true,
            trim: true,
        },

    },
    { timestamps: true },
);

const MajoyProducePriceModel = model('MajoyProducePrice', MajoyProducePrice);

export default MajoyProducePriceModel;