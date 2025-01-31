var config = require("../../ShellAPI/dbconfig");
const sql = require('mssql');


// GetLogin Request 
async function GetLogin(lgUserName,lgPassword) {
    try {
        let pool = await sql.connect(config.configBi);
        let LoginDetails = await pool.request()
            .input('input_lgUserName', sql.VarChar, lgUserName)
            .input('input_lgPassword', sql.VarChar, lgPassword)
            .query("SELECT lgLoginID,lgUserName,lgDisplayName,lgEmployeeCode,lgEmailID,lgMobileNo,lgAuthenticateType,lgActive from tblLoginMaster where lgUserName = @input_lgUserName and lgPassword = @input_lgPassword ");
        
            //const apiEndpoint = 'https://adlogin.nw18.com/Network18AD/Authenticator/ValidateLogin';
            //const requestData = {
             // Username: lgUserName,
             // Password: lgPassword
            //};
            //const response = await axios.post(apiEndpoint, requestData, {
             // headers: {
             // 'Content-Type': 'application/json',
             //  }
            // });
             //console.log('API Response:', response.data);

            return LoginDetails.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
// GetLogin Details 
async function GetLoginDetails() {
    try {
        let pool = await sql.connect(config.configBi);
        let LoginDetails = await pool.request().query("SELECT lgLoginID,lgUserName,lgDisplayName,lgEmployeeCode,lgEmailID,lgMobileNo,lgAuthenticateType,lgActive from tblLoginMaster");
        return LoginDetails.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function GetLoginRequest(LoginModel) {

    try {
        let pool = await sql.connect(config.configBi);
        let LoginDetails = await pool.request()
            .input('input_lgUserName', sql.VarChar, LoginModel.lgUserName)
            .input('input_lgPassword', sql.VarChar, LoginModel.lgPassword)
            .query("SELECT lgLoginID,lgUserName,lgDisplayName,lgEmployeeCode,lgEmailID,lgMobileNo,lgAuthenticateType,lgActive, '200' statusCode from tblLoginMaster where lgUserName = @input_lgUserName and lgPassword=@input_lgPassword");
        return LoginDetails.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

module.exports = {
    GetLogin: GetLogin,
    GetLoginDetails : GetLoginDetails,
    GetLoginRequest:GetLoginRequest
}