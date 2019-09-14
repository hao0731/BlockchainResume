import { Component } from '@angular/core';
import { take, mergeMap } from 'rxjs/operators';
import { ProviderService } from './services/provider/provider.service';
import { TransactionParameter, ResumeInitialOptions, EventLogOptions } from './types';
import { Web3Utils, BN } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private provider: ProviderService) {
      this.provider.getAccount().pipe(take(1)).subscribe(accounts => {
          this.provider.defaultAccount = accounts[0];
      });
    // this.provider.getAccount().pipe(take(1)).subscribe(accounts => {
    //     this.provider.defaultAccount = accounts[0];
    //     const resume = this.provider.getResume('0x1Ff192E4bA1b23bdb586A290C525b6037f8859a8');
    //     this.provider.getReceipt('0xb22815db37363b7695adabc536e3a45ec4e76d6837b7cdaaa4cdde955e27e232').pipe(
    //       mergeMap(receipt => Web3Utils.decodeLog('done', receipt))
    //     ).subscribe(
    //       log => console.log(log),
    //       err => console.error(err)
    //     );
    //     const eventOption = {
    //       fromBlock: 0
    //     } as EventLogOptions;
    //     resume.once('done', (err, event) => {
    //       console.log(event);
    //     });
    //     resume.events.done()
    //     .on('data', event => {
    //       console.log('normal', event);
    //     });

    //     resume.getPastEvents('done', eventOption, (err, events) => {
    //       console.log(events);
    //     });
    //     resume.methods.profile().call().then(res => console.log(res));
    //     resume.methods.setPermission('0x68CC696C9510ba6f2dC764BaE42bcE0aC08c3783', 'HAOSchool', 1, true)
    //     .send({ from: this.provider.defaultAccount })
    //     .on('transactionHash', hash => console.log(hash))
    //     .on('receipt', receipt => console.log(receipt))
    //     .on('confirmation', (confirmationNumber, receipt) => console.log(confirmationNumber, receipt))
    //     .on('error', console.error);
    // });
    // const info = {
    //     name: 'HAO',
    //     address: '0x579c43911C862E16fEB199233ec2d32e441b7713',
    //     age: 21,
    //     gender: 0
    // } as ResumeInitialOptions;
    // this.provider.getAccount().pipe(
    //     take(1),
    //     mergeMap(accounts => {
    //         this.provider.defaultAccount = accounts[0];
    //         return this.provider.deployResume(info);
    //     })
    // ).subscribe(instance => {
    //     console.log(instance);
    // });

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
