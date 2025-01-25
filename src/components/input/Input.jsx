import './Input.css';

function Input({className, inputId, name, labelName, validationRules, multiple, onChange, type, accept, value, checked, register, errors, children}){
    return(
        <>

            <label htmlFor={inputId}>
                {children}
                {labelName}
            <input
                className={className}
                id={inputId}
                {...register(name, validationRules)}
                type={type}
                accept={accept}
                multiple={multiple}
                onChange={onChange}
                value={value}
                checked={checked}
            />
            {errors[inputId] && <p className="error-message">{errors[inputId].message}</p>}
            </label>
        </>
    )
}
export default Input;