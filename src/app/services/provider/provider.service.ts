import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import * as Web3 from 'web3';

import { TransactionParameter, ResumeContract, StrLibContract, ResumeInitialOptions } from './../../types';

declare let window: any;
declare let require: any;

const TruffleContract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
    private web3: any = null;
    private accountList: Array<string> = [];

    constructor() {
        this.web3 = typeof window.web3 !== 'undefined'
        ? new Web3(window.web3.currentProvider)
        : new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        window.web3 = this.web3;
        this.enableConnect().pipe(take(1)).subscribe(
            res => { this.accountList = res; },
            err => { console.error(err); }
        );
    }

    public set defaultAccount(account: string) {
      this.web3.eth.defaultAccount = account;
    }

    public get defaultAccount(): string {
        return this.web3.eth.defaultAccount;
    }

    public get accounts(): Array<string> {
        return this.accountList;
    }

    public enableConnect(): Observable<any> {
        return from(this.web3.currentProvider.enable());
    }

    public getAccount(): Observable<any> {
        return from(this.web3.eth.getAccounts());
    }

    public getBlock(index: number): Observable<any> {
        return from(this.web3.eth.getBlock(index));
    }

    public getCurrentBlockNumber(): Observable<any> {
        return from(this.web3.eth.getBlockNumber());
    }

    public getTransaction(txHash: string): Observable<any> {
        return from(this.web3.eth.getTransaction(txHash));
    }

    public getReceipt(txHash: string): Observable<any> {
        return from(this.web3.eth.getTransactionReceipt(txHash));
    }

    public sendTransaction(params: TransactionParameter): Observable<any> {
        return from(this.web3.eth.sendTransaction(params));
    }

    public deployResume(info: ResumeInitialOptions): Observable<any> {
        const strLib = TruffleContract(StrLibContract);
        const resume = TruffleContract(ResumeContract);
        strLib.setProvider(this.web3.currentProvider);
        resume.setProvider(this.web3.currentProvider);
        resume.setNetwork(this.web3.currentProvider.networkVersion);
        return from(strLib.new({ from: this.defaultAccount })).pipe(
            mergeMap((instance: any) => {
                resume.link('StrLib', instance.address);
                return resume.new(info.name, info.address, info.age, info.gender, { from: this.defaultAccount });
            })
        );
    }

    public getResume(address: string): any {
        return new this.web3.eth.Contract(ResumeContract.abi, address);
    }

    public executeMethod(method: any): Observable<any> {
        return from(method);
    }

}
