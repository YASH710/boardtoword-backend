"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const fs_1 = __importDefault(require("fs"));
class FileHelper {
}
exports.FileHelper = FileHelper;
FileHelper.checkExists = (path) => fs_1.default.existsSync(path);
FileHelper.readAsBinary = (path) => fs_1.default.readFileSync(path, "binary");
FileHelper.makeDir = (dir) => fs_1.default.mkdirSync(dir);
