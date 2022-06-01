import User from "../../models/User";
import { bot } from "../../bot";
import { Message } from "@ebenos2/viber-elements";
import { sender } from "../../elements/sender/main";
import persistentKeyboard from "../../elements/menu/persistentMenu";

export async function fallback(user: User): Promise<any> {
    return bot
        .scenario(user)
        .send(
            new Message({
                text: `Γειά σου ${user.firstName}. Δεν έχω ιδέα για τι πράγμμα μιλάς.`,
                sender: sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}

export async function greetingNLP(user: User): Promise<any> {
    return bot
        .scenario(user)
        .send(
            new Message({
                text: `Γειά σου ${user.firstName}. Διάλεξε από το μενού παρακάτω`,
                sender: sender,
                keyboard: persistentKeyboard(),
            })
        )
        .end();
}
