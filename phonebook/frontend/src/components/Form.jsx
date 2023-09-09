/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


const Form = ({onSubmit,children}) =>{

    return(
        <>
            <form onSubmit={onSubmit} name="phoneBookForm">
                    {
                        /*ALTERNATE MAP IMPL WITH INPUTFIELDS OBJ ARRAY*/

                        // inputFields.map(inputField=>{
                        //     return(
                        //         <div key={inputField.label}>
                        //             {/* <InputField handleOnChange={inputField.onChange} label={inputField.label} value={inputField.value}/> */}
                        //             {inputField.label}: <input onChange={inputField.onChange} value={inputField.value} />
                        //         </div>
                        //     )
                        // })
                        children
                    }
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default Form