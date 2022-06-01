import { addAction, addTextRule } from "@ebenos2/framework";
import thisModule from ".";
import User from "../../models/User";
import { Wit } from "./wit/Wit";
import { witToken } from "../../secret";
import { WitNLP } from "@ebenos2/framework/build/interfaces/nlp";
import { greetingNLP, fallback } from "./actions";

if (witToken)
    (() => {
        const wit = new Wit(witToken);

        addAction(thisModule, router);
        addTextRule(thisModule, router, /.*/);
        async function router(user: User, payload: any) {
            if (!payload?.text) {
                console.log("No text to process");
                return;
            } else if (payload.text.includes("http")) {
                // This is a url text
                return;
            }
            // Check if
            const meaning: WitNLP | undefined = await wit.meaning(payload.text);
            if (!meaning) return fallback(user);

            // Answer Based on What you expect
            switch (payload?.tracking_data?.expected) {
            }

            // Answer Based on user's Intent
            switch (meaning.intents[0]?.name) {
                case "greeting":
                    return greetingNLP(user);
                default:
                    return fallback(user);
            }
        }
    })();
