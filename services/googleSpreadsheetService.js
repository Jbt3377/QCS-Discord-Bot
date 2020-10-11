const getProperty = require("../common/environments.js")
const logger = require("../common/logger.js")
const GoogleSpreadsheet = require("google-spreadsheet")
const { promisify } = require("util")
const creds = require("../client_secret.json")

exports.accessSpreadsheet = async function(){

  const doc = new GoogleSpreadsheet(getProperty("SPREADSHEET_ID"))

  await promisify(doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  const sheet = info.worksheets[0]
  logger.Info("Spreadsheet Info [Title: " + sheet.title + ", Rows: " + sheet.rowCount + "]")

  const rows = await promisify(sheet.getRows)({
    offset: 1
  })

  return rows
}

exports.isQcsMember = async function(message){

  logger.Debug("Entered isQcsMember Method")

  const studentNumber = message.content
  var hasMembership = false

  await exports.accessSpreadsheet().then(rows => {
    rows.forEach(row => {
      if(row.studentid == studentNumber){
        logger.Debug("Found QCS Member with ID: " + studentNumber)
        hasMembership = true
      }
    })
  })

  logger.Debug("Leaving isQcsMember Method")

  return hasMembership;
}