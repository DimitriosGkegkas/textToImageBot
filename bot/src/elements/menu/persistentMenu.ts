import { options } from "../style/menuStyle";
import keyboard from "./KeyboardHandler";

export default () =>
    keyboard.createKeyboard({
        dimensions: { width: 6, height: 2 },
        BgColor: "#FFFFFF",
        layout: [
            { id: "empty", width: 1, height: 1, options },
            { id: "text", width: 1, height: 1, options },
            { id: "carousel", width: 2, height: 1, options },
            { id: "location", width: 2, height: 1, options },
            { id: "phone", width: 2, height: 1, options },
            { id: "richMedia", width: 1, height: 1, options },
            { id: "button", width: 1, height: 1, options },
            { id: "tracking", width: 2, height: 1, options },
        ],
    });
