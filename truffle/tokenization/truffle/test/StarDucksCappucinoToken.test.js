const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Token Test", async (accounts) => {
    
    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
       this.starDucksCappucinoToken = await StarDucksCappucinoToken.new(deployerAccount, deployerAccount);
    });

    afterEach(async () => {

    });

    it("All tokens should be in my account", async () => {
        let instance = this.starDucksCappucinoToken;
        let totalSupply = await instance.totalSupply();

        // old version
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
 
        // expect
        // expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);

        // chai-as-promised
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to mint tokens to recipient", async() => {
        const mintTokens = 1;

        let instance = this.starDucksCappucinoToken;
        var totalSupply = await instance.totalSupply();

        expect(totalSupply).to.be.a.bignumber.equal(new BN(0));

        // 2nd test 이후 before eact hook error 발생 => expectd에 await를 추가하니 해결됐다.
        // 강의에서는 eventually가 async-await 인 것으로 알려줬는데, 아니었나보다.
        // Transaction이 완료되고 채굴되기까지 기다려야하는 것 같다.
        await expect(instance.mint(recipient, mintTokens)).to.eventually.be.fulfilled;

        totalSupply = await instance.totalSupply();

        expect(totalSupply).to.be.a.bignumber.equal(new BN(mintTokens));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    // 2nd test 이후 before eact hook error 발생
    it("is not possible to send more tokens than available in total", async() => {
        let instance = this.starDucksCappucinoToken;
        let balanceOfDeployer = await instance.totalSupply();

        let BN_balanceOfDeployerAddOne = new BN(balanceOfDeployer + 1);

        expect(instance.transfer(recipient, BN_balanceOfDeployerAddOne)).to.eventually.be.rejected;

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});


