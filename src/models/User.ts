import { IUser, User } from "@ebenos2/framework";
import { IViberSender } from "@ebenos2/viber-adapter";
import { Schema, model, Document } from "mongoose";

const viberUserSchema = new Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        data: {
            country: String,
            avatar: String,
            api_version: Number,
            language: String,
        },
        mute: Boolean,
        subscribed: Boolean,
        admin: Boolean,
        tag: Array,
    },
    { timestamps: true }
);

export interface IViberUser extends IUser {
    id: string;
    firstName?: string;
    lastName?: string;
    data: {
        country?: string;
        avatar?: string;
        api_version: number;
        language?: string;
    };
    // custom properties that you need to add to constructor
    mute: boolean;
    subscribed: boolean;
    admin: boolean;
    tag: string[];
}

export const UserModel = model<IViberUser & Document>("users", viberUserSchema);
function instanceOfIViberUser(object: any): object is IViberUser {
    return "data" in object;
}

export default class ViberUser extends User<IViberUser> {
    mute: boolean;
    subscribed: boolean;
    admin: boolean;
    tag: string[];
    constructor(sender: IViberSender | IViberUser) {
        let user: IViberUser;
        if (!instanceOfIViberUser(sender)) {
            user = {
                id: sender.id,
                firstName: sender.name,
                lastName: sender.name,
                data: {
                    country: sender.country,
                    avatar: sender.avatar,
                    api_version: sender.api_version,
                    language: sender.language,
                },
                mute: false,
                subscribed: true,
                admin: false,
                tag: [],
            };
        } else user = sender;

        super(user);
        this.mute = user.mute;
        this.subscribed = user.subscribed;
        this.admin = user.admin;
        this.tag = user.tag;
    }

    static async userLoader(sender: IViberSender): Promise<ViberUser> {
        const id = sender.id;
        try {
            const user = await UserModel.findOne({ id }).exec();
            if (!user) {
                const user = new ViberUser(sender);
                await user.save();
                return user;
            }
            return new ViberUser(user);
        } catch (err) {
            throw err;
        }
    }

    public async save(): Promise<void> {
        await new UserModel({
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            data: this.data,
            mute: this.mute,
            subscribed: this.subscribed,
            admin: this.admin,
            tag: this.tag,
        }).save();
    }

    public static async getAllIds(): Promise<string[]> {
        const pref: IViberUser[] | null = await UserModel.find({});
        if (!pref) throw Error("Not User Pref");
        return pref.map(({ id }: IViberUser) => id);
    }

    public static async getById(id: string): Promise<ViberUser | null> {
        const user = await UserModel.findOne({ id }).exec();
        return user ? new ViberUser(user) : user;
    }

    public async unsubscribe(): Promise<any> {
        await UserModel.findOneAndUpdate(
            {
                id: this.id,
            },
            {
                subscribed: false,
            }
        );
    }
    public async subscribe(): Promise<any> {
        await UserModel.findOneAndUpdate(
            {
                id: this.id,
            },
            {
                subscribed: true,
            }
        );
    }

    public async getPref(): Promise<any> {
        return {
            id: this.id,
            mute: this.mute,
            subscribed: this.subscribed,
            admin: this.admin,
            tag: this.tag,
        };
    }

    public static async delete(id: string): Promise<boolean> {
        try {
            await UserModel.findOneAndDelete({ id });
            return true;
        } catch {
            return false;
        }
    }

    public static async toggleAdmin(id: string): Promise<boolean> {
        try {
            const admin = !(await UserModel.findOne({ id }))?.admin;
            await UserModel.findOneAndUpdate({ id }, { admin: admin });
            return true;
        } catch {
            return false;
        }
    }

    public static async removeTag(id: string, key: string): Promise<boolean> {
        try {
            await UserModel.findOneAndUpdate({ id }, { $pull: { tag: key } });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public static async getAdmins(): Promise<IViberUser[]> {
        try {
            const results = await UserModel.find({ admin: true });
            const resultUsers = await Promise.all(
                results.map(async ({ id }) => {
                    const user = await UserModel.findOne({ id }).exec();
                    if (!user) throw Error("A user ID is missing");
                    else return user;
                })
            );
            return resultUsers;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    static async retrieve(
        range: number[] | null = null,
        search: string | undefined
    ): Promise<any> {
        let usersData;
        console.log(search);
        if (range) {
            if (range[0] == 0) range[0] = 1;
            usersData = await UserModel.find({
                firstName: new RegExp(search || "", "i"),
            })
                .sort({ _id: -1 })
                .skip(range[0] - 1)
                .limit(range[1] - range[0]);
        } else {
            usersData = await UserModel.find({
                firstName: new RegExp(search || "", "i"),
            });
        }
        console.log(usersData);

        const result = await Promise.all(
            usersData.map(async (user) => {
                return {
                    user,
                };
            })
        );
        return result;
    }

    static async count(): Promise<number> {
        return UserModel.count();
    }
}
