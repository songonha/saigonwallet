const BonsaiCertification = artifacts.require("BonsaiCertification");

module.exports = function (deployer) {
    deployer.deploy(BonsaiCertification);
};

