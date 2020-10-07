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
  logger.Debug("Title: " + sheet.title + ", Rows: " + sheet.rowCount)

  const rows = await promisify(sheet.getRows)({
    offset: 1
  })
}

exports.isQcsMember = async function(message){

  logger.Info("Entered isQcsMember Method")

  const studentNumber = message.content
  const doc = new GoogleSpreadsheet(getProperty("SPREADSHEET_ID"))

  await promisify(doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  const sheet = info.worksheets[0]

  const rows = await promisify(sheet.getRows)({
    offset: 1
  })

  var hasMembership = false
  rows.forEach(row => {
    if(row.studentid == studentNumber){
      logger.Debug("Found QCS Member with ID: " + studentNumber)
      hasMembership = true
    }
  })

  return hasMembership;
}