import fs from 'fs'
import { PathHelper } from './PathHelper'

export class FileHelper{
    static checkExists = (path: string) => fs.existsSync(path)
    static readAsBinary = (path: string) => fs.readFileSync(path, "binary")
    static makeDir = (dir: string) => fs.mkdirSync(dir)
}