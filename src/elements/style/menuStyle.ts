import { IFrame } from "@ebenos2/viber-elements";
import colors from "./colors";

const buttonFrame: IFrame = {
    BorderWidth: 0,
    BorderColor: colors.lessDarkBlue,
    CornerRadius: 0,
};

export const options = {
    Frame: buttonFrame,
    TextOpacity: 0,
    TextShouldFit: true,
};
