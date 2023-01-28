import React from "react";

import { EditProfileForm } from "../../components/Forms";
import { Navbar } from "../../components";

const EditProfile = () => {
  return (
    <>
      <Navbar />
      <div>
        <EditProfileForm />
      </div>
    </>
  );
};

export default EditProfile;
