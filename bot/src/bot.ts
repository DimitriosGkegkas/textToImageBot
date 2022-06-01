import start from "./modules/start";
import { MyBot } from "./scripts/Bot";
import {
    IViberConversationStartedEvent,
    IViberSubscribedEvent,
    IViberUnsubscribedEvent,
    ViberAdapter,
} from "@ebenos2/viber-adapter";
import { Message } from "@ebenos2/viber-elements";
import { viberConfig, witToken } from "./secret";
import persistentKeyboard from "./elements/menu/persistentMenu";
import User from "./models/User";
import { json, urlencoded } from "body-parser";
import { routerFactory } from "./api/routes";
import cors from "cors";
import nlp from "./modules/nlp";

const welcomeMessage = new Message({
    text: `Welcome to this bot.`,
    keyboard: persistentKeyboard(),
    sender: {
        name: "BotName",
    },
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
adapter.webhook.use("/api", routerFactory());

export const bot = new MyBot(adapter, {
    preSendMiddlewares: [preSendMiddlewares],
    postSendMiddlewares: [],
});

bot.addModule(start);
if (witToken) bot.addModule(nlp);

async function preSendMiddlewares(
    action: string,
    user: User,
    rest: any,
    next: () => Promise<any>
) {
    const { text } = rest[0];
    action === "GetStarted/link"
        ? user.saveAction(action, text)
        : user.saveAction(action);
    await user.subscribe();
    next();
}
