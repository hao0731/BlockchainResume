import { Component } from '@angular/core';
import { take, mergeMap } from 'rxjs/operators';
import { ProviderService } from './services/provider/provider.service';
import { TransactionParameter, ResumeInitialOptions } from './types';
import { Web3Utils, BN } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private provider: ProviderService) {
    const info = {
        name: 'HAO',
        address: '0x579c43911C862E16fEB199233ec2d32e441b7713',
        age: 21,
        gender: 0
    } as ResumeInitialOptions;
    this.provider.getAccount().pipe(
        take(1),
        mergeMap(accounts => {
            this.provider.defaultAccount = accounts[0];
            return this.provider.deployResume(info);
        })
    ).subscribe(instance => {
        console.log(instance);
    });
    // console.log(new BN(Web3Utils.randomHex(2)));
    // console.log(new BN('12').add(new BN('1')).toString());
    // this.provider.getAccount().pipe(
    //   take(1),
    //   mergeMap(accounts => {
    //     this.provider.defaultAccount = accounts[0];
    //     const params = {
    //       from: this.provider.defaultAccount,
    //       to: '0x579c43911C862E16fEB199233ec2d32e441b7713',
    //       value: '1000000000000000000'
    //     } as TransactionParameter;
    //     return this.provider.sendTransaction(params);
    //   }),
    // );

  }
  title = 'BlockchainResume';
}
