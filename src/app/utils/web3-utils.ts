import * as web3 from 'web3-utils';
import { EtherUnit } from '../types';

export const BN = web3.BN;

export class Web3Utils {
    public static randomHex(bytesSize: number): string {
        return web3.randomHex(bytesSize);
    }

    public static sha3(message: string): string {
        return web3.sha3(message);
    }

    public static isBN(bn): boolean {
        return web3.isBN(bn);
    }

    public static isHex(message: string): boolean {
        return web3.isHex(message);
    }

    public static isHexStrict(message: string): boolean {
        return web3.isHexStrict(message);
    }

    public static isAddress(address: string): boolean {
        return web3.isAddress(address);
    }

    public static toHex(message): string {
        return web3.toHex(message);
    }

    public static toBN(num: number|string): any {
        return web3.toBN(num);
    }

    public static hexToUtf8(hex: string): string {
        return web3.hexToUtf8(hex);
    }

    public static hexToAscii(hex: string): string {
        return web3.hexToAscii(hex);
    }

    public static utf8ToHex(message: string): string {
        return web3.utf8ToHex(message);
    }

    public static asciiToHex(message: string): string {
        return web3.asciiToHex(message);
    }

    public static hexToBytes(hex: string): Array<any> {
        return web3.hexToBytes(hex);
    }

    public static bytesToHex(bytesArray: Array<any>): string {
        return web3.bytesToHex(bytesArray);
    }

    public static toWei(value: any, uint: string): any {
        return EtherUnit[uint] ? web3.toWei(value, EtherUnit[uint]) : web3.toWei(value, 'ether');
    }
}
