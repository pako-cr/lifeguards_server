const Report = require("../models/report")

const saveReport = async(payload) => {
    try {
        const report = new Report(payload)
        await report.save()

        return true
    } catch (ex) {
        console.log(`❌ An error occurred saving the report in the DB. Description: ${ex}`)
    }
}

module.exports = {
    saveReport
}