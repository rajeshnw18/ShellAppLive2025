var config = require("../dbconfig");
const sql = require('mssql');


async function GetRevenueBarGraphReport(StartDate,EndDate,sReport) {
    try {
        let pool = await sql.connect(config.configBi);
        let RevenueBarData = await pool.request()
        .input('StartDate', sql.NVarChar, StartDate)
        .input('EndDate', sql.NVarChar,EndDate)
        .input('sReport', sql.NVarChar, sReport)
        .query("EXEC GET_REVENUE_BAR_REPORTDATA @StartDate,@EndDate,@sReport");
        return RevenueBarData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    GetRevenueBarGraphReport : GetRevenueBarGraphReport
}