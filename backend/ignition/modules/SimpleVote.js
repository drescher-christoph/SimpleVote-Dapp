const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleVote", (m) => {
    const contract = m.contract("SimpleVote");

    return { contract };
});