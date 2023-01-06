import cors from "cors";
import helmet from "helmet";
import express, { Express } from "express";
import BoardToWordRoutes from "./app/routes/boardtoword.routes";
import errorHandlingMiddleware from "./app/middlewares/errorHandlingMiddleware";
import fs from 'fs';
import { PathHelper } from "./app/common/classes/PathHelper";
import { FileHelper } from "./app/common/classes/FileHelper";
import { TemplateHelper } from "./app/common/classes/TemplateHelper";

const app: Express = express();
app.use(errorHandlingMiddleware)
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandlingMiddleware)
app.use("/api/boardtoword", BoardToWordRoutes);

app.use(errorHandlingMiddleware)
const templateStoragepath = PathHelper.getResolvedPath(`\\${TemplateHelper.folderName}`)
console.log(templateStoragepath, FileHelper.checkExists(templateStoragepath));
if(!FileHelper.checkExists(templateStoragepath)){
    FileHelper.makeDir(templateStoragepath)
}

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
