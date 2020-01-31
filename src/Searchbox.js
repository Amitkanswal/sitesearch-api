import React, { useState, useEffect } from "react"
import request from "../../request/requestAdapter"
import "../../scss/search.scss"

const Searchbox = props => {
  const [getRes, setRes] = useState([])
  // const [page , setPage] = useState(1)
  useEffect(() => {
    if (getRes.length !== 0) {
      document.getElementsByClassName(
        "autoSuggest-container"
      )[0].style.display = "block"
    } else {
      document.getElementsByClassName(
        "autoSuggest-container"
      )[0].style.display = "none"
    }
  }, [getRes])

  async function autoComplete(evt) {
    console.log("changing")
    if (
      props.config.autoComplete !== undefined &&
      props.config.autoComplete === true
    ) {
      request("suggest.json", evt.target.value, props.config.engine_key,1).then(
        res => {
          setRes(res.data.records.page)
        }
      )
    } else if (props.config.autoComplete === false && getRes !== []) {
      setRes([])
    }
  }
  function sanitizeObj(b_c,iu,i,t,ul) {
const obj={
    blog_content:b_c,
    blog_images:{
      url:iu,
    },
    uid:i,
    title:t,
    url:ul
  }
  return obj;
}


  function getResult(e) {
    e.preventDefault()
    console.log("clicked")
    setRes([])
    request("search.json", e.target.value, props.config.engine_key,1).then((res)=>{
    let data=res.data.records.page.map((el,i)=>{
      return sanitizeObj(el.body,el.image,el.id,el.sections[1],el.url)
    })
    console.log(data)
    props.returningData(data)
    
    })
  }

  function createComponent(el, i) {
    // console.log("inside createComponent", el)

    return (
      <li key={i} className="autoSuggest-container-li">
        <a
          className="autoSuggest-container-link"
          href={
            window.location.origin.includes("localhost")
              ? `${window.location.origin}${el.url.split(".com/")[1]}`
              : el.url
          }
        > 
          <span dangerouslySetInnerHTML={{ __html: el.highlight.sections }} />
        </a>
        {props.custome.hasOwnProperty("customeAutosuggestComponent") &&
        el.image !== "" ? (
          <img
            src={`${el.image}&width=40&height=40`}
            // style={{ borderRadius: "50%" }}
            className="autoSuggest-container-img"
          />
        ) : null}
      </li>
    )
  }

  return (
    <div className="search-container-div">
      {console.log("search...")}

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
      <div className="autoSuggest-container" style={{ display: "none" }}>
        <div
          className={
            props.custome.classAutosuggest !== undefined
              ? props.custome.classAutosuggest
              : "inner-list"
          }
        >
          {getRes !== [] ? <ul>{getRes.map(createComponent)}</ul> : null}
        </div>
      </div>
    </div>
  )
}

export default Searchbox
