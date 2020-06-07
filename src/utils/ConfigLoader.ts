import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {appRootPath} from "./appRootPath";


export default class ConfigLoader {

    static load(fileName: string) {

        const environment = process.env.NODE_ENV || 'development';

        try {
            const configPath = path.resolve(appRootPath(), 'config', fileName);

            // console.log(`설정 파일 경로: ${configPath}`);

            const fileStr = fs.readFileSync(configPath, { encoding: 'utf8' });
            const configObject = yaml.safeLoad(fileStr);
            return configObject[environment] ? configObject[environment] : configObject;
        } catch (e) {
            throw new Error(`해당 설정 파일을 찾을 수 없습니다. (fileName=${fileName})`);
        }
    }
}