import { Router } from "express";
import mongoose from "mongoose";
import Message from "../../models/Messages";
import { UserModel } from "../../models/User";
import { sendAlert } from "../../scripts/broadcastAlert";

const router = Router();

async function sendMessage(req: any, res: any) {
    if (!req.params.id)
        return res.status(400).json({ error: "No id provided" });

    const msg = (await Message.findOne({
        _id: req.params.id,
    })) as Message;

    const filter = {
        $or: JSON.parse(req.query.filter).preferences.map((id: any) => {
            if (id === "all") return {};
            return { tag: id };
        }),
        mute: false,
        subscribe: true,
    };

    const userIDs = await UserModel.find(filter);

    if (!msg) return res.status(400).json({ error: "id does not exists" });

    const stats = await sendAlert(
        msg.serialize(),
        userIDs.map(({ id }) => id)
    );
    if (stats.success) {
        msg.sent({
            sendTo: stats.sendTo ? stats.sendTo : 0,
            totalUser: stats.totalUser ? stats.totalUser : 0,
        });
        await msg.save();
        return res.status(200).send(JSON.stringify(stats));
    } else {
        res.status(500).send(JSON.stringify(stats));
    }
}

async function sendTestMessage(req: any, res: any) {
    console.log(req.params.id);
    const filter = {
        $or: req.body.users.map((user: any) => {
            return { id: user.id };
        }),
    };
    const prefs = await UserModel.find(filter).exec();
    const userIDs = prefs.map((pref: any) => pref.id);

    const msg = (await Message.findOne({
        _id: req.params.id,
    })) as Message;

    if (msg) {
        const stats = await sendAlert(msg.serialize(), userIDs);
        if (stats.success) {
            return res.status(200).send(JSON.stringify(stats));
        } else {
            return res.status(500).send(JSON.stringify(stats));
        }
    }
}

function validateID(req: any, res: any, next: any) {
    if (mongoose.isValidObjectId(req.params.id)) return next();
    return res.status(400).json({ error: "Invalid id!" });
}

router.use("/:id/", validateID);
router.post("/:id/test", sendTestMessage);
router.get("/:id/send", sendMessage);
export default router;
