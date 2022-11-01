// Block wraps around each individual block, like cards or a form. Blocks are made out of components, while blocks together are wrapped in a wrapper

export default function Block({ children }: { children: React.ReactNode }) {
  return <div className="block">{children}</div>
}
