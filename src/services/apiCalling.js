import axios from 'axios'



const fetchData = async (url)=>{
    const resp = await axios(url)
    return resp.data.message
    
  }

export default fetchData