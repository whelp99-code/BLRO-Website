export function TodoNote({ children }: { readonly children: string }) {
  return <p className="rd-todo">TODO. {children}</p>
}
