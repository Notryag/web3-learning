const NWTFtest = artifacts.require("NWTFtest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NWTFtest", function (/* accounts */) {
  it("should assert true", async function () {
    await NWTFtest.deployed();
    return assert.isTrue(true);
  });
});
