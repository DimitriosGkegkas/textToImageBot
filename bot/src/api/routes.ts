import { Router } from "express";
import auth from "./controllers/auth";
import broadcast from "./controllers/broadcast";
import messages from "./controllers/messages";
import users from "./controllers/users";
import tags from "./controllers/tags";
// import statistics from "./controllers/statistics";
export function routerFactory(): any {
    const router = Router();
    // middleware to use for all requests
    router.use((req: any, res: any, next: any) => {
        // do logging
        console.log(`${req.originalUrl}: ${req.query}`);
        console.log(req.query);

        res.set("Content-Type", "application/json");
        next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get("/", (req: any, res: any) =>
        res.json({
            message: "This is the ENNEAS Chatbot panel API. Welcome :)",
        })
    );

    // Auth
    router.post("/authenticate", auth.login);

    router.use(`/`, auth.protectRoutes);
    router.use(`/messages`, messages);
    router.use(`/broadcast`, broadcast);
    router.use(`/users`, users);
    router.use(`/tags`, tags);

    return router;
}
