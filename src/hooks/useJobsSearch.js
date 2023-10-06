import { useEffect, useState } from "react";

const API_URL = "http://niyuktitest.getwork.org/job/student/job";

export default function useJobsSearch(pageNumber, checkedFilters) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setJobs([]);
  }, [checkedFilters]);

  useEffect(() => {
    async function httpGetJobs(pageNumber, checkedFilters) {
      try {
        const filterIdMap = {};

        checkedFilters.forEach((item) => {
          if (!filterIdMap[item.name]) {
            filterIdMap[item.name] = [];
          }
          filterIdMap[item.name].push(item.id);
        });

        const filter = Object.entries(filterIdMap)
          .map(([name, ids]) => `&&${name}=${ids.join(",")}`)
          .join("");

        const API =
          checkedFilters.length > 0
            ? `${API_URL}/get/?page=${pageNumber}${filter}`
            : `${API_URL}/get/?page=${pageNumber}`;
        console.log(API);
        // const API = `${API_URL}/get/?page=${pageNumber}`;
        const response = await fetch(API);
        const body = await response.json();
        setJobs((prevJobs) => [...prevJobs, ...body.data.results]);
        setHasMore(body.data.results.length > 0);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setHasMore(false);
        setLoading(false);
      }
    }

    setLoading(true);
    httpGetJobs(pageNumber, checkedFilters);
  }, [checkedFilters, pageNumber]);

  return { loading, jobs, hasMore };
}
