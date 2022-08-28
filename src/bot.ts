import start from "./modules/start";
import {
    IViberConversationStartedEvent,
    IViberSubscribedEvent,
    IViberUnsubscribedEvent,
    ViberAdapter,
} from "@ebenos2/viber-adapter";
import { Bot } from "@ebenos2/framework";
import { Message } from "@ebenos2/viber-elements";
import { viberConfig, witToken } from "./secret";
import persistentKeyboard from "./elements/menu/main";
import User from "./models/User";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import createImage from "./modules/createImage";
import { sender } from "./elements/sender/main";

const welcomeMessage = new Message({
    text: `👋🤖 Welcome! Together we can create a images from text.\nI was created for a Diploma theses but I am more than you can Imagine 🏞`,
    keyboard: persistentKeyboard(),
    sender,
});

export const adapter = new ViberAdapter<User>({
    authToken: viberConfig.auth_token,
    userLoader: User.userLoader,
    webhookHandlers: {
        conversationStartedWebhook: async (
            e: IViberConversationStartedEvent
        ) => {
            return welcomeMessage.serialize() as Record<string, any>;
        },
        unsubscribeWebhook: async (e: IViberUnsubscribedEvent) => {
            const user: User | null = await User.getById(e.user_id);
            if (user) await user.unsubscribe();
            return;
        },
        subscribeWebhook: async (e: IViberSubscribedEvent) => {
            let user: User | null = await User.getById(e.user.id);
            if (!user) {
                user = new User(e.user);
                await user.save();
            }
            await user.subscribe();
            bot.scenario(user).send(welcomeMessage).end();
        },
    },
});

adapter.webhook.use(
    urlencoded({
        extended: true,
    })
);
adapter.webhook.use(json());
adapter.webhook.use(cors());

export const bot = new Bot<User>(adapter, {
    preSendMiddlewares: [preSendMiddlewares],
    postSendMiddlewares: [],
});

bot.addModule(start);
bot.addModule(createImage);

async function preSendMiddlewares(
    action: string,
    user: User,
    rest: any,
    next: () => Promise<any>
) {
    console.log(`User ${user.firstName} trigger actions ${action}`);
    next();
}
