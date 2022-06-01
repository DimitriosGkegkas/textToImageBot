import { connect } from "mongoose";
import { viberConfig } from "../secret";
import { adminUser } from "../secret";
import Admin from "../models/Admin";

(async () => {
    await dbConnect();
    try {
        await new Admin(adminUser).save();
        console.log("Saved First User");
    } catch {
        console.log("User Already Exists");
    }
    process.exit(0);
})();

async function dbConnect(): Promise<void> {
    try {
        await connect(`${viberConfig.mongodb_uri}`, {});
        console.log("[INFO] Connected to DB");
    } catch (error: any) {
        throw new Error(error);
    }
}
