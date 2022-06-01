import { Router } from "express";
import Tag from "../../models/Tags";
import User from "../../models/User";

const router = Router();
async function find(req: any, res: any) {
    const tags = await Tag.find({});

    return res.json({ tags });
}
async function addTag(req: any, res: any) {
    if (!req.query?.id || !req.query?.key)
        return res.status(200).json({ success: false });
    await User.addTag(req.query.id, req.query?.key);
    return res.status(200).json({ success: true });
}

async function removeTag(req: any, res: any) {
    if (!req.query?.id || !req.query?.key)
        return res.status(200).json({ success: false });
    await User.removeTag(req.query.id, req.query?.key);
    return res.status(200).json({ success: true });
}

router.get("/", find);
router.post("/", addTag);
router.post("/remove", removeTag);
export default router;
