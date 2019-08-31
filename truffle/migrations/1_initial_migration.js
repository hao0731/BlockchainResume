const Migrations = artifacts.require("Migrations");
const StrLib = artifacts.require('StrLib');
const Resume = artifacts.require('Resume');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(StrLib);
  deployer.link(StrLib, Resume);
  deployer.deploy(Resume, 'HAO', '0x579c43911C862E16fEB199233ec2d32e441b7713', 21, 0);
};
