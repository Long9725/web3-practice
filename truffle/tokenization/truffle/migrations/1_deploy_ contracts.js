const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");
const StarDucksCappucinoTokenCrowdsale = artifacts.require("StarDucksCappucinoTokenCrowdsale");

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();

    await deployer.deploy(StarDucksCappucinoToken, 100000);
    await deployer.deploy(StarDucksCappucinoTokenCrowdsale, 1, addr[0], StarDucksCappucinoToken.address);

    let instance = await StarDucksCappucinoToken.deployed();

    await instance.transfer(StarDucksCappucinoTokenCrowdsale.address, 100000);
}
