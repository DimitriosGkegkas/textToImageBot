import { Schema, model, Document } from "mongoose";

export interface IStats {
    date: Date;
    users: number;
    unsubcribed: number;
    subcribed: number;
    unmuteUsers: number;
    muteUsers: number;
    nodailyUsers: number;
    dailyUsers: number;
    messages: number;
    weather: number;
    liveWeather: number;
    snow: number;
    camera: number;
    links: Array<any>;
}

const StatsSchema = new Schema({
    date: Date,
    users: Number,
    unsubcribed: Number,
    subcribed: Number,
    unmuteUsers: Number,
    muteUsers: Number,
    nodailyUsers: Number,
    dailyUsers: Number,
    messages: Number,
    weather: Number,
    liveWeather: Number,
    snow: Number,
    camera: Number,
    links: Array,
});

export const StatsModel = model<IStats & Document>("Stats", StatsSchema);

export default class Stats extends StatsModel {}
