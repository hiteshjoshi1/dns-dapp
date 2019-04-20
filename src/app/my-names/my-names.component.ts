import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { StoreService, Name } from "../util/store.service";
import { Web3Service } from "../util/web3.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-my-names",
  templateUrl: "./my-names.component.html",
  styleUrls: ["./my-names.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyNamesComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private cd: ChangeDetectorRef
  ) {}

  names: Name[];

  private subscription: Subscription = new Subscription();

  // account: String;

  ngOnInit() {
    this.subscription.add(
      this.storeService.getAllFromLocalStore().subscribe(res => {
        console.log(res);
        this.names = res;
        this.cd.markForCheck();
      })
    );
    // this.watchAccount();
  }

  // private watchAccount() {
  //   this.subscription.add(
  //     this.web3Service.accountObservable.subscribe(acc => {
  //       console.log("Account changed -  fetch the changed Names", acc);
  //       this.storeService.getAllFromLocalStore().subscribe(res => {
  //         this.names = res;
  //         this.cd.markForCheck();
  //       });
  //     })
  //   );
  // }
  public ngOnDestroy(): void {
    /*
     * magic kicks in here: All subscriptions which were added
     * with "subscription.add" are canceled too!
     */
    this.subscription.unsubscribe();
  }
}
