function Input({inputId, labelName, validationRules, multiple, onChange, type, accept, register, errors}){
    return(
        <>
            <label htmlFor={inputId}>{labelName}</label>
            <input
                id={inputId}
                {...register(inputId, validationRules)}
                type={type}
                accept={accept}
                multiple={multiple}
                onChange={onChange}
            />
            {errors[inputId] && <p>{errors[inputId].message}</p>}
        </>
    )
}
export default Input;