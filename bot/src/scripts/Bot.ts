import { Bot } from "@ebenos2/framework";
import { Message } from "@ebenos2/viber-elements";
import User from "../models/User";
import { viberConfig } from "../secret";
import { IViberBroadcastMessageResult } from "./broadcast/interfaces/api";
import { broadcastMessage } from "./broadcast/requests";

export class MyBot extends Bot<User> {
    public broadcast(
        broadcast_list: string[],
        messageBody: Message
    ): Promise<IViberBroadcastMessageResult> {
        return broadcastMessage(
            broadcast_list,
            messageBody,
            viberConfig.auth_token
        );
    }
}
