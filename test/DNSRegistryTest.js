var DNSRegistry = artifacts.require('DNSRegistry');

// contract is deployed using account[1]
contract('DNSRegistry', function(accounts) {
  /**
   * Check for a Non Existing Name
   */
  it('Should check if name Queen exists false', function() {
    return DNSRegistry.deployed()
      .then(function(instance) {
        return instance.checkNameExists.call('Queen');
      })
      .then(function(reserved) {
        assert.equal(
          reserved,
          false,
          'Queen does not exists in the DNS as of now'
        );
      });
  });

  /**
   * Test Reserving a name
   */
  it('should reserve Name', function() {
    let owner = accounts[5];
    let usurper = accounts[2];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Aerosmith', {
          from: owner,
          value: web3.utils.toWei('1', 'ether')
        })
        .then(function(result) {
          console.log('Aerosmith is reserved');
          return instance.checkNameExists
            .call('Aerosmith')
            .then(function(reserved) {
              assert.equal(reserved, true, 'Aerosmith is now reserved');
            })
            .then(function() {
              return instance.checkNameExists
                .call('Bonjovi')
                .then(function(reserved) {
                  assert.equal(reserved, false, 'Bonjovi is not reserved');
                });
            });
        })
        .then(function() {
          return instance
            .reserveName('Aerosmith', {
              from: usurper,
              value: web3.utils.toWei('1', 'ether')
            })
            .then(function(result) {
              // fails - already reserved
              assert.isNotOk(result.receipt);
            })
            .catch(function(ex) {
              console.log("Can't Reserve Aerosmith its already reserved");
            });
        });
    });
  });
  //3
  it('should Reserve Name and then Transfer Money from another account', function() {
    let nameOwner = accounts[5];
    let moneySender = accounts[8];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Eagles', {
          from: nameOwner,
          value: web3.utils.toWei('1', 'ether')
        })
        .then(function(result) {
          assert.isOk(result.receipt);
          return instance.checkNameExists
            .call('Eagles')
            .then(function(reserved) {
              assert.equal(reserved, true, 'Eagles is now reserved');
            });
        })
        .then(function() {
          return instance
            .sendEtherToName('Eagles', {
              from: moneySender,
              value: web3.utils.toWei('4', 'ether')
            })
            .then(function(result) {
              assert.isOk(result.receipt);
            });
        });
    });
  });
  //4
  it('should be able to bid on a Name', function() {
    let nameOwner = accounts[2];
    let bidderOne = accounts[8];
    let bidderTwo = accounts[5];
    let bidderThree = accounts[4];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Floyd', {
          from: nameOwner,
          value: web3.utils.toWei('0.1', 'ether')
        })
        .then(function(result) {
          return instance.getCurrentOwnerOfName
            .call('Floyd')
            .then(function(owner) {
              assert.equal(owner, nameOwner, 'Floyd is now reserved');
            })
            .then(function() {
              return instance
                .bid('Floyd', {
                  from: bidderOne,
                  value: web3.utils.toWei('2', 'ether')
                })
                .then(function(result) {
                  // console.log(result);
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .bid('Floyd', {
                  from: bidderTwo,
                  value: web3.utils.toWei('4', 'ether')
                })
                .then(function(result) {
                  assert.isNotOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log(
                    'This should fail, Bid is less than current price.'
                  );
                });
            })
            .then(function() {
              return instance
                .bid('Floyd', {
                  from: nameOwner,
                  value: web3.utils.toWei('5', 'ether')
                })
                .then(function(result) {
                  assert.isNotOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log(
                    'This should fail, User cannot bid on his own name'
                  );
                });
            })
            .then(function() {
              return instance
                .bid('Floyd', {
                  from: bidderThree,
                  value: web3.utils.toWei('8', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            });
        });
    });
  });
  //5
  it('should be able to accept a Bid', function() {
    let nameOwner = accounts[8];
    let bidderOne = accounts[6];
    let bidderTwo = accounts[5];
    let bidderThree = accounts[4];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Pink', {
          from: nameOwner,
          value: web3.utils.toWei('0.11', 'ether')
        })
        .then(function(result) {
          return instance.getCurrentOwnerOfName
            .call('Pink')
            .then(function(owner) {
              assert.equal(owner, nameOwner, 'Pink is now reserved');
            })
            .then(function() {
              return instance
                .bid('Pink', {
                  from: bidderOne,
                  value: web3.utils.toWei('2', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .bid('Pink', {
                  from: bidderThree,
                  value: web3.utils.toWei('15', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .acceptBidAndTransferOwnerShip('Pink', { from: nameOwner })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance.getCurrentOwnerOfName
                .call('Pink')
                .then(function(newOwner) {
                  assert.equal(
                    newOwner,
                    bidderThree,
                    'Pink is now owned by Bidder Three'
                  );
                });
            });
        });
    });
  });
  //6
  it('withdraw overbidden Bid', function() {
    let nameOwner = accounts[8];
    let bidderOne = accounts[6];
    let bidderTwo = accounts[5];
    let bidderThree = accounts[7];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Eric Clapton', {
          from: nameOwner,
          value: web3.utils.toWei('1', 'ether')
        })
        .then(function(result) {
          return instance.getCurrentOwnerOfName
            .call('Eric Clapton')
            .then(function(owner) {
              assert.equal(owner, nameOwner, 'Eric Clapton is now reserved');
            })
            .then(function() {
              return instance
                .bid('Eric Clapton', {
                  from: bidderOne,
                  value: web3.utils.toWei('2', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .bid('Eric Clapton', {
                  from: bidderTwo,
                  value: web3.utils.toWei('3', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .bid('Eric Clapton', {
                  from: bidderThree,
                  value: web3.utils.toWei('4', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Eric Clapton', { from: bidderOne })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Eric Clapton', { from: bidderTwo })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Eric Clapton', { from: bidderThree })
                .then(function(result) {
                  assert.isNotOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log(
                    'Top Bidder cannot remove his bid, Invalid Withdrawl'
                  );
                });
            })
            .then(function() {
              return instance
                .acceptBidAndTransferOwnerShip('Eric Clapton', {
                  from: nameOwner
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .then(function() {
                  return instance.getCurrentOwnerOfName
                    .call('Eric Clapton')
                    .then(function(newOwner) {
                      assert.equal(
                        newOwner,
                        bidderThree,
                        'Eric Clapton is now owned by Bidder Three'
                      );
                    });
                });
            });
        });
    });
  });

  //7
  it('should not allow to withdraw same bid twice', function() {
    let nameOwner = accounts[2];
    let bidderOne = accounts[7];
    let bidderTwo = accounts[6];
    let bidderThree = accounts[5];
    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Led Zeppelin', {
          from: nameOwner,
          value: web3.utils.toWei('1', 'ether')
        })
        .then(function(result) {
          return instance.getCurrentOwnerOfName
            .call('Led Zeppelin')
            .then(function(owner) {
              assert.equal(owner, nameOwner, 'Led Zeppelin is now reserved');
            })
            .then(function() {
              return instance
                .bid('Led Zeppelin', {
                  from: bidderOne,
                  value: web3.utils.toWei('2', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .bid('Led Zeppelin', {
                  from: bidderTwo,
                  value: web3.utils.toWei('3', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Led Zeppelin', { from: bidderOne })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Led Zeppelin', { from: bidderOne })
                .then(function(result) {})
                .catch(function(ex) {
                  console.log(
                    'You cannot withdraw twice, if you have bid just once'
                  );
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Led Zeppelin', { from: bidderThree })
                .then(function(result) {
                  assert.isNotOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log(
                    'Cannot Withdraw a bid that was not made, Invalid Withdrawl'
                  );
                });
            });
        });
    });
  });
  //8
  it('should allow full withdrawl if OverBidden', function() {
    let nameOwner = accounts[2];
    let bidderOne = accounts[0];
    let bidderTwo = accounts[1];

    return DNSRegistry.deployed().then(function(instance) {
      return instance
        .reserveName('Beatles', {
          from: nameOwner,
          value: web3.utils.toWei('1', 'ether')
        })
        .then(function(result) {
          return instance.getCurrentOwnerOfName
            .call('Beatles')
            .then(function(owner) {
              assert.equal(owner, nameOwner, 'Beatles is now reserved');
            })
            .then(function() {
              return instance
                .bid('Beatles', {
                  from: bidderOne,
                  value: web3.utils.toWei('2', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance
                .bid('Beatles', {
                  from: bidderTwo,
                  value: web3.utils.toWei('3', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .bid('Beatles', {
                  from: bidderOne,
                  value: web3.utils.toWei('4', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            })
            .then(function() {
              return instance
                .bid('Beatles', {
                  from: bidderTwo,
                  value: web3.utils.toWei('5', 'ether')
                })
                .then(function(result) {
                  assert.isOk(result.receipt);
                })
                .catch(function(ex) {
                  console.log('This should not get printed, Valid Bid');
                });
            }) // check contract balance now
            .then(function() {
              return instance.getTotalEtherHeldInContract
                .call()
                .then(function(balance) {
                  assert.equal(
                    web3.utils.fromWei('33000000000000000000', 'wei'),
                    web3.utils.fromWei(balance.toString(), 'wei'),
                    'Aggregate Balance is correct'
                  );
                });
            })
            .then(function() {
              return instance
                .withdrawOverBiddenBid('Beatles', { from: bidderOne })
                .then(function(result) {
                  assert.isOk(result.receipt);
                });
            })
            .then(function() {
              return instance.getTotalEtherHeldInContract
                .call()
                .then(function(newBalance) {
                  assert.equal(
                    web3.utils.fromWei('27000000000000000000', 'wei'),
                    web3.utils.fromWei(newBalance.toString(), 'wei'),
                    'Aggregate Balance is 27  after 6 Ether held for beatles from Bidder one is returned'
                  );
                });
            });
        });
    });
  });
});
