import React from 'react';
import "./Button.scss"

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    fontWeight?: number;
    buttonText: any;
    buttonColor?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}
function Button({fontSize, fontWeight, buttonText, buttonColor, className, type, disabled, ...rest}: Readonly<ButtonProps>) {
    const letterSpacing = fontSize / 10;
    const combinedClassName = `main-button ${buttonColor ?? ''} ${className}`.trim();
    return (
        <button  className={combinedClassName}
                 type={type ?? "button"}
        style={{fontSize: `${fontSize}px`, fontWeight: fontWeight, letterSpacing: `${letterSpacing}px`}}
                disabled={disabled}
        {...rest}
        >{buttonText}</button>)
}

export default Button;