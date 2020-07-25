import {
    useEffect,useState
} from "react"
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        getAll().then(data=>setResources(data));
    }, [])

    const getAll =() => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const createServer = async newObject => {
        const response = await axios.post(baseUrl, newObject)
        return response.data
    }

    // ...

    const create = async(resource) => {
       let returned=await createServer(resource);
       setResources(resources.concat(returned))
    }

    const service = {
        create,getAll
    }

    return [
        resources,service
    ]
}