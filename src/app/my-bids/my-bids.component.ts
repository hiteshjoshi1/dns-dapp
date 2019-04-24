import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { StoreService, Bids } from "../util/store.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-my-bids",
  templateUrl: "./my-bids.component.html",
  styleUrls: ["./my-bids.component.css"]
})
export class MyBidsComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  bids: Bids[];

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.storeService.bidObservable.subscribe(res => {
        this.cd.markForCheck();
        this.ngZone.run(() => {
          this.bids = res;
        });
        // this.cd.markForCheck();
      })
    );
  }
  public ngOnDestroy(): void {
    /*
     * magic kicks in here: All subscriptions which were added
     * with "subscription.add" are canceled too!
     */
    this.subscription.unsubscribe();
  }
}
