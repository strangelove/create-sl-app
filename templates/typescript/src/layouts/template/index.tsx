// Template holds wraps around the entire app

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="template">{children}</div>
}
