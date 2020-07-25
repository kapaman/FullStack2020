import axios from 'axios';
const baseUrl = "http://localhost:3001/anecdotes/"
const getAll = async () => {
    let request = await axios.get(baseUrl);
    return request.data;
}

const addAnecdote = async (anecdote) => {
    let anec = {
        content: anecdote,
        votes: 0
    }
    let request = await axios.post(baseUrl, anec);
    return request.data;
}

const voteAnecdote = async (anecdote) => {
    let anec = {
        content: anecdote.content,
        votes: anecdote.votes+1,
        id:anecdote.id
    }
    let request = await axios.put(baseUrl+anecdote.id, anec);
    return request.data;
}

export default {
    addAnecdote,
    getAll,
    voteAnecdote
};