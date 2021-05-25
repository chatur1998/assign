import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

const NewsCard = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "20",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100vw",
        }}
      >
        <div style={{ width: "25%" }}>
          <h3>{props.title}</h3>
        </div>
        <div style={{ width: "40%" }}>
          <h3>
            <a href={props.url}>{props.url}</a>
          </h3>
        </div>
        <div style={{ width: "25%" }}>
          <h3>{props.date}</h3>
        </div>
        <div style={{ width: "10%" }}>
          <h3>{props.author}</h3>
        </div>
      </div>
    </>
  );
};

function App() {
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [data, setData] = useState([]);

  const URL = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`;

  const handleFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((body) => {
        setData([...data, ...body.hits]);
        setPageCount(body.nbPages);
        setisLoaded(true);
      })

      .catch((error) => console.error("Error", error));

    if (currentPage < pageCount) {
      setcurrentPage(currentPage + 1);
    } else {
      setcurrentPage(0);
    }
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
  };

  useInterval(() => {
    handleFetch();
  }, 1000 * 10);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <div>
          

          {data.map((item) => {
            return (
              <div style={{cursor: 'pointer'}} onClick={window.open(URL, "_blank")}>
              <NewsCard
                url={item.url}
                title={item.title}
                author={item.author}
                key={item.objectID}
                date={item.created_at}
              />
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
