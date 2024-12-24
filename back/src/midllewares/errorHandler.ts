import { Request, Response, NextFunction } from "express";
import { ClientsError } from "../Utilities/customErrors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ClientsError) {
        res.status(err.status).json({data: [], msg: err.message })
        return
    }
    console.log(err.message)
    console.log('\n', err.stack)
    res.status(500).json({data: [], msg: 'Failed to proces your request'})
}