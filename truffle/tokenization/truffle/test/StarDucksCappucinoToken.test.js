const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("All tokens should be in my account", async () => {
        let instance = await StarDucksCappucinoToken.deployed();
        let totalSupply = await instance.totalSupply();

        // old version
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
 
        // expect
        // expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);

        // chai-as-promised
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;

        let instance = await StarDucksCappucinoToken.deployed();
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    // 2nd test 이후 before eact hook error 발생
    it("is not possible to send more tokens than available in total", async() => {
        let instance = await StarDucksCappucinoToken.deployed();
        let balanceOfDeployer = await instance.totalSupply();

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});


