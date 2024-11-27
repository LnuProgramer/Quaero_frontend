import React from 'react';
import "./Button.scss"

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    fontWeight?: number;
    buttonText: any;
    buttonColor?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
}
function Button({fontSize, fontWeight, buttonText, buttonColor, className, type, ...rest}: ButtonProps) {
    const letterSpacing = fontSize / 10;
    const combinedClassName = `main-button ${buttonColor || ''} ${className}`.trim();
    return (
        <button  className={combinedClassName}
                 type={type || "button"}
        style={{fontSize: `${fontSize}px`, fontWeight: fontWeight, letterSpacing: `${letterSpacing}px`}}
        {...rest}
        >{buttonText}</button>)
}

export default Button;