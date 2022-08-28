import { bot } from "../../bot";
import { addAction, addTextRule, IPayload } from "@ebenos2/framework";
import start from ".";
import { sender } from "../../elements/sender/main";
import User from "../../models/User";
import fetch from "node-fetch";
import persistentKeyboard, { keyboard } from "../../elements/menu/main";
import resultsMenu from "../../elements/menu/results";
import waitMenu from "../../elements/menu/wait";
import createMenu from "../../elements/menu/create";
import { Button, Message, RichMedia } from "@ebenos2/viber-elements";
import Stats from "../../models/Stats";
import { backendServer } from "../../secret";

keyboard.postback(
    "createImage",
    { ActionBody: "createImage-init" },
    { Text: "Create Image", Silent: false, TextOpacity: 100 },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_01.png",
    }
);
addAction(start, init);
addTextRule(start, init, /CREATEIMAGE-INIT/);
async function init(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "🌌 Tell me what image you want me to create\ne.g. An Avocado shaped like a chair",
                sender,
                keyboard: createMenu(),
            })
        )
        .end();
}

addAction(start, rateImageRealistic);
addTextRule(start, rateImageRealistic, /RATE_ACCURACY/);
async function rateImageRealistic(user: User, payload: IPayload) {
    const stats = await Stats.get(payload.tracking_data?._id);
    await stats.AddAccuracy(parseInt(payload.text.split("_")[2]));
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Was the image realistic?",
                sender,
                keyboard: resultsMenu(),
            })
        )
        .send(
            new Message({
                rich_media: new RichMedia({
                    ButtonsGroupRows: 1,
                    ButtonsGroupColumns: 3,
                    Buttons: [
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_03.png",
                            ActionBody: "rate_real_1",
                            Silent: true,
                            ActionType: "reply",
                        }),
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_04.png",
                            ActionBody: "rate_real_2",
                            Silent: true,
                            ActionType: "reply",
                        }),
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_05.png",
                            ActionBody: "rate_real_3",
                            Silent: true,
                            ActionType: "reply",
                        }),
                    ],
                }),
                sender,
                tracking_data: {
                    _id: stats._id,
                },
                keyboard: resultsMenu(),
            })
        )
        .end();
}

addAction(start, close);
addTextRule(start, close, /RATE_REAL/);
async function close(user: User, payload: IPayload) {
    const stats = await Stats.get(payload.tracking_data?._id);
    await stats.AddRealistic(parseInt(payload.text.split("_")[2]));
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Thank you very much 😄",
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

addAction(start, rateImageAccuracy);
addTextRule(start, rateImageAccuracy, /HTTP:\/\//);
async function rateImageAccuracy(user: User, payload: IPayload) {
    const stats = await Stats.get(payload.tracking_data?._id);
    await stats.AddSelected(payload.text);
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Did the image contain all the elements from the text? ",
                sender,
                keyboard: resultsMenu(),
            })
        )
        .send(
            new Message({
                rich_media: new RichMedia({
                    ButtonsGroupRows: 1,
                    ButtonsGroupColumns: 3,
                    Buttons: [
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_03.png",
                            ActionBody: "rate_accuracy_1",
                            Silent: true,
                            ActionType: "reply",
                        }),
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_04.png",
                            ActionBody: "rate_accuracy_2",
                            Silent: true,
                            ActionType: "reply",
                        }),
                        new Button({
                            Rows: 1,
                            Columns: 1,
                            BgMedia:
                                "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_05.png",
                            ActionBody: "rate_accuracy_3",
                            Silent: true,
                            ActionType: "reply",
                        }),
                    ],
                }),
                sender,
                keyboard: resultsMenu(),
                tracking_data: {
                    _id: stats._id,
                },
            })
        )
        .end();
}

addAction(start, create);
addTextRule(start, create, /.*/);
async function create(user: User, payload: IPayload) {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                text: payload.text,
                num_images: 4,
            }),
        };
        fetch(`${backendServer}/dalle`, requestOptions)
            .then((response) => response.json())
            .then(async ({ generatedImgs }) => {
                const generated = generatedImgs.map((url: any) => {
                    return {
                        model: "mega",
                        url,
                    };
                });
                const { _id } = await new Stats({
                    text: payload.text,
                    generated: generated,
                }).save();
                await bot
                    .scenario(user)
                    .send(
                        new Message({
                            rich_media: new RichMedia({
                                ButtonsGroupRows: 7,
                                ButtonsGroupColumns: 6,
                                Buttons: [
                                    new Button({
                                        Rows: 1,
                                        Columns: 6,
                                        Text: "Choose One",
                                        ActionBody: "rate-3",
                                        ActionType: "reply",
                                    }),
                                    ...generated.map(
                                        ({ url }: any) =>
                                            new Button({
                                                Rows: 3,
                                                Columns: 3,
                                                BgMedia: url,
                                                ActionBody: url,
                                                ActionType: "reply",
                                            })
                                    ),
                                ],
                            }),
                            sender,
                            tracking_data: {
                                _id,
                            },
                            keyboard: resultsMenu(),
                        })
                    )
                    .end();
            })
            .catch(() => {
                bot.scenario(user)
                    .send(
                        new Message({
                            text: "I am sorry but I am unavailable at the moment. 🤔",
                            sender,
                            keyboard: persistentKeyboard(),
                        })
                    )
                    .end();
            });
        bot.scenario(user)
            .send(
                new Message({
                    text: "🧑🏼‍💻 Perfect, I am generating the Images and I'll text back soon.",
                    sender,
                    keyboard: waitMenu(),
                })
            )
            .end();
    } catch {
        bot.scenario(user)
            .send(
                new Message({
                    text: "I am sorry but I am unavailable at the moment 🤔",
                    sender,
                    keyboard: persistentKeyboard(),
                })
            )
            .end();
    }
}

// class Photo {
//     url: string;
//     constructor(url: string) {
//         this.url = url;
//     }
//     serialize() {
//         return {
//             type: "picture",
//             media: this.url,
//             // thumbnail: this.url,
//             keyboard: resultsMenu(),
//             text: "",
//             sender,
//             min_api_version: "7",
//         };
//     }
// }
