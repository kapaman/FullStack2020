import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login=async (data) => {
  const response = await axios.post(baseUrl,{ username:data.username,password:data.password })
  return response.data

}
export default { login }