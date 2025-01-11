function Textarea({textareaId, labelName, validationRules, register, errors}){
    return(
        <>
            <label htmlFor={textareaId}>{labelName}</label>
            <textarea
                id={textareaId}
                {...register(textareaId,validationRules)}
            ></textarea>
            {errors[textareaId] && <p>{errors[textareaId].message}</p>}
        </>
    )
}

export default Textarea;