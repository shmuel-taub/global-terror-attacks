import mongoose from "mongoose";
import { StrStatisticsSchema, IntStatisticsSchema, LocSchema } from "./StatisticSchema"; 


export const GroupNameModel = mongoose.model("GroupName", StrStatisticsSchema);
export const AttackTypeModel = mongoose.model("AttackType", StrStatisticsSchema);
export const RegionsModel = mongoose.model("Region", LocSchema);
export const CountriesModel = mongoose.model("Country", LocSchema);
export const CitiesModel = mongoose.model("City", LocSchema);
export const YearModel = mongoose.model("Year", IntStatisticsSchema);

