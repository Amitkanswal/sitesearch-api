import React,{useState}   from 'react';
import SearchBox from "./Searchbox"
import Result from "./Result"
import './App.css';

function Launcher() {
  
  const [getResponse, setResponse] = useState([])//
  function searchCallBack(result,pgCount) {
    setResponse([...result])
 // setPage(pgCount);
}
const config = {
  engine_key: `${process.env.SEARCH_ENGINE_KEY}`,
  autoComplete: true, // Note: removing this option will remove autosuggestion feature
}



function customizingResult(items,id) {  // example for template 
  return <div className="searched-field" key={id}>
          <h2>{items.title}</h2>
          <div><a href={items.url}>{items.url}</a></div>
          <p>{items.blog_content}</p>
          </div>
}

  return (
    <div className="Launch">
      {console.log(process.env)}
      
      
      <SearchBox
          config={config}
          custome={{
            classInput: "search-box-input",
            classAutosuggest: "autoSuggest-result-area",
            customeAutosuggestComponent: { image: true }, // can add image or remove them by adding or removing this property
          }}
          returningData={searchCallBack}
        />
         <Result 
        currentData={getResponse} // data which is currently on dom
        customeResult={customizingResult} // Note :-can add any new temp n apply style to them, There is an ready made example above or create your own function
        />

    </div>
  );
}

export default Launcher;
