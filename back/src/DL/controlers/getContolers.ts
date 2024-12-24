// import { connectDB } from "../../config/configDB";
// import 'dotenv/config'
// connectDB()
import { HydratedDocument } from "mongoose";
import { Attack, AttackModel } from "../models/AttacksModel";
import {
  GroupNameModel,
  AttackTypeModel,
  RegionsModel,
  CountriesModel,
  CitiesModel,
  YearModel,
} from "../models/models";

// main functions
async function getModelValues(model: HydratedDocument<any>, subFields: number = 0) {
  if (!subFields)
    return await model.find({}, { subFields: 0, _id: 0 });
  return await model.find({}, { _id: 0 });
}

async function getModelItem<T = string>(
  model: HydratedDocument<any>,
  filter: { value: T }
) {
  return await model.findOne(filter, { _id: 0 });
}

async function getSubField<T=string>(
  model: HydratedDocument<any>,
  filter: { value: T },
  field: string
) {
  return (await getModelItem<T>(model, filter)).subFields[field]
}

// specific getModelValues

export async function getAttackTypes() {
  return await getModelValues(AttackTypeModel);
}

export async function getYears() {
  return await getModelValues(YearModel);
}

export async function getGroups() {
  return await getModelValues(GroupNameModel);
}

export async function getRegions(subFields: number = 0) {
  return await getModelValues(RegionsModel, subFields);
}

export async function getCountries(subFields: number = 0) {
  return await getModelValues(CountriesModel, subFields);
}

export async function getCities(subFields: number = 0) {
  return await getModelValues(CitiesModel, subFields);
}

// specific getModelItem

export async function getMonthsAttacksNum(year: number) {
  const res = (await getModelItem<number>(YearModel, { value: year }))
  if (res) return res.subFields.imonth;
  return []
}

export async function getRegionGroups(region: string) {
  const res = await getModelItem(RegionsModel, {value: region})
  if (res) return res.subFields.gname;
  return []
}

export async function getCountryGroups(country: string) {
  const res = await getModelItem(CountriesModel, {value: country})
  if (res) return res.subFields.gname;
  return []
}

export async function getCityGroups(city: string) {
  const res = await getModelItem(CitiesModel, {value: city})
  if (res) return res.subFields.gname;
  return []
}

// specific getSubField 

export async function getYearGroups(year: number) {
  return await getSubField<number>(YearModel, {value: year}, 'gname')
}

export async function getGroupYears(group: string) {
  return await getSubField(GroupNameModel, {value: group}, 'iyear')
}

// anothe methods

export async function getYearsAttacksNum(start: number, end: number) {
  const res = await YearModel.find({}, { attacksNum: 1, value: 1, _id: 0 })
    .where("value")
    .gte(start)
    .lte(end)
    .exec();
  // console.log(res)
  return res.map((y) => {
    const { value, attacksNum } = y;
    return { attacksNum, value: value.toString() };
  });
}
// getYearsAttacksNum(1960, 1980)
