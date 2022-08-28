import colors from "../style/colors";
import { options } from "../style/menuStyle";
import KeyboardHandler from "./KeyboardHandler/KeyboardHandler";

const keyboard = new KeyboardHandler();

export default () =>
    keyboard.createKeyboard({
        dimensions: { width: 6, height: 3 },
        BgColor: colors.main,
        layout: [
            { id: "createImage", width: 4, height: 1, options },
            { id: "about", width: 2, height: 1, options },
        ],
        inputField: "hidden",
    });

export { keyboard };
