import "./Button.css"

function Button({type, onClick, text, img, alt, classname}){
    return(
        <button type={type} onClick={onClick} className={classname}>
            <img src={img} alt={alt}/>
            {text}
        </button>
    )
}

export default Button;