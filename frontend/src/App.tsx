import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Account";
import SignUp from "./Pages/SignUp";
import AccountSelection from "./Pages/AccountSelection";
import EnterCredentials from "./Pages/EnterCredentials";
import Dashboard from "./Pages/Dashboard";
import ServicesPage from "./Pages/ServicesPage";
import Team from "./Pages/Team";
import GalleryPage from "./Pages/GalleryPage";
import Pending from "./Pages/Pending";
import Completed from "./Pages/Completed";
import { GeneralSettingsPage } from "./Pages/GeneralSettingsPage";
import Kyc from "./Pages/Kyc";

import TeamMemberForm from "./Pages/TeammemberFrom";
import Invoice from "./Pages/Invoice";
import Dashboard2 from "./Pages/Dashboard2"
import Orders from "./Pages/Orders";
import Inbox from "./Pages/Inbox"; 
import Pricing from "./Pages/Pricing";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/accountselection" element={<AccountSelection/>}/>
        <Route path="/entercredentials" element={<EnterCredentials />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
        <Route path="/team" element={<Team/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/settings" element={<GeneralSettingsPage/>}/>
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/addteam" element={<TeamMemberForm/>}/>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/invoice" element={<Invoice/>}/>
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/dashboarddetail" element={<Dashboard2/>}/>
        <Route path="/kyc" element={<Kyc/>}/>
        <Route path="/pending" element={<Pending/>}/>
        <Route path="/completed" element={<Completed/>}/>
      </Routes>
    </BrowserRouter>
  );
}
