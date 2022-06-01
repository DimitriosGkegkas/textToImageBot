import { ICarouselStyle, IFrame } from "@ebenos2/viber-elements";
import colors from "./colors";

export const carouselStyle: ICarouselStyle = {
    title: {
        textColor: colors.white,
        backgroundColor: colors.lessDarkBlue,
    },
    button: {
        textColor: colors.white,
        backgroundColor: colors.redMain,
    },
    subtitle: {
        backgroundColor: colors.lessDarkBlue,
        textColor: colors.white,
    },
    backgroundColor: colors.lessDarkBlue,
    imageBackgroundColor: colors.white,
};

export const buttonFrame: IFrame = {
    BorderWidth: 5,
    BorderColor: colors.lessDarkBlue,
    CornerRadius: 10,
};
