import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async obj => {
    const response = await axios.post(baseUrl, obj)

    return response.data
}

const update = async object => {
    object = {...object, votes: object.votes + 1}
    const response = await axios.put(`${baseUrl}/${object.id}`, object)

    return response.data
}

export default { getAll, createNew, update }