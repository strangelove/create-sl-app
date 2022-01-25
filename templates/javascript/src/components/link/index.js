import { default as NextLink } from "next/link";

const Link = ({ href, locale, children, onClick, ...props }) => {
  return (
    <div>
      <NextLink href={href} locale={locale} {...props}>
        <a onClick={onClick}>{children}</a>
      </NextLink>
    </div>
  );
};

export default Link;
