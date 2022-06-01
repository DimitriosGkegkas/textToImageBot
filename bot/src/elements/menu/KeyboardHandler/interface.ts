import {
    Button,
    IButtonOptions,
    IFrame,
    MediaType,
    TextHAlign,
    TextSize,
    TextVAlign,
} from "@ebenos2/viber-elements";

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

export interface IDimension {
    width: number;
    height: number;
}

export interface ILayout extends IDimension {
    id: string;
    BgMedia?: string;
    options?: DeepPartial<IButtonOptions>;
}

export interface IButtonsSet {
    [key: string]: DeepPartial<Button>;
}

export interface ITextOptions {
    Text?: string;
    TextSize?: TextSize;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
    Silent?: boolean;
    TextColor?: string;
    TextPaddings?: number[];
    TextOpacity?: number;
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
}

export interface IStyleOptions {
    Frame?: IFrame;
    BgColor?: string;
    BgMedia?: string;
    BgMediaType?: MediaType;
}
