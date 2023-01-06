import Path from "path"

export class PathHelper {
    static getBasePath = ()=> Path.resolve('.');
    static getResolvedPath= (templatePath: string) => Path.resolve(this.getBasePath()+templatePath) 
}
