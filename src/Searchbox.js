import React, { useState,useEffect } from "react";
import request from "./request";
import "./css/search.css";

const Searchbox = () => {
  const [getRes, setRes] = useState([]);
  useEffect(() => {
      if (getRes.length !== 0) {
        document.getElementsByClassName("result-container")[0].style.display =
          "block"
      } else {
        document.getElementsByClassName("result-container")[0].style.display =
          "none"
      }
    }, [getRes])

  async function autoComplete(evt) {
    console.log("changing");

    request("suggest.json", evt.target.value).then(res => {
      setRes(res.data.records.page);
    });
  }
  function getResult(e) {
    e.preventDefault();
    console.log("clicked");
    request("search.json", e.target.value);
    setRes(0);
  }

  return (
    <div className="search-container-div">
      <form onSubmit={getResult}>
        <input
          type="search"
          className="search-input-filed"
          autoComplete="off"
          onChange={autoComplete}
        />
        <button onClick={getResult}>
          <span role="img" aria-label="search-icon">
            🕵{" "}
          </span>
        </button>
      </form>
      <div className="result-container" style={{ display: "none" }}>
        <div className="inner-list">
          <ul>
            {getRes.map((el, i) => {
              return (
                <li key={i} className="result-list">
                  {
                    <a
                      className="result-list-link"
                      href={
                        window.location.href.includes("localhost")
                          ? `${window.location.href.split("8000/")[0]}8000/${
                              el.url.split(".com/")[1]
                            }`
                          : el.url
                      }
                    >
                      {el.sections.toString()}
                    </a>
                  }
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Searchbox;
