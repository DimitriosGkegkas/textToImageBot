import colors from "../style/colors";
import { options } from "../style/menuStyle";
import KeyboardHandler from "./KeyboardHandler/KeyboardHandler";
import { keyboard } from "./main";

export default () =>
    keyboard.createKeyboard({
        dimensions: { width: 6, height: 3 },
        BgColor: colors.main,
        layout: [
            { id: "banner1", width: 6, height: 1, options },
            // { id: "return", width: 2, height: 1, options },
            // {
            //     id: "createImage",
            //     width: 4,
            //     height: 1,
            //     options: {
            //         ...options,
            //         BgMedia:
            //             "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-1_03-1-e1654435139685.png",
            //     },
            // },
        ],
        inputField: "hidden",
    });

keyboard.empty(
    "banner1",
    {},
    {
        BgMedia:
            "https://cdn.enneas.gr/wp-content/uploads/Articles-menu-1_02.png",
    }
);

export { keyboard };
