import { Schema, model, Document } from "mongoose";

export interface ITag {
    key: string;
    name: string;
    discription?: string;
    action?: string;
}

const TagSchema = new Schema({
    key: { type: String, unique: true, required: true },
    name: String,
    discription: String,
    action: String,
});

export const TagModel = model<ITag & Document>("Tags", TagSchema);

export default class Tag extends TagModel {
    public static async getAll(): Promise<ITag[]> {
        return await this.find({});
    }
    public static async addTag(params: ITag): Promise<boolean> {
        try {
            const tag = new this(params);
            tag.save();
            return true;
        } catch {
            return false;
        }
    }
}
