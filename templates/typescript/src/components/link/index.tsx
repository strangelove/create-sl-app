import { default as NextLink, LinkProps } from "next/link";

interface Props extends LinkProps {
  cn?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Link = ({ href, locale, children, onClick, ...props }: Props) => {
  return (
    <div>
      <NextLink href={href} locale={locale} {...props}>
        <a onClick={onClick}>{children}</a>
      </NextLink>
    </div>
  );
};
