import "./Select.css";

function Select({className, selectId, labelName, validationRules, options, register, errors}) {
    return (<>
        <label htmlFor={selectId}>{labelName}
        <select
            className={className}
            id={selectId}
            {...register(selectId, validationRules)}
        >
            {options.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}

        </select>
        {errors[selectId] && <p className="error-message">{errors[selectId].message}</p>}
        </label>
    </>)
}

export default Select;