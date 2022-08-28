import colors from "../style/colors";
import { options } from "../style/menuStyle";
import KeyboardHandler from "./KeyboardHandler/KeyboardHandler";
import { keyboard } from "./main";

export default () =>
    keyboard.createKeyboard({
        dimensions: { width: 6, height: 3 },
        BgColor: colors.main,
        layout: [
            { id: "return", width: 2, height: 1, options },
            { id: "default", width: 4, height: 1, options },
        ],
    });

keyboard.postback(
    "return",
    { ActionBody: "START" },
    {},
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-1_03-e1654435103876.png",
    }
);

keyboard.postback(
    "default",
    { ActionBody: "An avocado shaped like a chair" },
    {
        Text: "An avocado shaped like a chair",
        TextOpacity: 0,
        Silent: false,
    },
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-1_04.png",
    }
);

export { keyboard };
