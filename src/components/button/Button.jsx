import closeIcon from "../../assets/icons/close icon.svg";

function Button({type, onClick, text, img, alt}){
    return(
        <button type={type} onClick={onClick}>
            <img src={img} alt={alt}/>
            {text}
        </button>
    )
}

export default Button;