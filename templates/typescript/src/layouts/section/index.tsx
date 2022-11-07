import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  sectionClassName?: string
  wrapperClassName?: string
}

// Section divides each page up in sections. A section is full width and might handle background color (if necessary)
// Wrapper has a maximum width and contains the website's content
export default function Section({
  children,
  sectionClassName = '',
  wrapperClassName = '',
}: Props) {
  return (
    <section className={`section ${sectionClassName}`}>
      <div className={`wrapper ${wrapperClassName}`}>{children}</div>
    </section>
  )
}
