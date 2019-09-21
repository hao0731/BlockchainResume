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

    }

}
