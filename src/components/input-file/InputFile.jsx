import './InputFile.css';

function InputFile({className, inputId, name, labelName, validationRules, multiple, onChange, type, accept, register, errors, children}){
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
                />
                {errors[inputId] && <p className="error-message">{errors[inputId].message}</p>}
            </label>
        </>
    )
}
export default InputFile;