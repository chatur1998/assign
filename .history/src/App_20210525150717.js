import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  function fetchData(number) {
    axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${number}`)
      .then((res) => console.log(res));  
  }

  useEffect(() => {
    fetchData(0);
  }, [])

  return <div>App</div>;
};

export default App;
