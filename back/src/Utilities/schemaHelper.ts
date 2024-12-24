import mongoose, { Schema } from "mongoose";

export function createStatisticObjForSchema(
  fieldType: NumberConstructor | StringConstructor
) {
  return {
    value: fieldType,
    attacksNum: Number,
    sumKill: Number,
    sumWound: Number,
  };
}

// attacks: attacks
//       ? { type: mongoose.Types.ObjectId, ref: "Attack" }
//       : undefined,
