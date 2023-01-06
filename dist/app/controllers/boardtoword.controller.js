"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTemplate = exports.checkTemplateExist = exports.generateWordFile = void 0;
const pizzip_1 = __importDefault(require("pizzip"));
const path_1 = __importDefault(require("path"));
const createXMLTable_1 = require("../common/createXMLTable");
const PathHelper_1 = require("../common/classes/PathHelper");
const FileHelper_1 = require("../common/classes/FileHelper");
const TemplateHelper_1 = require("../common/classes/TemplateHelper");
const BASEPATH = path_1.default.resolve(".");
const generateWordFile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = request;
    const path = PathHelper_1.PathHelper.getResolvedPath(`\\${TemplateHelper_1.TemplateHelper.folderName}\\template_${body.boardId}.docx`);
    if (FileHelper_1.FileHelper.checkExists(path)) {
        const binaryFile = FileHelper_1.FileHelper.readAsBinary(path);
        const zip = new pizzip_1.default(binaryFile);
        let fileNodeBuffer = (_a = zip.file("word/document.xml")) === null || _a === void 0 ? void 0 : _a.asNodeBuffer();
        let table = (0, createXMLTable_1.createTable)(body.data);
        // SPLIT XML STRING WITH <<table>>
        const placeHolder = "&lt;&lt;table&gt;&gt;";
        const textEndTag = "</w:t>";
        let splitedXML = fileNodeBuffer.toString().split(placeHolder);
        for (let i = 1; i < splitedXML.length; i++) {
            let index = splitedXML[i].indexOf(textEndTag);
            splitedXML[i] = splitedXML[i].slice(0, index + textEndTag.length) + table + splitedXML[i].slice(index + textEndTag.length);
        }
        let XMLWithTable = splitedXML.join("");
        zip.file("word/document.xml", XMLWithTable);
        let generatedZip = zip.generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        response.setHeader("Content-Disposition", "attachment; filename=document.docx");
        response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        return response.status(200).send(generatedZip);
    }
    else {
        return response.status(400).send({ message: "Please upload template first" });
    }
});
exports.generateWordFile = generateWordFile;
const checkTemplateExist = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const path = PathHelper_1.PathHelper.getResolvedPath(`\\${TemplateHelper_1.TemplateHelper.folderName}\\template_${body.boardId}.docx`);
    response.status(200).send({
        exist: FileHelper_1.FileHelper.checkExists(path),
    });
});
exports.checkTemplateExist = checkTemplateExist;
const uploadTemplate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.uploadTemplate = uploadTemplate;
