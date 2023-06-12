import React from "react";
import { isLoggedUser } from "../../utils/browserDB";

const Profile = () => {
  const loggedUser = isLoggedUser();
  return <div>Profile {loggedUser.user.shortId} </div>;
};

export default Profile;
