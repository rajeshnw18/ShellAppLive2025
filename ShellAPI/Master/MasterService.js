var config = require("../dbconfig");
const sql = require('mssql');


async function GetChannelMaster() {
    try {
        let pool = await sql.connect(config.configBi);
        let RevenueData = await pool.request()
        .query("EXEC GetChannelList ");
        return RevenueData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function GetAdvertiserMaster() {
    try {
        let pool = await sql.connect(config.configBi);
        let MasterData = await pool.request()
        .query("select Id,AGENCYNAME,SAPCODE,PAYMENTTERM,PANNO,FileName, FilePath, FileSize from TBLAGENCYMASTER  ");
        return MasterData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetCountryMaster() {
    try {
        let pool = await sql.connect(config.configBi);
        let MasterData = await pool.request()
        .query(" SELECT cnCountryID , cnCountryName  FROM TBLCOUNTRYMASTER  WHERE cnCountryID IN (1000000120,1000000034,1000000051)  ");
        return MasterData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetCountryWiseStateMaster(CountryId) {
    try {
        let pool = await sql.connect(config.configBi);
        let product = await pool.request()
            .input('input_CountryId', sql.Int, CountryId)
            .query("SELECT stStateID, stStateName FROM tblStateMaster WHERE st_cnCountryID= @input_CountryId");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetCityWiseStateMaster(StateID) {
    try {
        let pool = await sql.connect(config.configBi);
        let product = await pool.request()
            .input('input_StateID', sql.Int, StateID)
            .query("SELECT ctCityID, ctCityName FROM tblCityMaster WHERE ct_stStateID= @input_StateID");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetlocationMaster() {
    try {
        let pool = await sql.connect(config.configBi);
        let MasterData = await pool.request()
        .query(" EXEC Get_LocationMaster ");
        return MasterData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    GetChannelMaster : GetChannelMaster,
    GetAdvertiserMaster : GetAdvertiserMaster,
    GetCountryMaster : GetCountryMaster,
    GetCountryWiseStateMaster:GetCountryWiseStateMaster,
    GetCityWiseStateMaster:GetCityWiseStateMaster,
    GetlocationMaster:GetlocationMaster
}