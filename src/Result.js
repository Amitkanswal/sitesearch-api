import React,{useState} from 'react'

 function Result(props) {
    //  const[renderData ,setRenderData] =useState(props.currentData)

     function renderElements(items,index) {
        return  props.customeResult?props.customeResult(items,index):
            <div key={index} className="display-searched-result">
              <h2>{items.title}</h2>
              <p
                style={{
                  width: "600px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {items.blog_content}
              </p>
              <a href={items.url}>Read more...</a>
              <br />
            
            </div>
          
      }
    

    return (
        <div className="result-display-search">
            {props.currentData.map(renderElements)}
        </div>
    )
}
export default Result