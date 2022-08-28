import {
    Button,
    ActionType,
    OpenURLMediaType,
    OpenURLType,
    IInternalBrowser,
    InternalBrowserMode,
    Keyboard,
    InputFieldState,
    IButtonOptions,
} from "@ebenos2/viber-elements";
import colors from "../../style/colors";
import {
    DeepPartial,
    IButtonsSet,
    IDimension,
    ILayout,
    IStyleOptions,
    ITextOptions,
} from "./interface";

export default class KeyboardHandler {
    buttons: IButtonsSet = {};

    postback(
        id: string,
        { ActionBody }: { ActionBody: string },
        textOptions: ITextOptions = {},
        styleOptions: IStyleOptions = {}
    ): void {
        this.action(id, {
            ActionBody,
            ActionType: "reply",
        });
        this.text(id, textOptions);
        this.style(id, styleOptions);
    }

    location(
        id: string,
        { ActionBody }: { ActionBody: string },
        textOptions: ITextOptions = {},
        styleOptions: IStyleOptions = {}
    ): void {
        this.action(id, {
            ActionType: "location-picker",
            ActionBody,
        });
        this.text(id, textOptions);
        this.style(id, styleOptions);
    }

    phone(
        id: string,
        { ActionBody }: { ActionBody: string },
        textOptions: ITextOptions = {},
        styleOptions: IStyleOptions = {}
    ): void {
        this.action(id, {
            ActionType: "share-phone",
            ActionBody,
        });
        this.text(id, textOptions);
        this.style(id, styleOptions);
    }

    openUrl(
        id: string,
        {
            Url,
            WindowSize = "fullscreen",
            external = false,
        }: {
            Url: string;
            WindowSize?: InternalBrowserMode;
            external?: boolean;
        },
        textOptions: ITextOptions = {},
        styleOptions: IStyleOptions = {}
    ): void {
        this.action(id, {
            ActionBody: Url,
            ActionType: "open-url",
            OpenURLType: external ? "external" : "internal",
            InternalBrowser: {
                Mode: WindowSize,
            },
        });
        this.text(id, textOptions);
        this.style(id, styleOptions);
    }

    empty(
        id: string,
        textOptions: ITextOptions = {},
        styleOptions: IStyleOptions = {}
    ): void {
        this.action(id, { ActionBody: "", ActionType: "none" });
        this.text(id, textOptions);
        this.style(id, styleOptions);
    }

    text(
        id: string,
        {
            Text = "",
            TextSize,
            TextVAlign,
            TextHAlign,
            TextColor = colors.black,
            Silent = true,
            TextOpacity = 100,
            TextPaddings,
            TextBgGradientColor,
            TextShouldFit,
        }: ITextOptions
    ): void {
        this.buttons[id] = {
            ...this.buttons[id],
            Text: "<font color='" + TextColor + "'>" + Text + "</font>",
            TextSize,
            TextVAlign,
            TextHAlign,
            Silent,
            TextOpacity,
            TextPaddings,
            TextBgGradientColor,
            TextShouldFit,
        };
    }

    style(
        id: string,
        { Frame, BgColor, BgMedia, BgMediaType }: IStyleOptions
    ): void {
        this.buttons[id] = {
            ...this.buttons[id],
            Frame,
            BgColor,
            BgMedia,
            BgMediaType,
        };
    }

    action(
        id: string,
        {
            ActionType,
            ActionBody,
            OpenURLMediaType,
            OpenURLType,
            InternalBrowser,
        }: {
            ActionType?: ActionType;
            ActionBody?: string;
            OpenURLMediaType?: OpenURLMediaType;
            OpenURLType?: OpenURLType;
            InternalBrowser?: IInternalBrowser;
        }
    ): void {
        this.buttons[id] = {
            ...this.buttons[id],
            ActionType,
            ActionBody,
            OpenURLMediaType,
            OpenURLType,
            InternalBrowser,
        };
    }

    global(options: DeepPartial<IButtonOptions>): void {
        Object.keys(this.buttons).forEach((id: string): void => {
            this.buttons[id] = { ...this.buttons[id], ...options };
        });
    }

    general(id: string, options: DeepPartial<IButtonOptions>): void {
        this.buttons[id] = { ...this.buttons[id], ...options };
    }

    createKeyboard({
        dimensions,
        layout,
        BgColor,
        inputField,
    }: {
        dimensions: IDimension;
        layout: ILayout[];
        BgColor: string;
        inputField?: InputFieldState;
    }): Keyboard {
        return new Keyboard({
            ButtonsGroupRows: dimensions.height,
            ButtonsGroupColumns: dimensions.width,
            BgColor: BgColor,
            Buttons: layout.map(
                ({ width, height, id, BgMedia, options }: ILayout) => {
                    if (!this.buttons[id])
                        throw Error(`This button ID ${id} is not Defined`);
                    this.buttons[id].BgMedia =
                        this.buttons[id].BgMedia || BgMedia;
                    return new Button({
                        ...this.buttons[id],
                        ...options,
                        Columns: width,
                        Rows: height,
                    } as IButtonOptions);
                }
            ),
            InputFieldState: inputField,
        });
    }
}
