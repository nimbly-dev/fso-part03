/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { filterPersonsByName } from '../../utility/PhonebookUtil'
import phonebookService from '../../services/PhonebookService'

const PersonList = ({searchQuery, persons, handleDelete}) =>{

    return(
        <>
            <ul>
                {
                searchQuery === '' ? persons.map(person=>{
                    return(
                    <li key={person.id}>
                        {person.name} : {person.number} 
                        <button type='button' onClick={()=>handleDelete(person.id, person.name)}>Delete</button>
                    </li>
                    )
                }) : filterPersonsByName(persons,searchQuery).map(person=>{
                    return(
                    <li key={person.id}>
                        {person.name} : {person.number} <button type='button'>Delete</button>
                    </li>
                    )
                })
                }
            </ul>
        </>
    )
}

export default PersonList