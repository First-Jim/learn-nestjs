import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';
const filePath = join(__dirname, '../config-yaml', YAML_COMMON_CONFIG_FILENAME);

const envPath = join(
  __dirname,
  '../config-yaml',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf-8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf-8'));

const mergeConfig = _.merge(commonConfig, envConfig);
export default () => {
  return mergeConfig;
};