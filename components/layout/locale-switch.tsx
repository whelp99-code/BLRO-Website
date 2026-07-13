import Link from "next/link"
import { getLocaleCounterpart } from "@/lib/navigation"

export type LocaleSwitchProps = {
  readonly pathname: string
  readonly publishedRoutes: ReadonlySet<string>
}

export function LocaleSwitch({ pathname, publishedRoutes }: LocaleSwitchProps) {
  const counterpart = getLocaleCounterpart(pathname, publishedRoutes)
  if (!counterpart) return null

  return (
    <Link
      className="blro-locale-switch"
      href={counterpart.href}
      hrefLang={counterpart.lang}
      prefetch={publishedRoutes.has(counterpart.href)}
    >
      {counterpart.label}
    </Link>
  )
}
