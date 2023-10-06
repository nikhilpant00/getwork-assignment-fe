import React from "react";

import "./index.scss";

import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  return (
    <header className="header-1">
      <div className="main-div">
        <div className="container">
          <div className="logo">
            <h3>GETWORK</h3>
          </div>
          <div
            style={{
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
            className="links"
          >
            <p className="link">Overview</p>
            <p className="link">Jobs</p>
            <p className="link">Internships</p>
            <p className="link">Resume Maker</p>
            <p className="link">Resources</p>

            <button
              className="btn"
              type="button"
              style={{
                borderRadius: "8px",
                backgroundColor: "rgb(255, 255, 255)",
                height: "36px",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginLeft: "10px",
              }}
            >
              <span>
                <p style={{ fontSize: "14px", fontWeight: "600" }}>
                  LogIn/SignUp
                </p>
              </span>
            </button>
          </div>
          <div className="burger">
            <RxHamburgerMenu size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
