const Button = (props) => {
    return (  <button className={props.className} onClick={()=>props.clearBoard()}>{props.children}</button>);
}
 
export default Button;