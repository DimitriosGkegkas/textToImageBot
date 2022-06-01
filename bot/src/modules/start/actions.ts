import { bot } from "../../bot";
import { addAction, addTextRule, IPayload } from "@ebenos2/framework";
import start from ".";
import persistentKeyboard from "../../elements/menu/persistentMenu";
import { Carousel, Message, Button, RichMedia } from "@ebenos2/viber-elements";
import keyboard from "../../elements/menu/KeyboardHandler";
import { buttonFrame, carouselStyle } from "../../elements/style/carouselStyle";
import { sender } from "../../elements/sender/main";
import User from "../../models/User";

keyboard.empty("empty", { Text: "Empty", TextOpacity: 100, Silent: false });

keyboard.postback(
    "carousel",
    { ActionBody: "carousel" },
    { Text: "Carousel", TextOpacity: 100, Silent: false }
);
addAction(start, carouselFn);
addTextRule(start, carouselFn, /CAROUSEL/);
async function carouselFn(user: User) {
    await bot
        .scenario(user)
        .send(
            new Message({
                rich_media: new Carousel(
                    [
                        {
                            title: "Title 1",
                            subtitle: "Subtitle 1",
                            image: "https://enneas.gr/wp-content/uploads/2020/05/SEO-1.svg",
                            buttons: [
                                {
                                    text: "Btn 1",
                                    url: "https://www.enneas.gr",
                                },
                            ],
                        },
                        {
                            title: "Title 2",
                            subtitle: "Subtitle 2",
                            image: "https://enneas.gr/wp-content/uploads/2020/05/SEO-1.svg",
                            buttons: [
                                {
                                    text: "Btn 2",
                                    url: "https://www.enneas.gr",
                                },
                            ],
                        },
                    ],
                    {
                        style: carouselStyle,
                        frame: buttonFrame,
                    }
                ),
                sender,
                tracking_data: { lastAction: "Carousel" },
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.postback(
    "richMedia",
    { ActionBody: "richmedia" },
    { Text: "Rich Media", TextOpacity: 100, Silent: false }
);
addAction(start, richMediaFn);
addTextRule(start, richMediaFn, /RICHMEDIA/);
async function richMediaFn(user: User) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender,
                tracking_data: { lastAction: "Rich Media" },
                keyboard: persistentKeyboard(),
                media: "https://media.giphy.com/media/2wSblJnaFakthn0BM1/giphy.gif",
            })
        )
        .end();
}

keyboard.postback(
    "button",
    { ActionBody: "button" },
    { Text: "Button", TextOpacity: 100, Silent: false }
);
addAction(start, buttonFn);
addTextRule(start, buttonFn, /BUTTON/);
async function buttonFn(user: User) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender,
                tracking_data: { lastAction: "button" },
                keyboard: persistentKeyboard(),
                rich_media: new RichMedia({
                    ButtonsGroupColumns: 4,
                    ButtonsGroupRows: 1,
                    Buttons: [
                        new Button({
                            Rows: 1,
                            Columns: 4,
                            Text: "press me",
                            ActionType: "open-url",
                            ActionBody: "https://enneas.gr/",
                        }),
                    ],
                }),
            })
        )
        .end();
}

keyboard.location(
    "location",
    { ActionBody: "LOCATION" },
    { Text: "Location", TextOpacity: 100, Silent: false }
);
addAction(start, location);
addTextRule(start, location, /LOCATION/);
async function location(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                tracking_data: { lastAction: "location" },
                text: `I Got your location Lat:${payload.location?.lat} Lon:${payload.location?.lon}`,
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.phone(
    "phone",
    { ActionBody: "PHONE" },
    { Text: "Phone", TextOpacity: 100, Silent: false }
);
addAction(start, phone);
addTextRule(start, phone, /PHONE/);
async function phone(user: User, payload: IPayload) {
    console.log(payload);
    await bot
        .scenario(user)
        .send(
            new Message({
                sender,
                tracking_data: { lastAction: "phone" },
                keyboard: persistentKeyboard(),
                text: `I Got Your phone ${payload.contact?.phone_number}`,
            })
        )
        .end();
}

keyboard.postback(
    "text",
    { ActionBody: "TEXT" },
    { Text: "Text", TextOpacity: 100, Silent: false }
);
addAction(start, text);
addTextRule(start, text, /TEXT/);
async function text(user: User) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Hello, this is just a text msg",
                tracking_data: { lastAction: "text" },
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.postback(
    "tracking",
    { ActionBody: "TRACKING" },
    { Text: "Tracking", TextOpacity: 100, Silent: false }
);
addAction(start, trackingData);
addTextRule(start, trackingData, /TRACKING/);
async function trackingData(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: `I was tracking all you moves you last action was ${payload.tracking_data?.lastAction}`,
                tracking_data: { lastAction: "Tracking" },
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}
