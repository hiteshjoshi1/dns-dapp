import { Component, OnInit } from '@angular/core';

import {Web3Service} from '../util/web3.service';
import metacoin_artifacts from '../../../build/contracts/DNSRegistry.json';

@Component({
  selector: 'app-name-dns',
  templateUrl: './name-dns.component.html',
  styleUrls: ['./name-dns.component.css']
})
export class NameDnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
