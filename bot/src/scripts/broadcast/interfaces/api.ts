export interface IViberSendMessageResult {
    status: number;
    status_message?: string;
    message_token: string;
}

export interface IViberBroadcastMessageResult {
    status: number;
    status_message?: string;
    message_token: string;
    failed_list?: IFailedBroadcastMessageReceiver[];
}

export interface IFailedBroadcastMessageReceiver {
    receiver: string;
    status: number;
    status_message: string;
}
