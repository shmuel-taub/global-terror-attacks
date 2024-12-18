import { AttackModel } from "./modle";
import { IAttackDTO } from "../types";


export function appendToAttackSchema(attack: IAttackDTO) {
    AttackModel.create(attack)
}

export function getAttacksByYear(year: Number) {
    return AttackModel.find({iyear: year})
}

export function getAttacksByYearMonth(year: Number, month: Number) {
    return AttackModel.find({iyear: year, imonth: month})
}