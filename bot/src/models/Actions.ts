import { Schema, model, Document } from "mongoose";

export interface IAction {
    id: string;
    action: string;
    text?: string;
}

const actionSchema = new Schema(
    {
        id: String,
        action: String,
        text: String,
    },
    { timestamps: true }
);

export const ActionsModel = model<IAction & Document>("actions", actionSchema);

export default class Actions extends ActionsModel {}
