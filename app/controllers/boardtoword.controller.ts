import * as Express from "express";
import PizZip from "pizzip";
import { createTable } from "../common/createXMLTable";
import { PathHelper } from "../common/classes/PathHelper";
import { FileHelper } from "../common/classes/FileHelper";
import { TemplateHelper } from "../common/classes/TemplateHelper";

/**
 * This method will read xml data from docx file after compressing it as a zip and then replace the placeholde <<table>> 
 * to generate the docx file with board data
 * @param request Http Request
 * @param response Http Response
 * @returns Docx file with board data as a table
 */
export const generateWordFile = async (request: Express.Request, response: Express.Response) => {
  const { body } = request;
  const path = PathHelper.getResolvedPath(`/${TemplateHelper.folderName}/template_${body.boardId}.docx`);
  if (FileHelper.checkExists(path)) {
    const binaryFile = FileHelper.readAsBinary(path);
    const zip = new PizZip(binaryFile);
    let fileNodeBuffer = zip.file("word/document.xml")?.asNodeBuffer() as Buffer;
    let table = createTable(body.data);
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
  } else {
    return response.status(400).send({ message: "Please upload template first" });
  }
};

/**
 * This method will check if the template for current board already exist on the server 
 * @param request Http Request
 * @param response Http Response
 */
export const checkTemplateExist = async (request: Express.Request, response: Express.Response) => {
  const { body } = request;
  const path = PathHelper.getResolvedPath(`/${TemplateHelper.folderName}/template_${body.boardId}.docx`)
  response.status(200).send({
    exist: FileHelper.checkExists(path),
  });
};

export const uploadTemplate = async (request: Express.Request, response: Express.Response) =>{
    
}
