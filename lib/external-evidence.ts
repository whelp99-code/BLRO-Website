export type ExternalCaseEvidence = Readonly<{
  customer: string
  decisionLesson: string
  operatingSituation: string
  sourceTitle: string
  sourceUrl: string
  technology: string
}>

export const SANGFOR_KOREA_CASES = [
  {
    customer: "SECUI",
    technology: "HCI",
    operatingSituation: "보안관제센터의 서버·스토리지·네트워크 자원을 통합하고, 수요 변화에 즉시 대응할 운영 가시성이 필요했던 사례입니다.",
    decisionLesson: "자원 통합 여부만 보지 않고, 웹 기반 가시성·확장 방식·가상 방화벽 운영까지 함께 검증해야 합니다.",
    sourceTitle: "Sangfor HCI 고객 사례 — SECUI",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-gogaeg-salye-secui",
  },
  {
    customer: "롯데건설",
    technology: "VDI",
    operatingSituation: "3D 모델링 자원 공유와 협력사 접근을 지원하면서 정보 유출 방지, 애플리케이션 호환성, 이중 인증을 함께 다뤄야 했던 사례입니다.",
    decisionLesson: "GPU 자원만 산정하지 않고, 사용자·그룹 정책과 반출 통제, 인증, 가용성까지 하나의 검증 범위로 묶어야 합니다.",
    sourceTitle: "Sangfor VDI 고객 사례 — 롯데건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/vdi-losdegeonseol",
  },
  {
    customer: "LG생활건강",
    technology: "SD-WAN",
    operatingSituation: "600개 이상의 카운터와 400개 이상의 지점망에서 연결 연속성과 중앙 운영 가시성을 확보해야 했던 사례입니다.",
    decisionLesson: "회선 전환만 보지 않고, 암호화 연결·LTE 백업·중앙 정책·장애 시 운영 절차를 함께 통과 기준으로 정의해야 합니다.",
    sourceTitle: "Sangfor SD-WAN 고객 사례 — LG생활건강",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/sd-wan-lgsaenghwalgeongang-guchug",
  },
] as const satisfies readonly ExternalCaseEvidence[]
