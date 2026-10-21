export type SecurityLayer = {
  readonly key: "access" | "detect" | "respond" | "verify"
  readonly name: string
  readonly summary: string
  readonly callout: string
  readonly points: readonly string[]
}

// /solutions/network-security(승인된 서비스 문서)에 이미 공개된 내용만 담습니다.
export const SECURITY_LAYERS: readonly SecurityLayer[] = [
  {
    key: "access",
    name: "접근 통제",
    summary: "누가 어떤 장치로 어떤 애플리케이션에 접속하는지 정하는 층입니다.",
    callout: "누가·어떤 장치로·어디에 접속하는지 정하는 곳",
    points: ["사용자, 장치 상태, 애플리케이션, 데이터 민감도에 따른 접근 정책을 정합니다.", "예외 승인 기준도 함께 정합니다."],
  },
  {
    key: "detect",
    name: "탐지",
    summary: "흩어진 경보와 로그를 한곳에서 볼 수 있게 연결하는 층입니다.",
    callout: "방화벽·원격접속·엔드포인트 로그를 모으는 곳",
    points: ["방화벽, 원격접속, 엔드포인트, 클라우드 보안의 로그와 가시성을 연결합니다.", "기존 보안 도구와 역할이 겹치는지 확인합니다."],
  },
  {
    key: "respond",
    name: "대응",
    summary: "의심 상황에서 누가 무엇을 보고 차단할지 정해 두는 층입니다.",
    callout: "의심 시 누가 차단하는지 정해 두는 곳",
    points: ["정책 위반이나 침해가 의심될 때 어떤 증거를 보고 누가 차단할지 정합니다.", "탐지, 조사, 차단, 복구의 책임을 나누어 적습니다."],
  },
  {
    key: "verify",
    name: "검증",
    summary: "정한 정책과 절차가 실제로 동작하는지 시나리오로 확인하는 층입니다.",
    callout: "실제 시나리오로 확인하는 곳",
    points: ["공격, 오탐, 원격접속, 지점 장애 시나리오로 PoC와 초기 운영 절차를 확인합니다.", "차단율이나 위협 대응 시간은 사전에 약속하지 않고, 합의한 시험 시나리오로 확인합니다."],
  },
] as const
