const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");
const StarDucksCappucinoTokenCrowdsale = artifacts.require("StarDucksCappucinoTokenCrowdsale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenCrowdsale Test", async (accounts) => {
    
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount", async () => {
        let instance = await StarDucksCappucinoToken.deployed();

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the StarDucksCappucinoTokenCrowdsale Smart Contract by default", async () => {
        // my own code
        // let tokenInstance = await StarDucksCappucinoToken.deployed();
        // let crowdsaleInstance = await StarDucksCappucinoTokenCrowdsale.deployed();
        
        // let totalSupply = await tokenInstance.totalSupply();

        // expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
        // expect(totalSupply).to.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS));
        // return expect(crowdsaleInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

        // class code
        let instance = await StarDucksCappucinoToken.deployed();
        let balanceOfStarDucksCappucinoTokenCrowdsaleSmartContract = await instance.balanceOf(StarDucksCappucinoTokenCrowdsale.address);

        let totalSupply = await instance.totalSupply();

        return expect(balanceOfStarDucksCappucinoTokenCrowdsaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy tokens", async () => {
        const buyTokens = 1;

        let tokenInstance = await StarDucksCappucinoToken.deployed();
        let tokenCrowdsaleInstance = await StarDucksCappucinoTokenCrowdsale.deployed();
        let kycInstance = await KycContract.deployed();

        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        
        // expectd??? await??? ???????????? ????????????.
        // ??????????????? eventually??? async-await ??? ????????? ???????????????, ??????????????????.
        // Transaction??? ???????????? ?????????????????? ?????????????????? ??? ??????.

        await expect(tokenInstance.mint(tokenCrowdsaleInstance.address, buyTokens)).to.be.fulfilled;

        var totalSupply = await tokenInstance.totalSupply();

        expect(totalSupply).to.be.a.bignumber.equal(new BN(buyTokens));
        expect(tokenInstance.balanceOf(tokenCrowdsaleInstance.address)).to.eventually.be.a.bignumber.equal(new BN(buyTokens));

        await expect(tokenCrowdsaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;

        balanceBefore = balanceBefore.add(new BN(1));

        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    })
});


