import { bot } from "../../bot";
import { addAction, addTextRule, IPayload } from "@ebenos2/framework";
import persistentKeyboard, { keyboard } from "../../elements/menu/main";
import { sender } from "../../elements/sender/main";
import User from "../../models/User";
import fetch from "node-fetch";
import { Message } from "@ebenos2/viber-elements";
import start from "./";

keyboard.postback(
    "toonToReal",
    { ActionBody: "toonToReal" },
    {
        Text: "What is the Toon to Real problem?",
        Silent: false,
    },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu_04-1.png",
    }
);
addAction(start, toon2real);
addTextRule(start, toon2real, /TOONTOREAL/);
async function toon2real(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Info about toon to real",
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.postback(
    "textToImage",
    { ActionBody: "textToImage" },
    {
        Text: "What is the text to Image problem?",
        Silent: false,
    },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu_06.png",
    }
);
addAction(start, text2image);
addTextRule(start, text2image, /TEXTTOIMAGE/);
async function text2image(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Info about text to image",
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.postback(
    "gans",
    { ActionBody: "gans" },
    {
        Text: "What are GANs?",
        Silent: false,
    },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu_05-1.png",
    }
);

addAction(start, gans);
addTextRule(start, gans, /GANS/);
async function gans(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "Info about Gans",
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

keyboard.postback(
    "about",
    { ActionBody: "about" },
    {
        Text: "What is this project about?",
        Silent: false,
    },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-2_02.png",
    }
);

addAction(start, about);
addTextRule(start, about, /ABOUT/);
async function about(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: "This is a novel project for my Diploma Thesis. Is uses a GAN AI model to Generate Images based on what ever comes on your mind. I have not developed or train the model my self, please refer to https://github.com/borisdayma/dalle-mini to check out the amazing work they have done with this text-to-image model",
                sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

addAction(start, startFn);
addTextRule(start, startFn, /START/);
async function startFn(user: User, payload: IPayload) {
    await bot
        .scenario(user)
        .send(
            new Message({
                text: `👋🤖 Welcome! Together we can create a images from text.\nI was created for a Diploma theses but I am more than you can Imagine 🏞`,
                keyboard: persistentKeyboard(),
                sender,
            })
        )
        .end();
}
