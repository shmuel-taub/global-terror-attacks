import { HydratedDocument } from "mongoose";
import { Attack, AttackModel } from "../models/AttacksModel";
import {
  GroupNameModel,
  AttackTypeModel,
  RegionsModel,
  CountriesModel,
  CitiesModel,
  YearModel
} from "../models/models";
import { IAttackDTO } from "../../types";
import { Statistics } from "../models/StatisticSchema";


export async function appendToAttacks(attack: IAttackDTO) {
  return await AttackModel.create(attack);
}

export async function appendToAll(attack: IAttackDTO) {
  const res = await appendToAttacks(attack);
  // if (print) {console.log(res)}
  await Promise.all([
    updateGroupName(res),
    updateAttackTypeModel(res),
    updateRegionsModel(res),
    updateCountriesModel(res),
    updateCitiesModel(res),
    updateYearModel(res),
  ]);
}

export async function updateGroupName(attack: Attack) {
  await updateModel(GroupNameModel, attack, {
    value: attack.gname,
  },
  ['iyear']
);
}

export async function updateAttackTypeModel(attack: Attack) {
  await updateModel(AttackTypeModel, attack, {
    value: attack.attacktype1_txt,
  },
  ['iyear']
);
}

export async function updateRegionsModel(attack: Attack) {
  await updateModel(RegionsModel, attack, {
    value: attack.region_txt,
  },
  ['gname'],
  true
);
}

export async function updateCountriesModel(attack: Attack) {
  await updateModel(CountriesModel, attack, {
    value: attack.country_txt,
  },
  ['gname'],
  true
);
}

export async function updateCitiesModel(attack: Attack) {
  await updateModel(CitiesModel, attack, {
    value: attack.city,
  },
  ['gname'],
  true
);
}

export async function updateYearModel(attack: Attack) {
  await updateModel<number>(YearModel, attack, {
    value: attack.iyear,
  },
  ['imonth', 'gname']
);
}

export async function updateModel<T=string>(
  model: HydratedDocument<any>,
  attack: Attack,
  filter: { value: T },
  subFields: string[],
  loc: boolean = false
) {
  const old = await model.findOne(filter);
  if (old) {
    updateStatisticsDetails(old, attack);
    // console.log(old)
    updateSubFields(old, attack)
    // old.attacks.push(attack._id);
    old.save();
  } else {
    const newObj = {
      ...createStatisticsDetails(attack),
      value: filter.value,
      subFields: {}
      // attacks: [attack._id],
    }
    if (loc) {
      // @ts-ignore
      newObj.latitude = attack.latitude
      // @ts-ignore
      newObj.longitude = attack.longitude
    }
    // console.log(newObj)
    for (let field of subFields) {
      (newObj.subFields as any)[field] = [{
      ...createStatisticsDetails(attack),
      // @ts-ignore
      value: attack[field].toString(),
      }] as Statistics[]
    }
    model.create(newObj);
  }
}

function createStatisticsDetails(attack: Attack) {
  return {
    attacksNum: 1,
    sumKill: attack.nkill,
    sumWound: attack.nwound,
  };
}

function updateStatisticsDetails(old: any, attack: Attack) {
  old.attacksNum += 1;
  old.sumKill += attack.nkill;
  old.sumWound += attack.nwound;
}

function updateSubFields(old: any, attack: Attack) {
  for (let field of Object.keys(old.subFields)) {
    const subFieldVal = old.subFields[field].find((val: Statistics) => {
      // @ts-ignore
      return val.value === attack[field].toString()
    })
    // console.log(subFieldVal)
    if (subFieldVal) updateStatisticsDetails(subFieldVal, attack)
    else old.subFields[field].push({
      ...createStatisticsDetails(attack),
      // @ts-ignore
      value: attack[field].toString(),
  })
  }
  old.markModified('subFields')
}

//   export async function appendToDate(attack: Attack) {
//     const year = await DateModel.findOne({ value: attack.iyear });
//     if (year) {
//       appendStatisticsDetails(year, attack);
//       appendStatisticsDetails(year.months[attack.imonth], attack);
//       (year.months[attack.imonth].attacks as any).push(attack._id)
//       await year.save();
//     } else {
//       const newYear = {
//         ...extractStatisticsDetails(attack),
//         value: attack.iyear,
//         // TODO check to remove document
//         months: [{}],
//       };
//       for (let i = 0; i <= 12; i++) {
//         newYear.months[i] = {
//           // value: i,
//           attacksNum: 0,
//           sumKill: 0,
//           sumWound: 0,
//           attacks: [],
//         };
//       }
//       appendStatisticsDetails(newYear.months[attack.imonth], attack);
//       await DateModel.create(newYear);
//     }
//   }
