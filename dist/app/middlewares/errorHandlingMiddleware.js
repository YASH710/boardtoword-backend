"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMiddleware = (req, res, next) => {
    try {
        next();
    }
    catch (err) {
        console.log("first");
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.default = errorHandlingMiddleware;
