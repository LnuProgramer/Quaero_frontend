import React, { ReactNode } from 'react';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    fontSize: number;
    as?: React.ElementType;
    children: ReactNode;
    href?: string; // Для посилань
    target?: string; // Для зовнішніх посилань
    rel?: string; // Для SEO і безпеки
}

function Text({ fontSize, as: Component = 'p', children, href, target, rel, ...rest }: TextProps) {
    const letterSpacing = fontSize / 10;

    if (Component === 'a' && href) {
        return (
            <a
                {...rest}
                href={href}
                target={target}
                rel={rel}
                style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}
            >
                {children}
            </a>
        );
    }

    return (
        <Component
            {...rest}
            style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px` }}
        >
            {children}
        </Component>
    );
}

export default Text;
