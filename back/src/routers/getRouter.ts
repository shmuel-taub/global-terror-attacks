import express from "express";
import asyncHandler from "express-async-handler";
import { getRegionsNames } from "../BL/services";

export const getRouter = express.Router()

getRouter.get('/get-regions', asyncHandler(async (req, res) => {
    const {regionType} = req.query
    res.json({
        data: await getRegionsNames(regionType as string),
        msg: ''
    })
}))
