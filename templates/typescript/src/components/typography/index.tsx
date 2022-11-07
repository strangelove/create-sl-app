interface TypographyProps {
  children: React.ReactNode | string
  className?: string
  id?: string
}

export const H1s = ({ children, className = '', id = '' }: TypographyProps) => (
  <h1 id={id} className={`H1s ${className}`}>
    {children}
  </h1>
)

export const H1 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h1 id={id} className={`H1 ${className}`}>
    {children}
  </h1>
)

export const H2 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h2 id={id} className={`H2 ${className}`}>
    {children}
  </h2>
)

export const H3 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h3 id={id} className={`H3 ${className}`}>
    {children}
  </h3>
)

export const H4 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h4 id={id} className={`H4 ${className}`}>
    {children}
  </h4>
)

export const H5 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h5 id={id} className={`H5 ${className}`}>
    {children}
  </h5>
)

export const H6 = ({ children, className = '', id = '' }: TypographyProps) => (
  <h6 id={id} className={`H6 ${className}`}>
    {children}
  </h6>
)

export const Q1 = ({ children, className = '', id = '' }: TypographyProps) => (
  <q id={id} className={`Q1 ${className}`}>
    {children}
  </q>
)

export const Q2 = ({ children, className = '', id = '' }: TypographyProps) => (
  <q id={id} className={`Q2 ${className}`}>
    {children}
  </q>
)

export const P1 = ({ children, className = '', id = '' }: TypographyProps) => (
  <p id={id} className={`P1 ${className}`}>
    {children}
  </p>
)

export const P2 = ({ children, className = '', id = '' }: TypographyProps) => (
  <p id={id} className={`P2 ${className}`}>
    {children}
  </p>
)

export const P3 = ({ children, className = '', id = '' }: TypographyProps) => (
  <p id={id} className={`P3 ${className}`}>
    {children}
  </p>
)

export const Bold = ({
  children,
  className = '',
  id = '',
}: TypographyProps) => (
  <b id={id} className={`${className}`}>
    {children}
  </b>
)

export const Italic = ({
  children,
  className = '',
  id = '',
}: TypographyProps) => (
  <i id={id} className={`${className}`}>
    {children}
  </i>
)
