import {
  createCampaign,
  logout,
  profile,
  mycampaigns,
  favorites,
  notifications,
  Create,
  Transaction,
  UsersIcon,
  approve,
  Featured,
  Medical,
  Art,
  Illustration,
  Social,
  Technical,
  Music,
} from "../assets";

export const navlinks = [
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/UserDashboard/allcampaigns",
  },
  {
    name: "mycampaign",
    imgUrl: mycampaigns,
    link: "/UserDashboard/mycampaigns",
  },
  {
    name: "favcampaign",
    imgUrl: favorites,
    link: "/UserDashboard/myfavcampaigns",
  },
  {
    name: "notifications",
    imgUrl: notifications,
    link: "/UserDashboard/notifications",
  },
  {
    name: "createcampaigns",
    imgUrl: Create,
    link: "/UserDashboard/create-campaign",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/UserDashboard/profile",
  },
  {
    name: "transactions",
    imgUrl: Transaction,
    link: "/UserDashboard/transactions",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: false,
  },
];

export const adminnavlinks = [
  {
    name: "allcampaigns",
    imgUrl: createCampaign,
    link: "/AdminDashboard/admin-allcampaign",
  },
  {
    name: "allusers",
    imgUrl: UsersIcon,
    link: "/AdminDashboard/all-users",
  },
  {
    name: "approvecampaign",
    imgUrl: approve,
    link: "/AdminDashboard/approve-campaigns",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/AdminDashboard/admin-profile",
  },
  {
    name: "featuredcampaigns",
    imgUrl: Featured,
    link: "/AdminDashboard/featured-campaigns",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: false,
  },
];

export const dummyData = [
  {
    title: "Campaign1",
    description: "Description1",
    startdate: "10-10-2022",
    enddate: "10-10-2023",
    campaignGoal: 1,
    walletAdress: "0x64AEc3c1FC908Bc1F8b7162B7E379dD01b933667",
    campaignOwner: "Ansab",
  },
  {
    title: "Campaign2",
    description: "Description2",
    startdate: "10-10-2022",
    enddate: "10-10-2023",
    campaignGoal: 2,
    walletAdress: "0x64AEc3c1FC908Bc1F8b7162B7E379dD01b933667",
    campaignOwner: "Zain",
  },
  {
    title: "Campaign3",
    description: "Description3",
    startdate: "10-10-2022",
    enddate: "10-10-2023",
    campaignGoal: 3,
    walletAdress: "0x64AEc3c1FC908Bc1F8b7162B7E379dD01b933667",
    campaignOwner: "Saad",
  },
  {
    title: "Campaign4",
    description: "Description4",
    startdate: "10-10-2022",
    enddate: "10-10-2023",
    campaignGoal: 4,
    walletAdress: "0x64AEc3c1FC908Bc1F8b7162B7E379dD01b933667",
    campaignOwner: "Umair",
  },
  {
    title: "Campaign5",
    description: "Description5",
    startdate: "10-10-2022",
    enddate: "10-10-2023",
    campaignGoal: 5,
    walletAdress: "0x64AEc3c1FC908Bc1F8b7162B7E379dD01b933667",
    campaignOwner: "Talha",
  },
];

export const categories = [
  "",
  "Technical",
  "Art",
  "Medical",
  "Music",
  "Illustration",
  "Social",
];

export const categoryArray = [
  {
    name: "Medical",
    image: Medical,
  },
  {
    name: "Art",
    image: Art,
  },
  {
    name: "Technical",
    image: Technical,
  },
  {
    name: "Illustration",
    image: Illustration,
  },
  {
    name: "Social",
    image: Social,
  },
  {
    name: "Music",
    image: Music,
  },
];

export const dummyNotifications = [
  {
    user: "6389e703be9a5f9e95230269",
    message: "User created a new campaign: Illustration 1",
    status: "unread",
  },
  {
    user: "6389e703be9a5f9e95230269",
    message: "User  created a new campaign: Illustration 2",
    status: "read",
  },
  {
    user: "6389e703be9a5f9e95230269",
    message: "User created a new campaign: Illustration 3",
    status: "unread",
  },
];

export const dummyTransactions = [
  {
    from: "abc1",
    to: "def1",
    amount: "0.01",
  },
  {
    from: "abc2",
    to: "def2",
    amount: "0.02",
  },
  {
    from: "abc3",
    to: "def3",
    amount: "0.03",
  },
];

export const dummyUsers = [
  {
    name: "M. Saad",
    email: "saad@test.com",
    role: "user",
  },
  {
    name: "M. Zain",
    email: "zain@test.com",
    role: "user",
  },
  {
    name: "M. Talha",
    email: "talha@test.com",
    role: "admin",
  },
  {
    name: "Ansab",
    email: "ansab@test.com",
    role: "user",
  },
];
