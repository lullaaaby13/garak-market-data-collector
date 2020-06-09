import * as path from "path";
import {appRootPath} from "./appRootPath";
import * as fs from "fs";

export function backupDocument(document: any, fileName: string) {
    const fileFullName = `${fileName}.json`;
    const filePath = path.resolve(appRootPath(), 'backup', fileFullName);
    console.log(`[Backup Document]: ${fileFullName}`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}