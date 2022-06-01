import { connect } from "mongoose";
import { viberConfig } from "../secret";
import { bot } from "../bot";
import User from "../models/User";
import { Message } from "@ebenos2/viber-elements";

export async function sendAlert(
    msg: Message,
    userIDs?: string[]
): Promise<any> {
    try {
        await dbConnect();
    } catch {}
    const userList = userIDs ? userIDs : await User.getAllIds();
    const result = await bot.broadcast(userList, msg);
    const fl = result?.failed_list;
    if (fl && result.status === 0) {
        return {
            success: true,
            sendTo: userList.length - fl.length,
            totalUser: userList.length,
            failed_list: result?.failed_list,
        };
    }
    return {
        success: false,
        result,
    };
}

async function dbConnect(): Promise<void> {
    try {
        await connect(`${viberConfig.mongodb_uri}`, {});
        console.log("[INFO] Connected to DB");
    } catch (error: any) {
        throw new Error(error);
    }
}
