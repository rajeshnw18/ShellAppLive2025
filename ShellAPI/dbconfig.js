const configShell = {
    user: 'sa',
    password: 'Network@18',
    server: '192.168.41.58',
    database: 'BIREACT',
    options: {
      encrypt: true, // Use encryptiozln
      trustServerCertificate: true, // Bypass the self-signed certificate issue
    },
  };

  const configBi = {
    user: 'sa',
    password: 'PowerBI@Network18',
    server: '192.168.26.221',
    database: 'SHELL18BI',
    options: {
      encrypt: true, // Use encryptiozln
      trustServerCertificate: true, // Bypass the self-signed certificate issue
    },
  };
 
  

module.exports ={
  configShell: configShell,
  configBi : configBi
}

