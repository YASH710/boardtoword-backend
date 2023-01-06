"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateHelper = void 0;
const multer_1 = __importDefault(require("multer"));
const PathHelper_1 = require("./PathHelper");
class TemplateHelper {
}
exports.TemplateHelper = TemplateHelper;
_a = TemplateHelper;
TemplateHelper.folderName = 'templates';
TemplateHelper.templateTypeFilter = (req, file, cb) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
TemplateHelper.templateStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PathHelper_1.PathHelper.getResolvedPath(`/${_a.folderName}`));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    },
});
TemplateHelper.uploadUsingMulter = (0, multer_1.default)({
    fileFilter: _a.templateTypeFilter,
    storage: _a.templateStorage,
});
