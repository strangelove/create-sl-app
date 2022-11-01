// Section divides each page up in sections. A section might is full width and might handle background color (if necessary)

export default function Section({ children }: { children: React.ReactNode }) {
  return <div className="section">{children}</div>
}
