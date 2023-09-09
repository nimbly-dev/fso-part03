/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const PersonSearchField = ({searchQuery, handleSearchQueryChange}) =>{
    return(
        <>
            Filter name by: <input value={searchQuery} onChange={handleSearchQueryChange}/>
        </>
    )
}

export default PersonSearchField