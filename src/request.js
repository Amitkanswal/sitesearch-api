import axios from "axios";
import dotenv from "dotenv"
dotenv.config({path:"../config.env"})

async function requestAdapter( path, seachText) {
    
    const url=`/${path}`
    let config = {
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        engine_key: `${process.env.REACT_APP_SEARCH_ENGINE_KEY}`,
        q: seachText,
      },
    }
  
  return await axios(config)
}
export default requestAdapter;
