import { Schema, model } from 'mongoose';

const surpriseSchema = new Schema({
    day: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String }
});

export const SurpriseModel = model('Surprise', surpriseSchema);