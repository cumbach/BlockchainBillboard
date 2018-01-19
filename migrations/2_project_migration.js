var Ownable = artifacts.require("./Ownable.sol");
var CanvasCore = artifacts.require("./CanvasCore.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
    deployer.link(Ownable, CanvasCore);
  deployer.deploy(CanvasCore, 256, true, 1000000000000000);
};
