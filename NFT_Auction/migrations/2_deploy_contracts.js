const Main = artifacts.require("MyContract");

module.exports = function (deployer) {
  deployer.deploy(Main);
};
