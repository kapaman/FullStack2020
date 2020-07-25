import axios from "axios";
const baseURL="http://localhost:3001/persons/"
//const baseURL = "https://blooming-ravine-62139.herokuapp.com/api/persons/";


 const getPerson=(id)=>{
     const request = axios.get(baseURL+id);
     return request.then(response=>response.data);
 }
const addPerson=(newPersons)=>{
          const request =axios.post(baseURL,newPersons)
          return request.then(response => {return response.data})
}

const deletePerson=(id)=>{
  const request=  axios.delete(baseURL+id);
    return request.then(response=>response.data);
}

const getAll=()=>{
   const request=  axios.get(baseURL)
    return request.then((data)=> data.data);
}
const updatePerson=(newnote)=>{
    const request = axios.put(baseURL+newnote.id,newnote);
    return request.then(data=>{return data.data});
}
export default {addPerson,deletePerson,getAll,updatePerson,getPerson}