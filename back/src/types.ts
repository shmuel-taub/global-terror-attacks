import { Document } from "mongoose";
export type Value = string | number
export type ValueType = StringConstructor | NumberConstructor

// export interface Statistics extends Document {
//     attacksNum: number;
//     sumKill: number;
//     sumWound: number;
// }


export interface IAttackDTO {
    
    // eventid: number;
    iyear: number;
    imonth: number;
    // iday: number;
    country_txt: string;
    region_txt: string;
    city: string;
    latitude: number;
    longitude: number;
    attacktype1_txt: string;
    // targtype1_txt: string;
    // target1: string;
    gname: string;
    // weaptype1_txt: string;
    nkill: number;
    nwound: number;
    // nperps: null,
    // summary: null
    
}