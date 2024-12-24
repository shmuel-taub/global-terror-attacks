import express from "express";
import asyncHandler from "express-async-handler";
import { getYearsByGroup, getGroupsByYear, getDeadliestRegionsOfGroup, getRegionGroupsLimit } from '../BL/services'
import { ClientsError } from "../Utilities/customErrors";
import { Statistics } from "../DL/models/StatisticSchema";

export const relationshipsRouter = express.Router();

relationshipsRouter.get(
  "/top-groups/",
  asyncHandler(async (req, res) => {
    console.log(req.query);
    const { display, regionType, region, limit } = req.query;
    if (display === "graph") {
      const data = await getRegionGroupsLimit(
        region as string,
        regionType as string,
        Number(limit) ? Number(limit) : 0
      );
      res.json({
        data,
        msg: ''
      })
      return
    }
  })
);
relationshipsRouter.get(
  "/groups-by-year/" , asyncHandler(async (req, res, next) => {
    // console.log(req.query)
    const {gname, year, limit} = req.query
    if(gname) {
        res.json({
            data: await getYearsByGroup((gname as string)),
            msg: ''
        })
        return
    }
    if (year) {
        const yearNum = Number(year);
        let limitNum
        if (!Number.isInteger(yearNum)) throw new ClientsError('year must be an integer', 400)
        let data = await await getGroupsByYear(yearNum)
            if (limit) {
                limitNum = Number(limit);
                if (!Number.isInteger(limitNum)) throw new ClientsError('limit must be an integer', 400)
                data = data.sort((a: Statistics, b: Statistics) => {
                    return b.attacksNum - a.attacksNum
                  }).slice(0, limitNum)
            }  
        res.json({
            data,
            msg: ''
        })
        return
    }
    
    res.json({
        data: [],
        msg: 'You must specify a year or a gname'
    })
})
);
relationshipsRouter.get("/deadliest-regions/", asyncHandler(async (req, res) => {
    const {regionType, gname, limit} = req.query
    res.json({
        data: await getDeadliestRegionsOfGroup(
            regionType as string,
            gname as string,
            Number(limit)
        )
    })
}));
