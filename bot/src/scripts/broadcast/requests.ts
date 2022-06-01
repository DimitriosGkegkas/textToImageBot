import { Message } from "@ebenos2/viber-elements";
import { IViberBroadcastMessageResult } from "./interfaces/api";
import viberRequest from "./viberRequest";

export async function broadcastMessage(
    broadcast_list: string[],
    messageBody: Message,
    authToken: string
): Promise<IViberBroadcastMessageResult> {
    const results: IViberBroadcastMessageResult = {
        message_token: "",
        status: 0,
        status_message: "ok",
        failed_list: [],
    };
    for (let i = 0; i < broadcast_list.length; i += 300) {
        const chunk = broadcast_list.slice(i, i + 300);
        const body = {
            broadcast_list: chunk,
            ...messageBody.serialize(),
        };

        const {
            failed_list,
            status,
            message_token,
        }: IViberBroadcastMessageResult = await viberRequest(
            "broadcast_message",
            body,
            authToken
        );
        if (failed_list) results.failed_list?.push(...failed_list);
        if (status != 0) results.status = status;
        results.message_token = message_token;
    }
    return results;
}
