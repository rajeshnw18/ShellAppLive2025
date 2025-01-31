const dboperations = require('./dboperations');
const LoginService = require('../shellapi/Login_Service/loginService');
const DashboardService = require('../ShellAPI/DashBoardReport/DashboardService');
const MasterService = require('./Master/MasterService');
const RevenueService = require('./RevenueReport/RevenueService');
const UserService = require('./Master/UserService');
const multer = require("multer");
const sql = require('mssql');
var config = require("../ShellAPI/dbconfig");
const path = require("path"); // Import the 'path' module
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const Jwt=require('jsonwebtoken');
const JwtKey="ecom"
// Set up the EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//#region  ....middleware.......
router.use((request,response,next)=>{
  const token=request.headers['authorization']
  console.log('ShellApi-middleware',token);
  next();
})

function verifyToken(request, response, next) {
  let authHeader = request.headers['authorization'];
  if (!authHeader) {
      return response.status(401).send({ result: "Access Denied: No Token Provided" });
  }
  let tokenParts = authHeader.split(' '); // Split "Bearer <token>"
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return response.status(401).send({ result: "Invalid Token Format" });
  }
  let token = tokenParts[1]; // Extract the actual token
  Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
          return response.status(401).send({ result: "Invalid Token" });
      } else {
          console.log('ShellApiverifyToken-middleware', token);
          next();
      }
  });
}

//#endregion

// Login route
router.route('/login').post((request,response)=>{
  let Login = {...request.body}
  LoginService.GetLogin(Login.lgUserName, Login.lgPassword)
  .then(result => {
   if (result && result[0] && result[0].length > 0) {
        const loginDetails = result[0][0]; // Access the first record
        if (loginDetails) {
          Jwt.sign({loginDetails},JwtKey , { expiresIn: "2h"} ,(err,token) => {
           
            return response.status(200).json({ status:200, message: 'Login successful', 
              userName: result[0][0].lgDisplayName,auth: token });

          })
        }
        else
        {
         return response.status(401).json({ status:401, message: 'Invalid credentials' });
        }
      
    } else {
        
         return response.status(401).json({ status:401, message: 'Invalid credentials' });
    }
  })
  .catch(error => {
    

});


});
//#region  .............Login API Details

// GetLogin Request 
router.route('/GetLogin/:lgUserName/:lgPassword').get((request,response)=>{
   LoginService.GetLogin(request.params.lgUserName,request.params.lgPassword
   ).then(result => {
       response.json(result[0]);
    })
 
 })
// GetLogin Details 
router.route('/GetLoginDetails').get((request,response)=>{
   LoginService.GetLoginDetails().then(result => {
       response.json(result[0]);
    })

})

router.route('/GetLoginRequest').post((request,response)=>{
   console.log(GetLoginRequest);
   let Login = {...request.body}
   console.log(Login.lgUserName);
   const { lgUserName, lgPassword } = request.body;
   console.log(lgUserName);
   console.log(lgPassword);
   
   LoginService.GetLogin(Login.lgUserName,Login.lgPassword
   ).then(result => {
       response.json(result[0]);
    })

})

//#endregion

//#region  .............orders API Details
//router.route('/').get((request,response)=>{
  // response.json({ message: 'Hello from the backend!' });
//})


router.route('/orders').get((request,response)=>{
    dboperations.getOrders().then(result => {
       response.json(result[0]);
       console.log(result.recordset);
    })

})

router.route('/orders/:Id').get((request,response)=>{
   dboperations.getOrder(request.params.Id).then(result => {
      response.json(result[0]);
   })

})

router.route('/orders').post((request,response)=>{
   let order = {...request.body}
   dboperations.addOrder(order).then(result => {
      response.status(201).json(result);
   })

})

//#endregion

//#region ---Dashboard Report 

router.route('/GetRevenueBarGraph/:StartDate/:EndDate/:sReport').get((request,response)=>{
   DashboardService.GetRevenueBarGraphReport(request.params.StartDate,request.params.EndDate,request.params.sReport).then(result => {
      response.status(200).json(result);
      
      
   })

})

//#endregion

//#region ---Revenue Report 
router.route('/GetRevenueDetail').get((request,response)=>{
   RevenueService.GetRevenueDetail().then(result => {
      response.json(result[0]);
      console.log(result.recordset);
   })

})

router.route('/GetRevenueDetailWithFilter/:StartDate/:EndDate/:sReport').get((request,response)=>{
   RevenueService.GetRevenueDetailWithFilter(request.params.StartDate,request.params.EndDate,request.params.sReport).then(result => {
      response.json(result[0]);
      console.log(result.recordset);
   })

})

//#endregion

//#region ----Channel-Master ....


router.route('/GetChannelMaster',verifyToken).get((request,response)=>{
   MasterService.GetChannelMaster().then(result => {
      response.json(result[0]);
      console.log(result.recordset);
   })

})

//#endregion

//#region ----User -Master ....

router.route('/SaveUserMaster').post((request,response)=>{
   let UserMaster = {...request.body}
   const user = request.body.UserModel;
   // Validate incoming data
   if (!user || !user.userName || !user.emailId) {
       return request.status(400).json({
           status: "error",
           statusMessage: "Invalid input data. Please provide all required fields."
       });
   }
   

   UserService.SaveUserMaster(user.displayName,user.userName,user.Password,user.emailId,user.employeeCode,user.mobileNo,user.authenticateLocation,user.authenticateType, user.roleType,user.status,user
   ).then(result => {
      //response.status(201).json(result);
      response.status(200).json({ 
         status:200, 
         data: result.recordsets,
         outputMassage: result.output
        });


   })

})

router.route('/GetUserWithFilter/:Id').get((request,response)=>{
   UserService.GetUserWithFilter(request.params.Id).then(result => {
      response.json(result[0]);
   })

})


router.route('/GetUserDetails').get((request,response)=>{
   UserService.GetUserDetails().then(result => {
      response.json(result[0]);
      console.log(result.recordset);
   })

})

//#endregion


//#region -----File Upload 
// Configure Multer for file upload
// Configure Multer to preserve file extensions
const storage = multer.diskStorage({
   destination: "uploads/", // Destination folder for uploaded files
   filename: (req, file, cb) => {
     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
     const fileExtension = path.extname(file.originalname); // Get the original file extension
     const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
     cb(null, fileName); 
   },
 });
 
 const upload = multer({ storage: storage });
// Upload API Endpoint
router.post("/upload", upload.array("files"), async (req, res) => {
      const { AGENCYNAME, SAPCODE, PAYMENTTERM,PANNO,Id } = req.body;
      const files = req.files;
   try {
     const pool = await sql.connect(config.configBi);
 
     for (const file of files) {
      const { originalname, filename, size, path: filePath } = file;
 
       // Save file metadata to SQL Server
       await pool
         .request()
         .input("Id", sql.NVarChar, Id)
         .input("AGENCYNAME", sql.NVarChar, AGENCYNAME)
         .input("SAPCODE", sql.NVarChar, SAPCODE)
         .input("PAYMENTTERM", sql.NVarChar, PAYMENTTERM)
         .input("PANNO", sql.NVarChar, PANNO)
         .input("fileName", sql.NVarChar, originalname) // Original file name with extension
         .input("filePath", sql.NVarChar, filePath) // Save the full file path with extension
         .input("fileSize", sql.BigInt, size)
        // .query(
          // "INSERT INTO TBLAGENCYMASTER (AGENCYNAME,SAPCODE,PAYMENTTERM,PANNO,FileName, FilePath, FileSize) VALUES (@AGENCYNAME,@SAPCODE,@PAYMENTTERM,@PANNO,@fileName, @filePath, @fileSize)"
        // );
        .query(`
         IF EXISTS (SELECT 1 FROM TBLAGENCYMASTER WHERE Id = @Id)
         BEGIN
             UPDATE TBLAGENCYMASTER
             SET 
                 AGENCYNAME = @AGENCYNAME,
                 PAYMENTTERM = @PAYMENTTERM,
                 PANNO = @PANNO,
                 FileName = @fileName,
                 FilePath = @filePath,
                 FileSize = @fileSize
             WHERE Id = @Id
         END
         ELSE
         BEGIN
             INSERT INTO TBLAGENCYMASTER (AGENCYNAME, SAPCODE, PAYMENTTERM, PANNO, FileName, FilePath, FileSize)
             VALUES (@AGENCYNAME, @SAPCODE, @PAYMENTTERM, @PANNO, @fileName, @filePath, @fileSize)
         END
       `);
         
     }
     // Respond with uploaded data
   
     let RevenueData = await pool.request()
             .query("select Id,AGENCYNAME,SAPCODE,PAYMENTTERM,PANNO,FileName, FilePath, FileSize from TBLAGENCYMASTER ");
            
     res.json(
      RevenueData.recordsets
     );
   } catch (error) {
     console.error("Error saving files to database:", error);
     res.status(500).send("Error uploading files");
   }
 });

router.route('/GetAdvertiserMaster').get((request,response)=>{
   MasterService.GetAdvertiserMaster().then(result => {
      response.json(result[0]);
      console.log(result.recordset);
   })

})

// API to download a file
 router.get("/AdvertiserFile", async (req, res) => {
   const filePath = req.query.path; // Get the full file path from query parameters
   if (!filePath) {
     return res.status(400).send("File path is required.");
   }
 
   try {
     // Use path.basename to extract the file name with the extension
     const fileName = path.basename(filePath);
 
     // Send the file to the client with the correct file name and extension
     res.download(filePath, fileName, (err) => {
       if (err) {
         console.error("Error downloading file:", err);
         res.status(500).send("Error downloading file");
       }
     });
   } catch (error) {
     console.error("Error serving the file:", error);
     res.status(500).send("Error serving the file");
   }
 });
 
 router.route("/AdvertiserDelete").post(async (request, response) => {
   try {
     const { AGENCYNAME } = request.body; // Destructure AGENCYNAME from the request body
     if (!AGENCYNAME) {
       return response.status(400).send("AGENCYNAME is required.");
     }
 
     const pool = await sql.connect(config.configBi);
 
     // Perform the delete query
     const result = await pool.request()
       .input("input_parameter", sql.VarChar, AGENCYNAME)
       .query("DELETE FROM TBLAGENCYMASTER WHERE AGENCYNAME = @input_parameter");
 
     // Return a success message or relevant data
     response.status(200).json({
       message: `Agency '${AGENCYNAME}' deleted successfully.`,
       affectedRows: result.rowsAffected[0],
     });
   } catch (error) {
     console.error("Error deleting agency:", error);
     response.status(500).send("An error occurred while deleting the agency.");
   }
 });
//#endregion

//#region < Location -Master>
router.route('/GetCountryMaster').get((request,response)=>{
  MasterService.GetCountryMaster().then(result => {
     response.json(result[0]);
     console.log(result.recordset);
  })

})

router.route('/GetCountryWiseStateMaster/:CountryId').get((request,response)=>{
 MasterService.GetCountryWiseStateMaster(request.params.CountryId).then(result => {
    response.json(result[0]);
    console.log(result.recordset);

 })

})

router.route('/GetCityWiseStateMaster/:stateId').get((request,response)=>{
  MasterService.GetCityWiseStateMaster(request.params.stateId).then(result => {
     response.json(result[0]);
     console.log(result.recordset);

  })
 
 })


 router.route('/GetlocationMaster',verifyToken).get((request,response)=>{
  MasterService.GetlocationMaster().then(result => {
     response.json(result[0]);
     console.log(result.recordset);
     
  })

})

router.post("/SaveLocation",async (req, res) => {
   const { country, state,city,locationName,activeStatus,id} = req.body;
   
try {
  const pool = await sql.connect(config.configBi);
    // Save file metadata to SQL Server
    await pool
      .request()
      .input("Id", sql.Int, id)
      .input("country", sql.Int, country)
      .input("state", sql.Int, state)
      .input("city", sql.Int, city)
      .input("locationName", sql.NVarChar, locationName)
      .input("activeStatus", sql.Bit, activeStatus)
     .query(`
      IF EXISTS (SELECT * FROM TBLLOCATIONMASTER WHERE LocationId = @Id)
      BEGIN
          UPDATE TBLLOCATIONMASTER
          SET 
              country = @country,
              state = @state,
              city = @city,
              locationName = @locationName,
              activeStatus = @activeStatus
          WHERE LocationId = @Id
      END
      ELSE
      BEGIN
          INSERT INTO TBLLOCATIONMASTER (country, state, city, locationName,activeStatus)
          VALUES (@country, @state, @city, @locationName,@activeStatus)
      END
    `);
      
  
  // Respond with uploaded data

  let RevenueData = await pool.request()
          .query("select * from TBLLOCATIONMASTER ");
         
  res.json(
   RevenueData.recordsets
  );
} catch (error) {
  console.error("Error saving Location to database:", error);
  res.status(500).send("Error uploading Location");
}
});


router.route('/DeleteLocation/:id').get((request,response)=>{
  MasterService.DeleteLocation(request.params.id).then(result => {
     response.json(result[0]);
     console.log(result.recordset);

  })
 
 })

//#endregion < Location -Master>


// Collect all registered routes dynamically
const collectRoutes = (app) => {
   const routes = [];
   app._router.stack.forEach((middleware) => {
     if (middleware.route) {
       // Routes registered directly
       routes.push({
         method: Object.keys(middleware.route.methods)[0].toUpperCase(),
         path: middleware.route.path,
       });
     } else if (middleware.name === "router") {
       // Routes registered using a router
       middleware.handle.stack.forEach((handler) => {
         if (handler.route) {
           routes.push({
             method: Object.keys(handler.route.methods)[0].toUpperCase(),
             path: handler.route.path,
           });
         }
       });
     }
   });
   return routes;
 };
 
 // Render the API Dashboard
 app.get("/", (req, res) => {
   const routes = collectRoutes(app); // Collect the routes dynamically
   res.render("dashboard", { routes });
 });
 


var port = process.env.PORT || 5002;
app.listen(port);
console.log('Shell API is runnning at ' + port);




