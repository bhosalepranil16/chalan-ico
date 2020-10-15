const Chalan = artifacts.require("Chalan");
const ChalanICO = artifacts.require("ChalanICO");

module.exports = async function (deployer,accounts) {

    await deployer.deploy(Chalan).then(function(){
        return deployer.deploy(ChalanICO, Chalan.address);
    });

    const chalan = await Chalan.deployed();
    const chalanICO = await ChalanICO.deployed();

    await chalan.transfer(chalanICO.address, 900000);
    console.log(chalanICO.address);
};
