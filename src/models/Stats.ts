import { IUser, User } from "@ebenos2/framework";
import { IViberSender } from "@ebenos2/viber-adapter";
import { Schema, model, Document } from "mongoose";

const StatsSchema = new Schema(
    {
        text: String,
        generated: Array,
        selected: Object,
        realistic: Number,
        accuracy: Number,
    },
    { timestamps: true }
);

interface IGeneratedImage {
    model: string;
    url: string;
}
export interface IStats extends IUser {
    text: string;
    generated: IGeneratedImage[];
    selected: IGeneratedImage;
    realistic: number;
    accuracy: number;
}

export const StatsModel = model<IStats & Document>("Stats", StatsSchema);

export default class Stats extends StatsModel {
    public async AddSelected(urlSelected: string): Promise<void> {
        const selected = this.generated.filter(
            ({ url }) => url === urlSelected
        )[0];
        this.update({ selected }).exec();
    }
    public async AddRealistic(realistic: number): Promise<void> {
        this.update({ realistic }).exec();
    }
    public async AddAccuracy(accuracy: number): Promise<void> {
        this.update({ accuracy }).exec();
    }
    public static async get(id: string): Promise<Stats> {
        const sta = await this.findById(id);
        if (sta) return new Stats(sta);
        else throw Error("Wrong Id");
    }
}
