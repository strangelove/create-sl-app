import { default as NextLink, LinkProps } from 'next/link'

interface Props extends LinkProps {
  cn?: string
  children: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Link = ({ href, locale, children, onClick, ...props }: Props) => {
  return (
    <div>
      <NextLink href={href} locale={locale} {...props}>
        <a onClick={onClick}>{children}</a>
      </NextLink>
    </div>
  )
}

export default Link
