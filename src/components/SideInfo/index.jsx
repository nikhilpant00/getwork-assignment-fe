import React from "react";

import "./index.scss";

import workImg from "../../assets/work.jpg";
import Qrcode from "../../assets/qr.jpg";

function SideInfo() {
  return (
    <div className="side-info">
      <div className="container-10">
        <span className="question-title">New To GetWork?</span>
        <button className="upload-button">
          <div>
            <span className="title">Upload Resume</span>
            <span className="sub-title">Connect with hiring experts</span>
          </div>
        </button>
      </div>

      <div className="container-12">
        <div className="contents">
          <span>Related Search</span>
          <p>Software Engineering Jobs In Bangalore</p>
          <p>Software Engineering Jobs In Jaipur</p>
          <p>Software Engineering Jobs In Rudrapur</p>
        </div>
      </div>
      <div className="container-11">
        <span className="title">Launch your career</span>
        <p>
          with GetWork OneApp Search, find, apply and track for the latest job
          on the go!
        </p>
        <img
          src={workImg}
          alt="office img"
          style={{ width: "100%", height: "10rem" }}
        />
        <input
          type="text"
          placeholder="Email ID or Phone Number"
          className="input-field"
        />

        <button className="share-button">
          <span>Share App Link</span>
        </button>

        <div className="qr-code">
          <p className="description">
            Scan QR
            <br />
            Available on both ios and andriod
          </p>
          <img src={Qrcode} alt="QR Code" />
        </div>
      </div>
    </div>
  );
}

export default SideInfo;
