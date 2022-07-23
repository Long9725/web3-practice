const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
const _deploy_Contracts = require("../migrations/1_deploy_ contracts");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    it("All tokens should be in my account", async () => {
        let instance = await StarDucksCappucinoToken.deployed();
        let totalSupply = await instance.totalSupply();

        // old version
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
 
        // expect
        // expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);

        // chai-as-promised
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
    })
});


