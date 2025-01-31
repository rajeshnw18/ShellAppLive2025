import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "0b93ba8c-4011-42fa-a9de-f1771d57e77c", // Your Client ID
    authority: "https://login.microsoftonline.com/1f7f0776-6306-48ff-b33c-0865ad7c02b7", // Your Tenant ID
    redirectUri: "http://localhost:3000", // Change this in production
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);
export default msalInstance;
