interface TypographyProps {
  children: React.ReactNode | string
  className?: string
}

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`H1 ${className}`}>{children}</h1>
)

export const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`H2 ${className}`}>{children}</h2>
)

export const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`H3 ${className}`}>{children}</h3>
)

export const H4 = ({ children, className = '' }: TypographyProps) => (
  <h4 className={`H4 ${className}`}>{children}</h4>
)

export const P1 = ({ children, className = '' }: TypographyProps) => (
  <p className={`P1 ${className}`}>{children}</p>
)

export const P2 = ({ children, className = '' }: TypographyProps) => (
  <p className={`P2${className}`}>{children}</p>
)

export const Bold = ({ children, className = '' }: TypographyProps) => (
  <b className={`${className}`}>{children}</b>
)

export const Italic = ({ children, className = '' }: TypographyProps) => (
  <i className={`${className}`}>{children}</i>
)
