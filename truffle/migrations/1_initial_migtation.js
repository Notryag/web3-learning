const NWFT = artifacts.require('NWFT')

module.exports = function(deployer) {
    deployer.deploy(NWFT, 'hello')
}