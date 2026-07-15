export type NavigationChild = {
  readonly description: string
  readonly href: string
  readonly label: string
}

export type NavigationItem = {
  readonly children: readonly NavigationChild[]
  readonly href: string
  readonly label: string
}

export type BreadcrumbItem = {
  readonly href: string
  readonly label: string
}

export type LocaleCounterpart = {
  readonly href: string
  readonly label: "English" | "한국어"
  readonly lang: "en" | "ko"
}

const solutionChildren = [
  { href: "/solutions/hci-private-cloud", label: "HCI & Private Cloud", description: "가상화와 프라이빗 클라우드 전환" },
  { href: "/solutions/vdi-digital-workspace", label: "VDI & Digital Workspace", description: "안전하고 일관된 디지털 업무환경" },
  { href: "/solutions/backup-disaster-recovery", label: "Backup & Disaster Recovery", description: "복구 가능성을 기준으로 한 데이터 보호" },
  { href: "/solutions/network-security", label: "Network Security", description: "접근과 연결을 함께 설계하는 보안" },
  { href: "/solutions/sase-global-connectivity", label: "SASE & Global Connectivity", description: "분산 조직을 위한 안전한 글로벌 연결" },
] as const satisfies readonly NavigationChild[]

export const primaryNavigation = [
  { href: "/solutions", label: "Solutions", children: solutionChildren },
  { href: "/ai-automation", label: "AI & Automation", children: [] },
  { href: "/projects", label: "Projects", children: [] },
  { href: "/insights", label: "Insights", children: [] },
  { href: "/partner-business", label: "Partner Business", children: [] },
  { href: "/contact", label: "전환 진단 범위 확인", children: [] },
] as const satisfies readonly NavigationItem[]

// 기업 고객의 탐색 흐름은 상단에 집중하고, 회사 소개는 푸터에서만 제공한다.
export const footerBusinessRoutes = [
  { href: "/blro", label: "BLRO" },
  { href: "/solutions", label: "Solutions" },
  { href: "/ai-automation", label: "AI & Automation" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/partner-business", label: "Partner Business" },
] as const

export const footerInquiries = [
  { href: "/contact?type=customer-project", label: "고객 프로젝트 상담" },
  { href: "/contact?type=partner-collaboration", label: "파트너 협업 문의" },
  { href: "/contact?type=vendor-korea-entry", label: "한국 시장 진출 문의" },
] as const

export const footerPolicyLinks = [
  { href: "/privacy", label: "개인정보 처리방침" },
  { href: "/terms", label: "이용안내" },
] as const

export const publishedRoutes: ReadonlySet<string> = new Set([
  "/",
  "/blro",
  "/ai-automation",
  "/partner-business",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
  "/insights",
  "/solutions",
  ...solutionChildren.map((item) => item.href),
])

const routeLabels = new Map<string, string>([
  ["/", "Home"],
  ["/blro", "BLRO"],
  ["/ai-automation", "AI & Automation"],
  ["/partner-business", "Partner Business"],
  ["/projects", "Projects"],
  ["/insights", "Insights"],
  ["/contact", "Contact"],
  ["/privacy", "개인정보 처리방침"],
  ["/terms", "이용안내"],
  ["/solutions", "Solutions"],
  ...solutionChildren.map((item) => [item.href, item.label] as const),
])

const localePairs = [
  ["/", "/en"],
] as const

function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/u, 1)[0] ?? "/"
  return path.length > 1 ? path.replace(/\/+$/u, "") : path
}

export function isCurrentRoute(pathname: string, href: string) {
  const currentPath = normalizePath(pathname)
  const routePath = normalizePath(href)
  return currentPath === routePath || (routePath !== "/" && currentPath.startsWith(`${routePath}/`))
}

export function getBreadcrumbs(pathname: string): readonly BreadcrumbItem[] {
  const currentPath = normalizePath(pathname)
  if (currentPath === "/") return []

  const segments = currentPath.split("/").filter(Boolean)
  const paths = segments.map((_, index) => `/${segments.slice(0, index + 1).join("/")}`)
  if (paths.some((path) => !routeLabels.has(path))) return []

  return [
    { href: "/", label: "Home" },
    ...paths.map((path) => ({ href: path, label: routeLabels.get(path) ?? path })),
  ]
}

export function getLocaleCounterpart(
  pathname: string,
  publishedRoutes: ReadonlySet<string>,
): LocaleCounterpart | undefined {
  const currentPath = normalizePath(pathname)
  const pair = localePairs.find(([KoreanPath, EnglishPath]) =>
    currentPath === KoreanPath || currentPath === EnglishPath,
  )
  if (!pair) return undefined

  const [KoreanPath, EnglishPath] = pair
  const target = currentPath === KoreanPath ? EnglishPath : KoreanPath
  if (!publishedRoutes.has(target)) return undefined

  return target.startsWith("/en")
    ? { href: target, label: "English", lang: "en" }
    : { href: target, label: "한국어", lang: "ko" }
}
