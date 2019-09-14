import { Injectable } from '@angular/core';
import { Web3Service } from './util/web3.service';


import * as did_contract_json from "./../../build/contracts/EthereumDIDRegistry.json";
import BN from 'bn.js';

@Injectable()
export class DidService {
  EthereumDIDRegistry: any;

  constructor(
    private web3Service: Web3Service
  ) { }


  async initializeContract() {
    await this.web3Service
      .artifactsToContract(did_contract_json)
      .then(EthereumDIDRegistryAbstraction => {
        this.EthereumDIDRegistry = EthereumDIDRegistryAbstraction;
      });
  }

  public async getHistory(didAddress: any): Promise<any> {
    let registryInstance = await this.EthereumDIDRegistry.deployed();
    console.log(registryInstance);
    let finalBlock: BN = await registryInstance.changed(didAddress);
    let one: BN = new BN(1);
    let finalBlockNumber = finalBlock.toNumber();
    console.log(finalBlockNumber);
    if (finalBlockNumber != 0) {
      finalBlockNumber = finalBlockNumber + 1;
      console.log(finalBlockNumber);
      let events = await registryInstance.getPastEvents('DIDAttributeChanged',
        {
          filter: { identity: [didAddress] },
          fromBlock: 0,
          toBlock: finalBlockNumber
        },
      );
      return Promise.resolve(events);
    }

    else {
      return Promise.resolve(null);
    }
  }

}
