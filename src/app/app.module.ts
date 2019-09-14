import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { NameDnsComponent } from "./name-dns/name-dns.component";
import { NameBidComponent } from "./name-bid/name-bid.component";
import { NameHomeComponent } from "./name-home/name-home.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { NamePriceComponent } from "./name-price/name-price.component";
import { NameReserveComponent } from "./name-reserve/name-reserve.component";
import { NameCheckComponent } from "./name-check/name-check.component";
import { NameService } from "./name.service";
import { ReactiveFormsModule } from "@angular/forms";
import { NameBidNewComponent } from "./name-bid-new/name-bid-new.component";
import { NameWithdrawBidComponent } from "./name-withdraw-bid/name-withdraw-bid.component";
import { NameSendEtherComponent } from "./name-send-ether/name-send-ether.component";
import { NameHighestBidComponent } from "./name-highest-bid/name-highest-bid.component";
import { NameOwnerComponent } from "./name-owner/name-owner.component";
import { NameAcceptBidComponent } from "./name-accept-bid/name-accept-bid.component";
import { ModalComponent } from "./modal/modal.component";
import { Web3Service } from "./util/web3.service";
import { RulesComponent } from "./rules/rules.component";
import { StoreService } from "./util/store.service";
import { MyNamesComponent } from "./my-names/my-names.component";
import { APP_INITIALIZER } from "@angular/core";
import { MyBidsComponent } from './my-bids/my-bids.component';
import { DidEventsComponent } from './did-events/did-events.component';
import { DidService } from './did.service';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    NameDnsComponent,
    NameBidComponent,
    NameHomeComponent,
    NamePriceComponent,
    NameReserveComponent,
    NameCheckComponent,
    NameBidNewComponent,
    NameWithdrawBidComponent,
    NameSendEtherComponent,
    NameHighestBidComponent,
    NameOwnerComponent,
    NameAcceptBidComponent,
    ModalComponent,
    RulesComponent,
    MyNamesComponent,
    MyBidsComponent,
    DidEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // MatTableModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    StoreService,
    Web3Service,
    {
      provide: APP_INITIALIZER,
      useFactory: (Web3Service: Web3Service) =>
        function () {
          return Web3Service.bootstrapWeb3();
        },
      deps: [Web3Service],
      multi: true
    },
    NameService,
    DidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
