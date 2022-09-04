const sqlServer = require("mssql");
const sqlServerPool = require("../../config");

const getUserData = async () => {
  try {
    const sqlServerConnect = await sqlServerPool();
    const result = await sqlServerConnect
      .request()
      .query("Select * from employee");
    sqlServerConnect.close();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserData,
};
