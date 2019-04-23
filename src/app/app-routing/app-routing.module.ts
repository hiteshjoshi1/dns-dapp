import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NameHomeComponent } from "./../name-home/name-home.component";
import { NameBidComponent } from "./../name-bid/name-bid.component";
import { NameDnsComponent } from "./../name-dns/name-dns.component";
import { RulesComponent } from "../rules/rules.component";
import { NameReserveComponent } from "../name-reserve/name-reserve.component";
import { NameBidNewComponent } from "../name-bid-new/name-bid-new.component";
import { MyNamesComponent } from "../my-names/my-names.component";
import { MyBidsComponent } from "../my-bids/my-bids.component";
// Create a Route Array
const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: NameHomeComponent },
  { path: "reserve", component: NameDnsComponent },
  { path: "bid", component: NameBidComponent },
  { path: "rules", component: RulesComponent },
  { path: "name-reserve", component: NameReserveComponent },
  { path: "name-bid", component: NameBidNewComponent },
  { path: "mynames", component: MyNamesComponent },
  { path: "mybids", component: MyBidsComponent }
];

// Router.forRoot returns a module
// we create it and then export the same
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
