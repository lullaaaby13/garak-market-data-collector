import * as path from "path";
import {appRootPath} from "./appRootPath";
import * as fs from "fs";

export function backupDocument(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}