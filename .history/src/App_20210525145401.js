import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  function fetchData(number) {
    axios
      .get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
      .then((res) => console.log(res));

    setTimeout(fetchData(number+1), 10000);  
  }

  useEffect(() => {
    fetchData(0);
  }, [])

  return <div>App</div>;
};

export default App;
