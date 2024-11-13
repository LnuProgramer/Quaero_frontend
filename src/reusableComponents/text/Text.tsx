import React, { ReactNode } from 'react';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    as?: React.ElementType;
    children: ReactNode;
}

function Text({ fontSize, as: Component = 'p', children, ...rest }: TextProps) {
    const letterSpacing = fontSize / 10;

    return (
        <Component {...rest} style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}>
            {children}
        </Component>
    );
}

export default Text;
