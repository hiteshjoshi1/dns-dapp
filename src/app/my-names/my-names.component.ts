import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone
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
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  names: Name[];

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.storeService.namesObservable.subscribe(res => {
        this.cd.markForCheck();
        this.ngZone.run(() => {
          this.names = res;
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
