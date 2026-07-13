import Link from "next/link"
import { getBreadcrumbs, publishedRoutes } from "@/lib/navigation"

export type BreadcrumbProps = {
  readonly pathname: string
}

export function Breadcrumb({ pathname }: BreadcrumbProps) {
  const items = getBreadcrumbs(pathname)
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="blro-breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={item.href}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} prefetch={publishedRoutes.has(item.href)}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
