import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  function fetchData() {
    axios
      .get(https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`)
      .then((res) => console.log(res));

    setTimeout(fetchData(), 10000);  
  }

  useEffect(() => {
    fetchData(0);
  }, [])

  return <div>App</div>;
};

export default App;
