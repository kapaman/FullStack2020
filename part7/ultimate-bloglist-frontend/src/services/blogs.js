import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null
const setToken =(newToken) => {
  token =`bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create =async (data) => {
  const config = {
    headers: { authorization: token },
  }

  const request =await axios.post(baseUrl,data,config)
  return  request.data
}

const incLike=async(data) => {

  const req = await axios.put(baseUrl+data.id,data)
  return req.data
}

const removeBlog=async(id ) => {
  const config={
    headers:{ authorization:token }
  }
  const req = await axios.delete(baseUrl+id,config)
  return req.data
}

export default { getAll,create,setToken,incLike,removeBlog }