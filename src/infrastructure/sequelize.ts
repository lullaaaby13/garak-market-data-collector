import {Sequelize} from "sequelize-typescript";

import * as path from "path";
import {appRootPath} from "../utils/appRootPath";
import ConfigLoader from "../utils/ConfigLoader";

const environment = process.env.NODE_ENV || 'development';

const config = ConfigLoader.load('sequelize.yaml');

const sequelize =  new Sequelize({
    ...config,
    storage: ':memory:',
    logging: environment !== 'production',
    models: [ path.resolve(appRootPath(), 'src') + '/**/*.model.ts', path.resolve(appRootPath(), 'dist') + '/**/*.model.js' ]
});

export default sequelize;