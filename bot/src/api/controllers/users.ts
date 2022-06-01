import { Router } from "express";
import { UserModel } from "../../models/User";
import User from "../../models/User";

const router = Router();
async function find(req: any, res: any) {
    let range = null;
    if (req.query.range) range = JSON.parse(req.query.range);
    const search = req.query.search;

    const [foundMessage, count] = await Promise.all([
        User.retrieve(range, search),
        User.count(),
    ]);
    res.set("X-Total-Count", count);
    return res.json(foundMessage);
}
async function deleteUser(req: any, res: any) {
    if (!req.query?.id) return res.status(200).json({ success: false });
    const success = await User.delete(req.query.id);
    return res.status(200).json({ success });
}
async function toggleAdmin(req: any, res: any) {
    if (!req.query?.id) return res.status(200).json({ success: false });
    const success = await User.toggleAdmin(req.query.id);
    return res.status(200).json({ success });
}

async function getAdmins(req: any, res: any) {
    const testers = await User.getAdmins();
    return res.json({
        testers,
    });
}
async function estimateUsers(req: any, res: any) {
    try {
        const filter = {
            $or: JSON.parse(req.query.filter).preferences.map((id: any) => {
                if (id === "all") return {};
                return { tag: id };
            }),
            mute: false,
            subscribe: true,
        };
        const results = await UserModel.count(filter);
        console.log(results);
        return res.json({
            audience: results,
        });
    } catch (err) {
        return res.json({
            audience: 0,
        });
    }
}
router.get("/", find);
router.post("/delete", deleteUser);
router.get("/admin", getAdmins);
router.post("/toggleAdmin", toggleAdmin);
router.get("/estimate", estimateUsers);
export default router;
