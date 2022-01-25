export const H1 = ({ children, className = "" }) => (
  <h1 className={`${className}`} id="H1">
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }) => (
  <h2 className={`${className}`} id="H2">
    {children}
  </h2>
);

export const H3 = ({ children, className = "" }) => (
  <h3 className={`${className}`} id="H3">
    {children}
  </h3>
);

export const H4 = ({ children, className = "" }) => (
  <h4 className={`${className}`} id="H4">
    {children}
  </h4>
);

export const P1 = ({ children, className = "" }) => (
  <p className={`${className}`} id="P1">
    {children}
  </p>
);

export const P2 = ({ children, className = "" }) => (
  <p className={`${className}`} id="P2">
    {children}
  </p>
);

export const Bold = ({ children, className = "" }) => (
  <b className={`${className}`}>{children}</b>
);

export const Italic = ({ children, className = "" }) => (
  <i className={`${className}`}>{children}</i>
);
