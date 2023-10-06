import { useCallback, useEffect, useState } from "react";

const API_URL = "http://niyuktitest.getwork.org/job/student/job";

async function httpGetFilters() {
  const response = await fetch(`${API_URL}/filter/`);
  const body = await response.json();
  return body;
}

export default function useFilters() {
  const [filters, saveFilters] = useState([]);

  const getFilters = useCallback(async () => {
    const fetchedPlanets = await httpGetFilters();
    saveFilters(Object.values(fetchedPlanets?.data));
  }, []);

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  return filters;
}
