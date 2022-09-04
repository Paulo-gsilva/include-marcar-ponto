const sqlServer = require("mssql");

const config = {
  user: "admin",
  password: "12345678",
  server: "localhost",
  database: "include-marcar-ponto",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getConnection() {
  try {
    const pool = await sqlServer.connect(config);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getConnection;
