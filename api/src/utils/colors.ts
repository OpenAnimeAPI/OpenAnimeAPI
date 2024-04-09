import * as common from './common.js';

export const success: number =  0x00ff00;
export const warning: number = 0xff9900;
export const error: number = 0xff0000;

export const topgg: number = 0xff3366;
export const banana: number = 0xffcc00;

/**
 * Grabs a list of all variables exported by this file, and returns a random one
 * @param this 
 * @returns 
 */
export function random(this: object): number {
    const keys = Object.keys(this).filter((key: string) => key !== "random");
    const randomKey = keys[common.RNG(keys.length - 1)];

    return (this as Record<string, number>)[randomKey];
};