import { Attack } from "../DL/models/AttacksModel";
import { Loc, Statistics, StrStatistics } from "../DL/models/StatisticSchema";
import {
  getAttackTypes,
  getCities,
  getCountries,
  getRegions as getWorldRegions,
  getMonthsAttacksNum,
  getYearsAttacksNum,
  getRegionGroups,
  getCountryGroups,
  getCityGroups,
  getGroupYears,
  getYearGroups,
} from "../DL/controlers/getContolers";

const location = (latitude: number, longitude: number) => [latitude, longitude];
// const  location = ( latitude: number, longitude: number) => [longitude, latitude]

// endpoint 1
export async function getDeadliestAttacksTypes() {
  return await getAttackTypes();
}

// endpoint 2
export async function getRegions(type: string, subFields: number = 0) {
  switch (type) {
    case "region":
      return await getWorldRegions(subFields);
    case "country":
      return await getCountries(subFields);
    case "city":
      return await getCities(subFields);
    default:
      return [];
  }
}

export async function getRegionsAvgCasualties(regionType: string) {
  const regions = await getRegions(regionType);
  return regions.map((region: Loc) => {
    return {
      areaName: region.value,
      location: location(region.latitude, region.longitude),
      messages: [
        `average casulties:`,
        region.attacksNum && region.sumKill + region.sumWound
          ? `${(region.sumKill + region.sumWound) / region.attacksNum}`
          : "0",
      ],
    };
  });
}

// endpoint 3
export async function getIncidentTrends(start: number, end: number) {
  if (start === end) {
    const res = await getMonthsAttacksNum(start);
    return res
      .sort((m1: { value: string }, m2: { value: string }) => {
        return Number(m1.value) - Number(m2.value);
      })
      .map((month: Statistics & { value: string }) => {
        return {
          attacksNum: month.attacksNum,
          value: month.value !== "0" ? `Month ${month.value}` : "Unknown",
        };
      });
  }

  return await getYearsAttacksNum(start, end);
}

// endpoint 4

export async function getRegionGroupsLimit(
  region: string,
  regionType: string,
  limit: number = 0
) {
    let res
    switch(regionType) {
        case 'region':
            res = await getRegionGroups(region);
            break;
        case 'country':
            res = await getCountryGroups(region);
            break;
        case 'city':
            res = await getCityGroups(region);
            break;
        default:
            res = [];
    }
    // console.log(res)
    if (limit) {
        return res.sort((g1: {attacksNum: number}, g2: {attacksNum: number}) => {
            return g2.attacksNum - g1.attacksNum
        }).slice(0, limit)
    }
    return res
}

// endpoint 6
export async function getDeadliestRegionsOfGroup(
    regionType: string,
    gname: string,
    limit: number
) {
    const regions = await getRegions(regionType, 1)
    return regions.sort((regienA: Loc, regienB: Loc) => {
        // console.log(regienA)
        //@ts-ignore
        const a: Statistics = regienA.subFields.gname.find(g => g.value === gname)
        //@ts-ignore
        const b: Statistics = regienB.subFields.gname.find(g => g.value === gname)
        return (b.sumKill + b.sumWound) - (a.sumKill + a.sumWound)
    }).slice(0, limit).map((region: Loc) => {
        //@ts-ignore
        const group: StrStatistics = region.subFields.gname.find(g => g.value === gname)
        return {
            areaName: `${regionType} - ${region.value}`,
            location: location(region.latitude, region.longitude),
            messages: [
                `group: ${group.value}`,
                `sum casulties: ${group.sumKill + group.sumWound}`,
                `sum killed ${group.sumKill}`,
                `sum wounde ${group.sumWound}`,
            ],
        }
    })
}



// getters 

export async function getRegionsNames(type: string) {
    const res = await getRegions(type)
    return res.map((r: {value: string}) => r.value)
}

// function getTopGroups() {
//   return [
//     { name: "Black Nationalists", attacks: 2 },
//     { name: "Unknown", attacks: 7 },
//     { name: "23rd of September Communist League", attacks: 98 },
//     { name: "MANO-D", attacks: 8 },
//     { name: "New Year's Gang", attacks: 2 },
//     { name: "Tupamaros (Uruguay)", attacks: 7 },
//   ];
// }

export async function getGroupsByYear(year: number) {
  return await getYearGroups(year);
}

export async function getYearsByGroup(gname: string) {
    return await getGroupYears(gname);
}
//   if (!limit) return res
//   return res.sort()
// //   console.log(attacks)
//   const groupsToAttacks = _.groupBy(attacks, (attack) => (attack as any).gname);
//   if (limit === 0) limit = Object.keys(groupsToAttacks).length
// //   console.log(groupsToAttacks)
//   return Object.keys(groupsToAttacks).map((group) => {
//     return {
//       value: group,
//       attacksNum: groupsToAttacks[group].length,
//     };
//   });
// }

// export async function getYearsByGroup(gname: string) {
//   const attacks = await getGroupAttacks(gname);
//   const yearsToAttacks = _.groupBy(attacks, (attack) => (attack as any).iyear);
//   return Object.keys(yearsToAttacks).map((year) => {
//     return {
//       value: year,
//       attacksNum: yearsToAttacks[year].length,
//     };
//   });

//   // return [
//   //     {year: 1209,
//   //         attacks: 0
//   //     },
//   //     {year: 1305,
//   //         attacks: 5
//   //     },
//   //     {year: 2012,
//   //         attacks: 78
//   //     },
//   //     {year: 2093,
//   //         attacks: 123
//   //     },
//   //     {year: 1094,
//   //         attacks: 16
//   //     },
//   //     {year: 1984,
//   //         attacks: 63
//   //     },
//   //     {year: 2037,
//   //         attacks: 47
//   //     }
//   // ]
// }

// function getDeadliestRegions(name: string) {
//   return {
//     name,
//     regiens: [
//       {
//         regien: "Central America & Caribbean",
//         loc: [18.456792, -69.951164],
//         avg: 23,
//       },
//       { regien: "North America", loc: [19.371887, -99.086624], avg: 3.4 },
//       { regien: "Southeast Asia", loc: [15.478598, 120.599741], avg: 5.3 },
//       { regien: "Western Europe", loc: [37.99749, 23.762728], avg: 8.1 },
//     ],
//   };
// }
