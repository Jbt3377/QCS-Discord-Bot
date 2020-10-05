const getProperty = require("../common/environments.js")
const logger = require("../common/logger.js")
const GoogleSpreadsheet = require("google-spreadsheet")
const { promisify } = require("util")
const creds = require("../client_secret.json")

let accessSpreadsheet = async function(){

  const doc = new GoogleSpreadsheet(getProperty("SPREADSHEET_ID"))

  await promisify(doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  const sheet = info.worksheets[0]
  logger.Debug("Title: " + sheet.title + ", Rows: " + sheet.rowCount)

}

module.exports = accessSpreadsheet