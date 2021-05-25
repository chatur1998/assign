// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const App = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);

//   const useInterval = (callback, delay) => {

//     const savedCallback = useRef();

//     useEffect(() => {
//       savedCallback.current = callback;
//     }, [callback]);

//     useEffect(() => {
//       function tick() {
//         savedCallback.current();
//       }
//       if (delay !== null) {
//         const id = setInterval(tick, delay);
//         return () => clearInterval(id);
//       }
//     }, [delay]);
//   }

//   useInterval(() => {
//     fetchData()
//   }, 1000 * 10);

//   function fetchData() {
//     axios
//       .get(
//         `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
//       )
//       .then((res) => console.log(res.data));

//       if(page < 49) {
//         setPage(page + 1);
//       } else {
//         setPage(0);
//       }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return <div>App</div>;
// };

// export default App;

import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";

const NewsCard = (props) => {
  return (
    <div style={{ padding: "20" }}>
      <a href={props.url}>
        {props.title} by {props.author}
      </a>
    </div>
  );
};

function App() {
  const [hits, setHits] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [data, setData] = useState([]);

  const URL = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`;

  const handleFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((body) => {
        setData([...body.hits]);
        setPageCount(body.nbPages);
        setisLoaded(true);
      })
      .catch((error) => console.error("Error", error));
  };

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
    handleFetch()
  }, 1000 * 10);


  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    handleFetch();
  };

  return (
    <div>
      {/* <label>Search</label>
        <input type="text" onChange={(event) => setQuery(event.target.value)} />
        <button onClick={handleFetch}>Get Data</button> */}

      {isLoaded ? (
        hits.map((item) => {
          return (
            <NewsCard
              url={item.url}
              title={item.title}
              author={item.author}
              key={item.objectID}
            />
          );
        })
      ) : (
        <div></div>
      )}

      {isLoaded ? (
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"container"}
          previousLinkClassName={"page"}
          breakClassName={"page"}
          nextLinkClassName={"page"}
          pageClassName={"page"}
          disabledClassNae={"disabled"}
          activeClassName={"active"}
        />
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}

export default App;
