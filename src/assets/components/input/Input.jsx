function Input({inputId, labelName, validationRules, type, accept, register, errors}){
    return(
        <>
            <label htmlFor={inputId}>{labelName}</label>
            <input
                id={inputId}
                {...register(inputId, validationRules)}
                type={type}
                accept={accept}
            />
            {errors[inputId] && <p>{errors[inputId].message}</p>}
        </>
    )
}
export default Input;