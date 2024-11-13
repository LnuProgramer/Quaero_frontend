import React from 'react';
import "./Button.scss"

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    fontWeight?: number;
    buttonText: string;
    buttonColor?: string;
    className?: string;
}
function Button({fontSize, fontWeight, buttonText, buttonColor, className, ...rest}: ButtonProps) {
    const letterSpacing = fontSize / 10;
    const combinedClassName = `main-button ${buttonColor || ''} ${className}`.trim();
    return (
        <button  className={combinedClassName}
        style={{fontSize: `${fontSize}px`, fontWeight: fontWeight, letterSpacing: `${letterSpacing}px`}}
        {...rest}
        >{buttonText}</button>)
}

export default Button;