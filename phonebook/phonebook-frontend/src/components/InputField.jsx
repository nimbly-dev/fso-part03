/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const InputField = ({handleOnChange, label, value}) =>{
    return(
        <>
            <label htmlFor={label}>{label}</label>
            <input id={label} value={value} onChange={handleOnChange} required/>
        </>
    )
}

export default InputField