import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const useInterval = (callback, delay) => {

    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    fetchData()
  }, 1000 * 10);

  function fetchData() {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      )
      .then((res) => setData(res.data));

      if(page < 49) {
        setPage(page + 1);
      } else {
        setPage(0);
      }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{data}</div>;
};

export default App;