import { UserModel } from "../models/User";
import Stats from "../models/Stats";
import Actions from "../models/Actions";
import { connect } from "mongoose";
import { viberConfig } from "../secret";

(async () => {
    await connect(`${viberConfig.mongodb_uri}`);
    console.log("Database connected!");
    console.log("Ready!");
    console.log("Today is " + new Date());
    try {
        console.log("Creating Stats");
        const userStats = await getUserStats();
        const buttonsStats = await getButtonsStats();
        const linkStats = await getLinkStats();
        const stats = new Stats({
            date: new Date(),
            users: userStats[0],
            unsubcribed: userStats[1],
            subcribed: userStats[2],
            unmuteUsers: userStats[3],
            muteUsers: userStats[4],
            nodailyUsers: userStats[5],
            dailyUsers: userStats[6],
            messages: buttonsStats[0],
            weather: buttonsStats[1],
            liveWeather: buttonsStats[2],
            snow: buttonsStats[3],
            camera: buttonsStats[4],
            links: linkStats[0],
        });
        await stats.save();
        console.log("Stats have been created");
        await Actions.deleteMany({});
        console.log("Clearing All Actions");
        process.exit(0);
    } catch (err) {
        console.log("Something Went Wrong");
        console.log(err);
        process.exit(1);
    }
})();

async function getUserStats() {
    const results = [
        UserModel.countDocuments({}),
        UserModel.countDocuments({ subscribed: false }),
        UserModel.countDocuments({ subscribed: true }),
        UserModel.countDocuments({ mute: false, subscribed: true }),
        UserModel.countDocuments({ mute: true, subscribed: true }),
        UserModel.countDocuments({ dailyWeather: false, subscribed: true }),
        UserModel.countDocuments({ dailyWeather: true, subscribed: true }),
    ];
    return Promise.all(results);
}

async function getButtonsStats() {
    const results = [
        Actions.countDocuments({}),
        Actions.countDocuments({ action: "weather/text" }),
        Actions.countDocuments({ action: "liveWeather/text" }),
        Actions.countDocuments({ action: "snow/text_snow" }),
        Actions.countDocuments({ action: "camera/camera_init" }),
    ];
    return Promise.all(results);
}

async function getLinkStats() {
    const results = [
        Actions.countDocuments({
            action: "GetStarted/link",
            text: { $regex: "meteo", $options: "si" },
        }),
    ];
    return Promise.all(results);
}
