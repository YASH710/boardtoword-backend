import multer from "multer";
import { PathHelper } from "./PathHelper";

export class TemplateHelper {
  static folderName = 'templates';
  private static templateTypeFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  private static templateStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PathHelper.getResolvedPath(`/${this.folderName}`));
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  });
  static uploadUsingMulter = multer({
    fileFilter: this.templateTypeFilter,
    storage: this.templateStorage,
  });
}
