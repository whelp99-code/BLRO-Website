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
  { href: "/solutions/hci", label: "HCI", description: "통합 인프라 검토 출발점" },
  { href: "/solutions/vdi-digital-workspace", label: "VDI", description: "업무 화면과 디지털 워크스페이스" },
  { href: "/solutions/network-security", label: "네트워크·보안", description: "접근과 연결" },
  { href: "/solutions/backup-disaster-recovery", label: "백업·DR", description: "복구 가능성" },
  { href: "/solutions/sase-global-connectivity", label: "SASE", description: "분산 조직의 연결" },
] as const satisfies readonly NavigationChild[]

export const primaryNavigation = [
  { href: "/customer", label: "기업 고객", children: [] },
  { href: "/partner", label: "국내 파트너", children: [] },
  { href: "/engineer", label: "기술 엔지니어", children: [] },
  { href: "/solutions", label: "솔루션", children: solutionChildren },
  { href: "/projects", label: "판단 과정", children: [] },
  { href: "/contact", label: "상담", children: [] },
] as const satisfies readonly NavigationItem[]

// 인사이트와 AI는 1차 내비게이션에 두지 않는다.
export const footerBusinessRoutes = [
  { href: "/blro", label: "BLRO" },
  { href: "/solutions", label: "솔루션" },
  { href: "/insights", label: "인사이트" },
  { href: "/ai-automation", label: "AI와 자동화" },
  { href: "/partner-business", label: "파트너 사업" },
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
  "/customer",
  "/partner",
  "/engineer",
  "/ai-automation",
  "/partner-business",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
  "/insights",
  "/solutions",
  "/solutions/hci",
  "/solutions/hci-private-cloud",
  ...solutionChildren.map((item) => item.href),
])

const routeLabels = new Map<string, string>([
  ["/", "Home"],
  ["/blro", "BLRO"],
  ["/customer", "기업 고객"],
  ["/partner", "국내 파트너"],
  ["/engineer", "기술 엔지니어"],
  ["/ai-automation", "AI & Automation"],
  ["/partner-business", "Partner Business"],
  ["/projects", "판단 과정"],
  ["/insights", "Insights"],
  ["/contact", "Contact"],
  ["/privacy", "개인정보 처리방침"],
  ["/terms", "이용안내"],
  ["/solutions", "Solutions"],
  ["/solutions/hci", "HCI"],
  ["/solutions/hci-private-cloud", "HCI & Private Cloud"],
  ["/solutions/vdi-digital-workspace", "VDI & Digital Workspace"],
  ["/solutions/backup-disaster-recovery", "Backup & Disaster Recovery"],
  ["/solutions/network-security", "Network Security"],
  ["/solutions/sase-global-connectivity", "SASE & Global Connectivity"],
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
