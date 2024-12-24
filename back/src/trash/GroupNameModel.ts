// import mongoose, {  Schema } from "mongoose";
// import { Attack } from "./AttacksModel";
// import { createStatisticObjForSchema } from "../../Utilities/schemaHelper";
// import type { Statistics } from "../../types";

// interface GroupName extends Statistics {
//   value: string;
//   attacks: Attack[];
// }

// const GroupNameSchema = new Schema<GroupName>({
//   ...createStatisticObjForSchema(String),
// //     value: String
// // attacksNum: Number,
// //     sumKill: Number,
// //     sumWound: Number,
//   attacks: { type: [mongoose.Types.ObjectId], ref: "Attack" },
// });



// export const GroupNameModel = mongoose.model("GroupName", GroupNameSchema);
