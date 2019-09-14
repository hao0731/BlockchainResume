declare let require: any;

export const ResumeContract = require('../../../truffle/build/contracts/Resume.json');
export const StrLibContract = require('../../../truffle/build/contracts/StrLib.json');

export interface ResumeInitialOptions {
    name: string;
    address: string;
    age: number;
    gender: number;
}

export interface EventLogOptions {
    filter?: Object;
    fromBlock?: number;
    toBlock?: number;
    topics?: Array<any>;
}
