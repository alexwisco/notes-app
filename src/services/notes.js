import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'



// called on page start up to get everyone in the db
const getAll = () => {
  //return axios.get(baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
    //promise returned by axios no longer returned directly. Promise is 
    // taken to the request variable, and the 'then' function is called for it.
    // getAll() now returns a promise, because the 'then' of the 'promise' returns a promise

  })
}

// adding a new person to the phonebook.
const create = newObject => {
  //return axios.post(baseUrl)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const noteDelete = (id) => { // delete a note given the notes id value (change?)
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, noteDelete }

  // or 

  /* 
getAll: getAll, 
  create: create, 
  update: update 
  */
 // Since the name of the fields of the object are 
 // the same as the names of the vars defining their value, can short form it
