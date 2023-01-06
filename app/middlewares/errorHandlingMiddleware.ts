import * as Express from "express";

const errorHandlingMiddleware = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        next()
    } catch (err) {
        console.log("first")
        return res.status(500).send( { message: "Internal server error" } )
    }
}

export default errorHandlingMiddleware