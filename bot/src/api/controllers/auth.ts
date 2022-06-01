import jwt from "jsonwebtoken";
import { passPhrase } from "../../secret";
import Admin from "../../models/Admin";

async function login(req: any, res: any): Promise<any> {
    console.log(req.body);
    const userCheck = await Admin.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if (userCheck) {
        const payload = {
            username: req.body.username,
        };
        const token = jwt.sign(payload, passPhrase, {
            expiresIn: "1440 minutes", // expires in 24 hours
        });
        return res.json({
            success: true,
            message: "You are now logged in!",
            token,
        });
    }
    return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
    });
}
/**
 * Middleware for protecting Routes
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function protectRoutes(req: any, res: any, next: any): any {
    const token =
        req.body?.token || req.query?.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, passPhrase, (err: any, decoded: any) => {
            if (err)
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({
            success: false,
            message: "No token provided.",
        });
    }
}

export default {
    login,
    protectRoutes,
};
