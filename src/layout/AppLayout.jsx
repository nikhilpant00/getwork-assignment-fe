import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../pages/Page1";

function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Page />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
