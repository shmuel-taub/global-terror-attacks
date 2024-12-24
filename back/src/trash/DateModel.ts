// import mongoose, { Document, Schema } from "mongoose";
// import { Attack } from "./AttacksModel";
// import { createStatisticObjForSchema } from "../../Utilities/schemaHelper";
// import type { Statistics } from "../../types";

// interface Month extends Document, Statistics {
//   value: number;
//   attacks: Attack[];
// }

// const MonthSchema = new Schema({
//   ...createStatisticObjForSchema(Number),
//   attacks: { type: [mongoose.Types.ObjectId], ref: "Attack" },
// });

// export interface Year extends Document, Statistics {
//   value: number;
//   months: Month[];
// }

// const YearSchema = new Schema<Year>({
//     ...createStatisticObjForSchema(Number),
//   months: { type: [MonthSchema], required: true },
// });

// export const DateModel = mongoose.model("Year", YearSchema);
