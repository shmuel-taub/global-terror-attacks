import express from "express";
import asyncHandler from "express-async-handler";
import { ClientsError } from "../Utilities/customErrors";
import {
  getDeadliestAttacksTypes,
  getRegionsAvgCasualties,
  getIncidentTrends,
} from "../BL/services";

export const analysisRouter = express.Router();

analysisRouter.get(
  "/deadliest-attack-types/",
  asyncHandler(async (req, res) => {
    const data = {
      data: await getDeadliestAttacksTypes(),
      msg: "",
    };
    // console.log(data)
    res.send(data);
  })
);

analysisRouter.get(
  "/highest-casualty-regions/",
  asyncHandler(async (req, res) => {
    console.log(req.query);
    const { regionType } = req.query;
    if (!["region", "country", "city"].find((i) => i === regionType))
      throw new ClientsError(
        "regionType must be one of region, country, city",
        400
      );
    const data = await getRegionsAvgCasualties(regionType as string);
    res.json({
      data,
      msg: "",
    });
  })
);

analysisRouter.get(
  "/incident-trends/",
  asyncHandler(async (req, res) => {
    // console.log(req.query)
    const start = Number(req.query.start),
      end = Number(req.query.end);
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
      throw new ClientsError("start and end must be integers", 400);
    }
    if (start > end) {
      throw new ClientsError("Start could'nt be greater then end", 400);
    }
    const result = {
      data: await getIncidentTrends(start, end),
      msg: "",
    };

    res.json(result);
  })
);

// analysisRouter.get('/', (req, res) => {
//     let a = 1 / 0
//     throw Error('hi')

//     res.send("hi")
// })
