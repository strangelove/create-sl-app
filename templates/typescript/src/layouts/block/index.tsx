import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

// Block wraps around each individual block, like cards or a form. Blocks are made out of components, while blocks together are wrapped in a wrapper

export default function Block({ children, className = '' }: Props) {
  return <div className={`block ${className}`}>{children}</div>
}
