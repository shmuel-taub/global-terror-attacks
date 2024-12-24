import mongoose, { Document, Schema } from "mongoose";
import { Attack } from "./AttacksModel";
import { createStatisticObjForSchema } from "../../Utilities/schemaHelper";


export interface Statistics {
  // value: string | number;
  attacksNum: number;
  sumKill: number;
  sumWound: number;
}

export interface StrStatistics extends Document, Statistics {
  value: string ;
  // attacksNum: number;
  // sumKill: number;
  // sumWound: number;
  subFields: Object;
}

export interface Loc extends StrStatistics {
  // location: [number, number]
  latitude: number;
  longitude: number;
}

interface IntStatistics extends Document, Statistics {
  value: number ;
  subFields: Object;
}



// interface Statistics extends Document {
//     value: string;
//     attacksNum: number;
//     sumKill: number;
//     sumWound: number;
//     attacks: Attack[];
//   }
  
export  const StrStatisticsSchema = new Schema<StrStatistics>({
  ...createStatisticObjForSchema(String),
    // value: String,
    // attacksNum: Number,
    // sumKill: Number,
    // sumWound: Number,
    subFields: Schema.Types.Mixed
    // attacks: { type: [mongoose.Types.ObjectId], ref: "Attack" },
  });

  export  const IntStatisticsSchema = new Schema<IntStatistics>({
    ...createStatisticObjForSchema(Number),
    // value: Number,
    // attacksNum: Number,
    // sumKill: Number,
    // sumWound: Number,
    subFields: Schema.Types.Mixed
    // attacks: { type: [mongoose.Types.ObjectId], ref: "Attack" },
  });

  export const LocSchema = new Schema<Loc>({
    ...createStatisticObjForSchema(String),
    subFields: Schema.Types.Mixed,
    latitude: Number,
    longitude: Number,
    // location: Schema.Types.Array

  })