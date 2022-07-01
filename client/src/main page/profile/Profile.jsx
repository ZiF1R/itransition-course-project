import { Alert, AlertTitle, Avatar } from "@mui/material";
import React from "react";

function Profile({ currentUser }) {
  if (!currentUser) {
    return (
      <>
      <Alert severity="warning" style={{ width: "100%", marginTop: 30 }}>
        <AlertTitle>Warning</AlertTitle>
        You have no permissions to visit this page — <strong>sign up to continue!</strong>
      </Alert>
      </>
    );
  }

  return (
    <div style={{ marginTop: 30 }}>
      <div>

        <Avatar sx={{ width: 200, height: 200 }} />
      </div>
    </div>
  );
}

export default Profile;
