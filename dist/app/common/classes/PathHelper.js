"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathHelper = void 0;
const path_1 = __importDefault(require("path"));
class PathHelper {
}
exports.PathHelper = PathHelper;
_a = PathHelper;
PathHelper.getBasePath = () => path_1.default.resolve('.');
PathHelper.getResolvedPath = (templatePath) => path_1.default.resolve(_a.getBasePath() + templatePath);
