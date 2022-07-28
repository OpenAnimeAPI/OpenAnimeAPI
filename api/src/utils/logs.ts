import chalk from 'chalk';

import { LogOptions, ErrorLogOptions } from '../types/logs.js';

import * as colors from './colors.js';

export async function log({ color, type="LOG", message="" }: LogOptions) {
    const logType = "[" + type + "]";
    return console.log(chalk.hex(color.toString())(logType) + " " + message);
};

export async function error({ color=colors.error, type="ERROR", message="", err }: ErrorLogOptions) {
    const logType = "[" + type + "]";
    return console.error(chalk.hex(color.toString())(logType) + " " + message, err);
};