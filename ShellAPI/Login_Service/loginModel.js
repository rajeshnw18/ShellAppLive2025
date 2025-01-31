class LoginModel{
    constructor(lgLoginID,lgPassword,lgDisplayName,lgUserName,lgPassword,lgEmployeeCode,lgEmailID,lgMobileNo,lgAuthenticateType,lgActive,statusCode){
        this.lgLoginID = lgLoginID; 
        this.lgPassword = lgPassword; 
        this.lgDisplayName = lgDisplayName; 
        this.lgUserName = lgUserName; 
        this.lgPassword = lgPassword;
        this.lgEmployeeCode = lgEmployeeCode;
        this.lgEmailID = lgEmailID; 
        this.lgMobileNo = lgMobileNo;
        this.lgAuthenticateType = lgAuthenticateType; 
        this.lgActive=lgActive;
        this.statusCode=statusCode;
    }
}

module.exports = LoginModel;