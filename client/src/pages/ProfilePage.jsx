import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Profile from "../components/Profile";
import { useState } from "react";

function ProfilePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        <div className="container">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;