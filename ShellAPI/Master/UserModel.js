class UserModel{
    constructor(lgLoginID,displayName,userName,password,employeeCode,emailId,mobileNo,roleType,authenticateType,authenticateLocation,status,statusCode){
        this.lgLoginID = lgLoginID; 
        this.displayName = displayName; 
        this.userName = userName; 
        this.password = password;
        this.employeeCode = employeeCode;
        this.emailId = emailId; 
        this.roleType=roleType,
        this.mobileNo = mobileNo;
        this.authenticateType = authenticateType; 
        this.authenticateLocation=authenticateLocation,
        this.status=status;
        this.statusCode=statusCode;
    }
}

module.exports = UserModel;
