const StarDucksCappucinoToken = artifacts.require("StarDucksCappucinoToken");

module.exports = function(deployer) {
    deployer.deploy(StarDucksCappucinoToken, 100000);
}
