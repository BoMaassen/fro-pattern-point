import './InputText.css';

function InputText({className, inputId, name, labelName, validationRules, type, checked, value, placeholder, register, errors, children}) {
    return (<>
        <label htmlFor={inputId}>
            {children}
            {labelName}
            <input
                className={className}
                id={inputId}
                {...register(name, validationRules)}
                type={type}
                defaultChecked={checked}
                placeholder={placeholder}
                value={value}
            />
            {errors[inputId] && <p className="error-message">{errors[inputId].message}</p>}
        </label>
    </>)
}

export default InputText;