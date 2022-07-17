const ItemManager = artifacts.require("ItemManager");
// const Item = artifacts.require("Item");
// const Ownable = artifacts.require("Ownable");

module.exports = function (deployer) {
  deployer.deploy(ItemManager);
//   deployer.deploy(Ownable);
//   deployer.deploy(Item);
};
