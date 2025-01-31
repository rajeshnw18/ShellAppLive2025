import React from "react";
import { useMsal } from "@azure/msal-react";

const Profile = () => {
  const { accounts } = useMsal();

  return (
    <div>
      <h2>User Info</h2>
      {accounts.length > 0 ? (
        <p>Welcome, {accounts[0].username}!</p>
      ) : (
        <p>No user is logged in.</p>
      )}
    </div>
  );
};

export default Profile;
