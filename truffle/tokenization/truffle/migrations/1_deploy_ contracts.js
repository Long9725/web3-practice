const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");
const StarDucksCappucinoTokenCrowdsale = artifacts.require("StarDucksCappucinoTokenCrowdsale");
const KycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();

    await deployer.deploy(StarDucksCappucinoToken, addr[0], addr[0]);
    await deployer.deploy(KycContract);
    await deployer.deploy(StarDucksCappucinoTokenCrowdsale, 1, addr[0], StarDucksCappucinoToken.address, KycContract.address);

    // let instance = await StarDucksCappucinoToken.deployed();

    // await instance.transfer(StarDucksCappucinoTokenCrowdsale.address, process.env.INITIAL_TOKENS);
}
