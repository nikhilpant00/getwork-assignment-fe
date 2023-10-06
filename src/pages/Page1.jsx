import React, { useState, useRef, useCallback } from "react";

import "./index.scss";

import { FiFilter } from "react-icons/fi";
import DropDown from "../components/DropDown";

import SearchInput from "../components/SearchInput";
import Card from "../components/Card";

import useFilters from "../hooks/useFilter";
import useJobsSearch from "../hooks/useJobsSearch";
import SideInfo from "../components/SideInfo";

function Page() {
  const filters = useFilters();

  const [isFilterCollapse, setIsFilterCollapse] = useState(true);

  const [checkedFilters, setCheckedFilters] = useState([]);
  const handleCheckboxChange = (id, name) => {
    console.log(checkedFilters);
    setIsFilterCollapse(true);
    setPageNumber(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const isChecked = checkedFilters.some((item) => item.id === id);

    if (isChecked) {
      setCheckedFilters((prevItems) => {
        return prevItems.filter((item) => item.id !== id);
      });
    } else {
      setCheckedFilters((prevItems) => [...prevItems, { id, name }]);
    }
  };

  const [pageNumber, setPageNumber] = useState(1);
  const { jobs, hasMore, loading } = useJobsSearch(pageNumber, checkedFilters);

  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <div className="container">
        <div className={`item-1 ${isFilterCollapse ? "" : "open"}`}>
          <div className="filter-area">
            <div>
              <div className="filter-by">
                <div className="icon">
                  <FiFilter />
                  <p style={{ marginLeft: "20px", fontSize: "14px" }}>
                    {" "}
                    Filter By
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {checkedFilters.length > 0 && (
                    <div
                      style={{
                        cursor: "pointer",
                        color: "rgb(33 209 0)",
                        fontWeight: "500",
                      }}
                      onClick={() => {
                        setCheckedFilters([]);
                        setIsFilterCollapse(true);
                      }}
                    >
                      Clear
                    </div>
                  )}
                  {!isFilterCollapse && (
                    <div
                      style={{
                        color: "black",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginLeft: "15px",
                      }}
                      onClick={() => setIsFilterCollapse(true)}
                    >
                      X
                    </div>
                  )}
                </div>
              </div>
              <hr />
              {filters && filters.length > 0 && (
                <>
                  {filters.map((filter) => {
                    var open = false;
                    if (
                      filter.param_name == "ctc" ||
                      filter.param_name == "work_exp_id" ||
                      filter.param_name == "job_category" ||
                      filter.param_name == "wfh" ||
                      filter.param_name == "job_type_id"
                    )
                      open = true;
                    else open = false;

                    return (
                      <>
                        <DropDown
                          key={filter.param_name}
                          data={filter}
                          isOpen={open}
                          checkedFilters={checkedFilters}
                          onCheckboxChange={handleCheckboxChange}
                        />
                        {!open && filter.param_name != "sort_by" && (
                          <SearchInput
                            data={filter}
                            checkedFilters={checkedFilters}
                            onCheckboxChange={handleCheckboxChange}
                          />
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={`item-2 ${isFilterCollapse ? "" : "open"}`}>
          {jobs?.map((job, index) => {
            const key = job?.company?.company_id;
            const jobTitle = job?.job_title;
            const name = job?.company?.company_name;
            const jobType = job?.job_type_name;
            const ctc = job?.ctc_value;
            const experience = job?.eligibility_criteria?.experience;
            const location = job?.company?.company_location;
            const time = job?.time_ago;
            if (jobs.length === index + 1) {
              return (
                <div ref={lastJobElementRef} key={key}>
                  <Card
                    jobTitle={jobTitle}
                    name={name}
                    jobType={jobType}
                    ctc={ctc}
                    experience={experience}
                    location={location}
                    time={time}
                  />
                </div>
              );
            } else {
              return (
                <Card
                  key={key}
                  jobTitle={jobTitle}
                  name={name}
                  jobType={jobType}
                  ctc={ctc}
                  experience={experience}
                  location={location}
                  time={time}
                />
              );
            }
          })}
          <div>{loading && "Loading..."}</div>
          <div>
            {jobs.length == 0 && !loading && "No result with these Filters"}
          </div>
        </div>
        <div className="item-3">
          <SideInfo />
        </div>
        {isFilterCollapse && (
          <div
            className="filter-btn"
            style={{
              backgroundColor: "rgb(0, 0, 0)",
              borderRadius: "30px",
              width: "50px",
              height: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              right: "30px",
              bottom: "30px",
              zIndex: "1000",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsFilterCollapse(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <span style={{ right: "-19px", top: "-5px" }}></span>
            <svg
              className="svg"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="TuneRoundedIcon"
              style={{ width: "13px", background: "white" }}
            >
              <path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"></path>
            </svg>
            <span
              style={{
                fontSize: "10px",
                color: "rgb(255, 255, 255)",
              }}
            >
              Filter
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
