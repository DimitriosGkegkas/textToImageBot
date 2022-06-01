import { Schema, model, Document } from "mongoose";

export interface IAdmin {
    username: string;
    password: string;
    allowSend: boolean;
}

const AdminSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    allowSend: Boolean,
});

export const AdminModel = model<IAdmin & Document>("admins", AdminSchema);

export default class Admin extends AdminModel {}
