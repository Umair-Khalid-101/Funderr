import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages imports
import {
  Categories,
  ContactUs,
  HowItWorks,
  Landing,
  Login,
  SignUp,
  Donate,
  ByCategory,
  DonationSuccessfull,
  RaisedDonations,
} from "./pages";

// User Dashboard
import {
  Dashboard,
  CreateCampaign,
  AllCampaigns,
  Profile,
  MyCampaigns,
  MyFavCampaigns,
  UserNotifications,
  UserTranactions,
  EditCampaign,
  EditProfile,
} from "./pages/UserDashboard";

// Admin Dashboard
import {
  AdminDashboard,
  AdminAllCampaigns,
  AllUsers,
  ApproveCampaigns,
  AdminProfile,
  FeaturedCampaigns,
  Approve,
} from "./pages/AdminDashboard";

// Nav Auth
import { RequireAuth } from "./components";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/Approve/:title"
          element={
            // <RequireAuth>
            <Approve />
            // </RequireAuth>
          }
        />
        <Route
          path="/Details/:title"
          element={
            // <RequireAuth>
            <RaisedDonations />
            // </RequireAuth>
          }
        />
        <Route
          path="/EditCampaign/:title"
          element={
            <RequireAuth>
              <EditCampaign />
            </RequireAuth>
          }
        />
        <Route
          path="/EditProfile/:name"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/Campaigns/:category"
          element={
            // <RequireAuth>
            <ByCategory />
            // </RequireAuth>
          }
        />
        <Route
          path="/Donate"
          element={
            <RequireAuth>
              <Donate />
            </RequireAuth>
          }
        />
        <Route
          path="/Success"
          element={
            //<RequireAuth>
            <DonationSuccessfull />
            //</RequireAuth>
          }
        />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/UserDashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="create-campaign" element={<CreateCampaign />} />
          <Route path="allcampaigns" element={<AllCampaigns />} />
          <Route path="mycampaigns" element={<MyCampaigns />} />
          <Route path="myfavcampaigns" element={<MyFavCampaigns />} />
          <Route path="notifications" element={<UserNotifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="transactions" element={<UserTranactions />} />
        </Route>
        <Route
          path="/AdminDashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        >
          <Route path="admin-allcampaign" element={<AdminAllCampaigns />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="approve-campaigns" element={<ApproveCampaigns />} />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="featured-campaigns" element={<FeaturedCampaigns />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
