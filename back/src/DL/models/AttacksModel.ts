import mongoose, {Document, Schema} from "mongoose";

import { IAttackDTO } from "../../types";

// interface Attack extends IAttackDTO, Document;
export type Attack = IAttackDTO & Document;


export const AttackSchema = new Schema<Attack>({
    // eventid: number;
    iyear: {type: Number},
    imonth: {type: Number},
    // iday: number;
    country_txt: {type: String},
    region_txt: {type: String},
    city: {type: String},
    latitude: {type: Number},
    longitude: {type: Number},
    attacktype1_txt: {type: String},
    // targtype1_txt: string;
    // target1: string;
    gname: {type: String},
    // weaptype1_txt: string;
    nkill: {type: Number},
    nwound: {type: Number},
    // nperps: null,
    // summary: null
})

export const AttackModel =  mongoose.model<Attack>("Attack", AttackSchema)