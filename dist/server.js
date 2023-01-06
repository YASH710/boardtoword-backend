"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const boardtoword_routes_1 = __importDefault(require("./app/routes/boardtoword.routes"));
const errorHandlingMiddleware_1 = __importDefault(require("./app/middlewares/errorHandlingMiddleware"));
const PathHelper_1 = require("./app/common/classes/PathHelper");
const FileHelper_1 = require("./app/common/classes/FileHelper");
const TemplateHelper_1 = require("./app/common/classes/TemplateHelper");
const app = (0, express_1.default)();
app.use(errorHandlingMiddleware_1.default);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(errorHandlingMiddleware_1.default);
app.use("/api/boardtoword", boardtoword_routes_1.default);
app.use(errorHandlingMiddleware_1.default);
const templateStoragepath = PathHelper_1.PathHelper.getResolvedPath(`/${TemplateHelper_1.TemplateHelper.folderName}`);
console.log(templateStoragepath, FileHelper_1.FileHelper.checkExists(templateStoragepath));
if (!FileHelper_1.FileHelper.checkExists(templateStoragepath)) {
    FileHelper_1.FileHelper.makeDir(templateStoragepath);
}
app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});
