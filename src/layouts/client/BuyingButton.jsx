import { Link } from "react-router-dom";

const BuyingButton = ({ children, component = 'button', ...rest }) => {
  const Component = component;

  const handleClick = () => {
    // window.location.pathname = '../payment';
    console.log('Click buying button');
  }
  return (
    <Component className="acceptin-button" {...rest}>{children}</Component>
  )
}

export default BuyingButton