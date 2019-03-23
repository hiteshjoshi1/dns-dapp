pragma solidity >=0.4.0 <0.6.0;
contract ProtectReEntry {

    // true if we are inside an external function
    bool reentryProtector;

    // Mark contract as having entered an external function.
    // Throws an exception if called twice with no externalLeave().
    function externalEnter() internal {
        if (reentryProtector) {
            revert();
        }
        reentryProtector = true;
    }

    // Mark contract as having left an external function.
    // Do this after each call to externalEnter().
    function externalLeave() internal {
        reentryProtector = false;
    }

}