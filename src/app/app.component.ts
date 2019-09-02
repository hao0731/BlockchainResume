import { Component } from '@angular/core';
import { ProviderService } from './services/provider/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private provider: ProviderService) {}
  title = 'BlockchainResume';
}
