import chalk from 'chalk';

export const log = console.log;

export const h1 = (data: any) => log(chalk.bold.blue(data));
export const h2 = (data: any) => log(chalk.blue(data));
export const output = (data: any) => log(chalk.italic(data));
