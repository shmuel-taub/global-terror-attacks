// import { AttackModel, Attack } from "./models/AttacksModel";
// import { GroupNameModel, AttackTypeModel } from "./models/models"; 
// import { IAttackDTO } from "../types";
// import { HydratedDocument } from "mongoose";
// import { DateModel, Year } from "./models/DateModel";
// let print = true;
// const graphValues =  {attacksNum: 1, value: 1, _id: 0 }

// export async function getAttackTypes() {
//   const attacks = await AttackTypeModel.find(
//     {}, graphValues
//   );
//   return attacks/*.map((attack) => {
//     return { name: attack.value, value: attack.attacksNum };
//   });*/
// }

// export async function getYearsAttacksNum(yearStart: number, yearEnd: number) {
//   const res = await DateModel.find({}, {attacksNum: 1, value: 1, _id: 0 })
//     .where("value")
//     .gte(yearStart)
//     .lte(yearEnd);
//     return res.map(y => {
//       const {value , attacksNum} = y
//       return {attacksNum, value: value.toString()}
//     })
// }

// export async function getMonthsAttacksNum(year: number) {
//   const res = await DateModel.findOne({value: year}, {months: 1, _id: 0 });
//   if (!res) return []
//     return res.months.map((m, i) => {
//       const { attacksNum} = m
//       return {attacksNum, value: i ? `Month ${i}`: 'Unknown'}
//     })
// }

// export async function getGroupAttacks(gname: string): Promise<Attack[]> {
//   const group = await GroupNameModel.findOne(
//     { value: gname },
//     { attacks: 1, _id: 0 }
//   )
//     .populate("attacks")
//     .exec();
//   return group ? group.attacks : [];
// }

// export async function getYearsAttacks(year: number): Promise<Attack[]> {
//   const res = await DateModel.findOne(
//     { value: year },
//     { months: 1, _id: 0 }
//   )
//     .populate({ path: "months",
//        populate: {
//         path: 'attacks',
//         model: 'Attack'
//        } })
//     .exec();
//     if (res)
//     {
//       // console.log(res)
//       const attacks = []
//       for (const month of res.months)
//       {
//         attacks.push(...month.attacks)
//       }
//       return attacks
//     }
//   return []
// }

// // export async function appendToAttackSchema(attack: IAttackDTO) {
// //   return AttackModel.create(attack);
// // }

// // export async function appendToAll(attack: IAttackDTO) {
// //   const res = await appendToAttackSchema(attack);
// //   // if (print) {console.log(res)}
// //   await Promise.all([
// //    appendToAttackType(res),
// //    appendToGroupName(res),
// //    appendToDate(res)
// //   ])
// // }

// // export async function appendToAttackType(attack: Attack) {
// //   await appendAttackToModel<string>(AttackTypeModel, attack, {
// //     value: attack.attacktype1_txt,
// //   });
// // }

// // export async function appendToDate(attack: Attack) {
// //   const year = await DateModel.findOne({ value: attack.iyear });
// //   if (year) {
// //     appendStatisticsDetails(year, attack);
// //     appendStatisticsDetails(year.months[attack.imonth], attack);
// //     (year.months[attack.imonth].attacks as any).push(attack._id)
// //     await year.save();
// //   } else {
// //     const newYear = {
// //       ...extractStatisticsDetails(attack),
// //       value: attack.iyear,
// //       // TODO check to remove document
// //       months: [{}],
// //     };
// //     for (let i = 0; i <= 12; i++) {
// //       newYear.months[i] = {
// //         // value: i,
// //         attacksNum: 0,
// //         sumKill: 0,
// //         sumWound: 0,
// //         attacks: [],
// //       };
// //     }
// //     appendStatisticsDetails(newYear.months[attack.imonth], attack);
// //     await DateModel.create(newYear);
// //   }
// // }

// export function getAttacksByYear(year: Number) {
//   return AttackModel.find({ iyear: year });
// }

// export function getAttacksByYearMonth(year: Number, month: Number) {
//   return AttackModel.find({ iyear: year, imonth: month });
// }

// // export async function appendToGroupName(attack: Attack) {
// //   await appendAttackToModel<string>(GroupNameModel, attack, {
// //     value: attack.gname,
// //   });
// // }

// // export async function appendAttackToModel<T>(
// //   model: HydratedDocument<any>,
// //   attack: Attack,
// //   filter: { value: T }
// // ) {
// //   const old = await model.findOne(filter);
// //   if (old) {
// //     appendStatisticsDetails(old, attack);
// //     old.attacks.push(attack._id);
// //     old.save();
// //   } else {
// //     // const {value} = filter
// //     model.create({
// //       ...extractStatisticsDetails(attack),
// //       value: filter.value,
// //       attacks: [attack._id],
// //     });
// //   }
// // }

// // function extractStatisticsDetails(attack: Attack) {
// //   return {
// //     attacksNum: 1,
// //     sumKill: attack.nkill,
// //     sumWound: attack.nwound,
// //   };
// // }

// // function appendStatisticsDetails(old: any, attack: Attack) {
// //   old.attacksNum += 1;
// //   old.sumKill += attack.nkill;
// //   old.sumWound += attack.nwound;
// // }

// // export function getAttacksByYear(year: Number) {
// //     return AttackModel.find({iyear: year})
// // }

// // export function getAttacksByYear(year: Number) {
// //     return AttackModel.find({iyear: year})
// // }

// // export function getAttacksByYear(year: Number) {
// //     return AttackModel.find({iyear: year})
// // }
