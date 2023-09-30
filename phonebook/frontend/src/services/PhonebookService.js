/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
import axios from 'axios'
const baseUrl = '/api/contacts'
import { isNameAlreadyExists, isNumberAlreadyExists } from '../utility/PhonebookUtil'

const getPersons = ()=>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const savePerson = (newObject) => {
    return axios.post(baseUrl, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log('Error saving person:', error);
            throw error; 
        });
};

const deletePerson = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newObj)=>{
    console.log(id);
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}



export default {savePerson, getPersons, deletePerson, updatePerson}