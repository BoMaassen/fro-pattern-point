function Select({selectId, labelName, validationRules, options, register, errors}) {
    return (<>
        <label htmlFor={selectId}>{labelName}</label>
        <select
            id={selectId}
            {...register(selectId, validationRules)}
        >
            {options.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}

        </select>
        {errors[selectId] && <p>{errors[selectId].message}</p>}
    </>)
}

export default Select;