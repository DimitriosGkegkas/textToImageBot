import { connect } from "mongoose";
import { adapter } from "./bot";
import { viberConfig } from "./secret";

console.log("Listening...");
console.log("Setting up webhook...");

adapter.webhook.listen(viberConfig.port);
(async () => {
    await connect(`${viberConfig.mongodb_uri}?retryWrites=true&w=majority`);
    console.log("Database connected!");
    await adapter.setWebhook(viberConfig.webhook_domain, [
        "subscribed",
        "unsubscribed",
        "conversation_started",
    ]);
    console.log("Ready!");
})();
