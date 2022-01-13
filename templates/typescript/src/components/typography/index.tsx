interface TypographyProps {
  children: React.ReactNode | string
  className?: string
}

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`${className}`} id="H1">
    {children}
  </h1>
)

export const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`${className}`} id="H2">
    {children}
  </h2>
)

export const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`${className}`} id="H3">
    {children}
  </h3>
)

export const H4 = ({ children, className = '' }: TypographyProps) => (
  <h4 className={`${className}`} id="H4">
    {children}
  </h4>
)

export const P1 = ({ children, className = '' }: TypographyProps) => (
  <p className={`${className}`} id="P1">
    {children}
  </p>
)

export const P2 = ({ children, className = '' }: TypographyProps) => (
  <p className={`${className}`} id="P2">
    {children}
  </p>
)