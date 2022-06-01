import { Router } from "express";
import Message from "../../models/Messages";

const router = Router();
async function find(req: any, res: any) {
    let range = null;
    if (req.query.range) range = JSON.parse(req.query.range);

    const [foundMessage, count] = await Promise.all([
        Message.retrieve(range),
        Message.count(),
    ]);
    res.set("X-Total-Count", count);
    return res.json(foundMessage);
}

async function deleteMessage(req: any, res: any) {
    if (!req.query.id) return res.status(200).json({ success: false });
    try {
        await Message.findOneAndDelete({ _id: req.query.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(200).json({ success: false });
    }
}
async function newMessage(req: any, res: any) {
    const body = req.body;
    console.log(body);
    return new Message({
        image_url: body.image_url,
        title: body.subtitle,
        subtitle: "",
        link_url: body.buttons[0].link_url,
        cta: body.buttons[0].title,
    })
        .save()
        .then(({ _id }) => res.json({ message_id: _id }))
        .catch((error) => {
            res.json({ error });
        });
}

router.get("/", find);
router.post("/delete", deleteMessage);
router.post("/create", newMessage);
export default router;
