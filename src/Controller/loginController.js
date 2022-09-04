const sqlServer = require("mssql");
const sqlServerPool = require("../../config");
const validation = [];
var url;

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.getUserData = async (req, res) => {
  try {
    const sqlServerConnect = await sqlServerPool();
    const result = await sqlServerConnect
      .request()
      .query("Select * from employee");
    sqlServerConnect.close();
    const name = result.recordset[0].employeeName;
    res.render("login", { name });
  } catch (error) {
    console.log(error);
  }
};

exports.loginValidation = async (req, res) => {
  try {
    let identifier = req.query.identificador;
    let password = req.query.senha;

    const sqlServerConnect = await sqlServerPool();
    const result = await sqlServerConnect
      .request()
      .query(`SELECT * FROM employee where employeeId = ${identifier}`);

    if (result.recordset.length == 0) return res.render("errorlogin");
    if (result.recordset.length != 0) {
      if (result.recordset[0].employeePassword != password) {
        return res.render("errorlogin");
      }
      validation.push(result.recordset[0].employeeId);
      const employeeName = result.recordset[0].employeeName;
      url = req.originalUrl;
      return res.render("markpoint", { employeeName });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.profilePage = async (req, res) => {
  try {
    const sqlServerConnect = await sqlServerPool();
    const result = await sqlServerConnect
      .request()
      .query(`SELECT * FROM employee where employeeId = ${validation[0]}`);

    const dataProfile = result.recordset[0];
    validation.pop();
    return res.render("perfil", { dataProfile, url });
  } catch (error) {
    console.log(error);
  }
};
