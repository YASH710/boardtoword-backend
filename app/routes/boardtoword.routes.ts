import express from "express";
import { TemplateHelper } from "../common/classes/TemplateHelper";
import * as BoardToWordController from "../controllers/boardtoword.controller";

let router = express.Router();

router.post("/generate", BoardToWordController.generateWordFile);
router.post("/template-exist", BoardToWordController.checkTemplateExist);
router.post("/upload-template", TemplateHelper.uploadUsingMulter.single('file'), (req, res) => {
    res.status(200).send({message: 'Template Uploded Successfully.'});
});

export default router;