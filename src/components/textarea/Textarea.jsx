function Textarea({className, textareaId, labelName, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={textareaId}>{labelName}
                <textarea rows="9"
                          className={className}
                          id={textareaId}
                          {...register(textareaId, validationRules)}
                ></textarea>
                {errors[textareaId] && <p className="error-message">{errors[textareaId].message}</p>}
            </label>
        </>
    )
}

export default Textarea;