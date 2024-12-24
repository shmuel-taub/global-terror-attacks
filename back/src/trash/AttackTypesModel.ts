// import mongoose, { Document, Schema } from "mongoose";
// import { Attack } from "./AttacksModel";
// import { createStatisticObjForSchema } from "../../Utilities/schemaHelper";
// import type { Statistics } from "../../types";

// interface AttackType extends Statistics {
//   value: string;
//   attacks: Attack[];
// }

// const AttackTypeSchema = new Schema<AttackType>({
//   ...createStatisticObjForSchema(String),
// //     value: String
// // attacksNum: Number,
// //     sumKill: Number,
// //     sumWound: Number,
//   attacks: { type: [mongoose.Types.ObjectId], ref: "Attack" },
// });



// export const AttackTypeModel = mongoose.model("AttackType", AttackTypeSchema);
