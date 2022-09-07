const sqlServer = require("mssql");
const sqlServerPool = require("../../config");
const validation = [];
var name = "string";
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
      const isAdmin = result.recordset[0].employeeAdminValidation;
      url = req.originalUrl;
      name = employeeName;
      return res.render("markpoint", { employeeName, isAdmin, url });
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
    console.log(validation);
    validation.splice(0, validation.length);
    return res.render("perfil", { dataProfile, url });
  } catch (error) {
    console.log(error);
  }
};

exports.markPointEntry = async (req, res) => {
  const hoursNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();
  const secondsNow = new Date().getSeconds();

  let minutes = minutesNow,
    seconds = secondsNow;
  if (minutesNow < 10) minutes = "0" + minutes;
  if (secondsNow < 10) seconds = "0" + seconds;

  const dateYear = new Date().getFullYear();
  const dateMonth = new Date().getMonth();
  const dateDay = new Date().getDate();

  let month = dateMonth;
  let day = dateDay;
  if (dateMonth < 10) month = "0" + (month + 1);
  if (dateDay < 10) day = "0" + day;

  const dayNow = `${day}/${month}/${dateYear}`;
  const timeNow = `${hoursNow}:${minutes}:${seconds}`;
  try {
    const sqlServerConnect = await sqlServerPool();
    await sqlServerConnect
      .request()
      .input("emplyoeeId", sqlServer.Int, validation[0])
      .input("employeeHourEntry", sqlServer.VarChar, timeNow)
      .input("employeeDateEntry", sqlServer.VarChar, dayNow)
      .query(
        "INSERT INTO PointRegisterEntry(employeeId, employeeHourEntry, employeeDateEntry) VALUES (@emplyoeeId, @employeeHourEntry, @employeeDateEntry)"
      );
    const employeeName = name;

    console.log(validation);
    validation.splice(0, validation.length);
    return res.render("markpointdescriptions", { employeeName, url });
  } catch (error) {
    console.log(error);
  }
};

exports.timeLine = async (req, res) => {
  try {
    const sqlServerConnect = await sqlServerPool();
    const result = await sqlServerConnect
      .request()
      .query(
        `SELECT * FROM PointRegisterEntry where employeeId = ${validation[0]}`
      );

    const timeArray = [];
    for (let i of result.recordset) {
      timeArray.push(i);
    }

    console.log(validation);
    validation.splice(0, validation.length);
    res.render("linhatempo", { timeArray, url });
  } catch (error) {
    console.log(error);
  }
};

exports.integrationForm = async (req, res) => {
  try {
    res.render("forms", { url });
  } catch (error) {
    console.log(error);
  }
};
