var config = require("../dbconfig");
const sql = require('mssql');


async function GetRevenueDetail() {
    try {
        let pool = await sql.connect(config.configBi);
        let RevenueData = await pool.request()
        .query("EXEC GetRevenueDetail ");
        return RevenueData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetRevenueDetailWithFilter(StartDate,EndDate,sReport) {
    try {
        if(sReport=="allSelect")
        {
            sReport="All Channel";
        }
        let pool = await sql.connect(config.configBi);
        let RevenueData = await pool.request()
        .input('StartDate', sql.NVarChar, StartDate)
        .input('EndDate', sql.NVarChar,EndDate)
        .input('sReport', sql.NVarChar, sReport)
        .query("EXEC GetRevenueDetailWithFilter @StartDate,@EndDate,@sReport");
        return RevenueData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    GetRevenueDetail : GetRevenueDetail,
    GetRevenueDetailWithFilter:GetRevenueDetailWithFilter
}