import { Schema, model, Document } from "mongoose";
import { Button, Message, RichMedia } from "@ebenos2/viber-elements";
import colors from "../elements/style/colors";
import { sender } from "../elements/sender/main";

export interface IMessages {
    image_url: string;
    title: string;
    subtitle: string;
    link_url: string;
    cta: string;
    send: boolean;
    sendTo: number;
    totalUser: number;
}

const MessagesSchema = new Schema({
    image_url: String,
    title: String,
    subtitle: String,
    link_url: String,
    cta: String,
    send: Boolean,
    sendTo: Number,
    totalUser: Number,
});

export const MessagesModel = model<IMessages & Document>(
    "Messages",
    MessagesSchema
);

export default class Messages extends MessagesModel {
    constructor(parm: {
        image_url: string;
        title: string;
        subtitle: string;
        link_url: string;
        cta: string;
    }) {
        super({ ...parm, send: false, sendTo: 0, totalUser: 0 });
    }

    public validateMessages(): any {
        try {
            new URL(this.image_url);
            new URL(this.link_url);
        } catch (e) {
            return false;
        }
        if (this.title != "" && this.subtitle != "" && this.cta != "")
            return true;
    }

    public sent(stats: { totalUser: number; sendTo: number }): void {
        this.send = true;
        this.sendTo = stats.sendTo;
        this.totalUser = stats.totalUser;
        this.update();
    }

    static async retrieve(range: number[] | null = null): Promise<any> {
        let usersQuery;
        if (range) {
            if (range[0] == 0) range[0] = 1;
            usersQuery = await this.find({})
                .sort({ _id: -1 })
                .skip(range[0] - 1)
                .limit(range[1] - range[0]);
        } else {
            usersQuery = await this.find({});
        }

        const usersData = await usersQuery;
        return usersData;
    }

    public serialize(): Message {
        return new Message({
            rich_media: new RichMedia({
                ButtonsGroupRows: 7,
                ButtonsGroupColumns: 6,
                Buttons: [
                    new Button({
                        Rows: 4,
                        Columns: 6,
                        ActionType: "open-url",
                        ActionBody: this.link_url,
                        BgMedia: this.image_url,
                        Silent: true,
                    }),
                    new Button({
                        Rows: 2,
                        Columns: 6,
                        ActionType: "open-url",
                        ActionBody: this.link_url,
                        Text: this.title,
                        TextSize: "large",
                        TextShouldFit: true,
                        Silent: true,
                    }),
                    new Button({
                        Rows: 1,
                        Columns: 6,
                        ActionType: "open-url",
                        ActionBody: this.link_url,
                        BgColor: colors.dark,
                        Text: `<font color="#ffffff">${this.cta}</font>`,
                        Silent: true,
                    }),
                ],
            }),
            sender,
        });
    }
}
