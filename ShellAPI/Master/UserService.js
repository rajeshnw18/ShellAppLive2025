var config = require("../dbconfig");
const sql = require('mssql');
var UserModel = require("../Master/UserModel");


async function SaveUserMaster(displayName,userName,Password,emailId,employeeCode,mobileNo,authenticateLocation,authenticateType, roleType,status) {
    try {
      
    
        // Establish a connection to the SQL server
        let pool = await sql.connect(config.configBi);
        // Configure the request and add parameters
        let request = pool.request();
        request.input('lgDisplayName', sql.NVarChar, displayName);
        request.input('lgUserName', sql.NVarChar, userName);
        request.input('lgPassword', sql.Int, Password);
        request.input('lgEmailID', sql.NVarChar, emailId);
        request.input('lgEmployeeCode', sql.NVarChar, employeeCode);
        request.input('lgMobileNo', sql.NVarChar, mobileNo);
        request.input('lgAuthenticateLocation', sql.NVarChar, authenticateLocation);
        request.input('lgAuthenticateType', sql.NVarChar, authenticateType);
        request.input('lgRoleType', sql.NVarChar, roleType);
        request.input('lgActive', sql.Bit, status);
        // Define the output parameter
        request.output('Msg', sql.NVarChar); 
        // Execute the stored procedure
        let result = await request.execute('Sproc_SaveUserMaster');
        console.log(result.output);
        return {
            recordsets: result.recordsets,
            output: result.output // Contains the output parameter value
           
        };
    } catch (err) {
        console.log(err);
        throw err; 
    }
}


async function UpdateUserMaster(UserModel) {

    try {
        let pool = await sql.connect(config.configShell);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, UserModel.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function DeleteUserMaster(UserModel) {

    try {
        let pool = await sql.connect(config.configShell);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, UserModel.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function GetUserDetails() {
    try {
        let pool = await sql.connect(config.configBi);
        let User = await pool.request()
        .query("EXEC GetUserDetails ");
        return User.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function GetUserWithFilter(userid) {
    try {
        let pool = await sql.connect(config.configShell);
        let product = await pool.request()
            .input('input_parameter', sql.Int, userid)
            .query("SELECT * from tblloginmaster where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    SaveUserMaster : SaveUserMaster,
    UpdateUserMaster : UpdateUserMaster,
    DeleteUserMaster : DeleteUserMaster,
    GetUserDetails : GetUserDetails,
    GetUserWithFilter : GetUserWithFilter
}