import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { NameDnsComponent } from './name-dns/name-dns.component';
import { NameBidComponent } from './name-bid/name-bid.component';
import { NameHomeComponent } from './name-home/name-home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NamePriceComponent } from './name-price/name-price.component';
import { NameReserveComponent } from './name-reserve/name-reserve.component';
import { NameCheckComponent } from './name-check/name-check.component';
import { NameService }  from './name.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NameBidNewComponent } from './name-bid-new/name-bid-new.component';
import { NameWithdrawBidComponent } from './name-withdraw-bid/name-withdraw-bid.component';
import { NameSendEtherComponent } from './name-send-ether/name-send-ether.component';
import { NameHighestBidComponent } from './name-highest-bid/name-highest-bid.component';
import { NameOwnerComponent } from './name-owner/name-owner.component';
import { NameAcceptBidComponent } from './name-accept-bid/name-accept-bid.component';
import { NameUserBidComponent } from './name-user-bid/name-user-bid.component';

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
    NameUserBidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MetaModule,
    ReactiveFormsModule

  ],
  providers: [NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
