import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Settings from "../components/Settings";
import { useState } from "react";

function SettingsPage() {

  const [search, setSearch] = useState("");

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Header
          search={search}
          onSearchChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="container">

          <Settings />

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;