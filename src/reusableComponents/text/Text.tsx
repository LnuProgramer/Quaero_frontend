import React, { ReactNode } from 'react';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    as?: React.ElementType;
    children: ReactNode;
    href?: string;
}

function Text({ fontSize, as: Component = 'p', children, href, ...rest }: TextProps) {
    const letterSpacing = fontSize / 10;

    if (Component === 'a' && href) {
        return (
            <a {...rest} href={href} style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}>
                {children}
            </a>
        );
    }

    return (
        <Component {...rest} style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}>
            {children}
        </Component>
    );
}

export default Text;
