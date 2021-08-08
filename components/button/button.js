import ButtonStyle from "./style";

const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--secondary--solid",
  "btn--secondary-outline"
];

const COLORS = ["btn--primary", "btn--secondary"];

const Button = ({
  children,
  icon = false,
  type,
  onClick,
  buttonStyle,
  buttonColor,
  ...rest
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0];
  return (
    <ButtonStyle
      className={`${checkButtonStyle} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {!!icon && <span className={`icon-${icon}`}></span>}
      {children}
    </ButtonStyle>
  );
};
export default Button;
