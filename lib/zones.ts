export type ZoneSetting = {
  readonly label: string
  readonly detail: string
}

export type Zone = {
  readonly key: "network" | "server" | "storage" | "backup" | "security"
  readonly name: string
  readonly summary: string
  readonly settings: readonly ZoneSetting[]
}

// 설명은 승인된 서비스 문서와 /solutions/hci에 이미 공개된 확인 항목만 사용합니다.
export const ZONES: readonly Zone[] = [
  {
    key: "network",
    name: "네트워크",
    summary: "업무망과 관리망, 지점·원격 사용자·클라우드로 이어지는 길을 정하는 구역입니다.",
    settings: [
      { label: "업무망과 관리망 분리", detail: "업무망과 관리망을 나누어 구성하는지, 기존 네트워크 구분은 어떤지 확인합니다." },
      { label: "접속 경로와 품질", detail: "지점, 사용자, SaaS, 사내 애플리케이션의 실제 접속 경로와 품질이 떨어지는 지점을 측정합니다." },
      { label: "연결 방식의 역할", detail: "SASE, SD-WAN, 기존 VPN·MPLS·방화벽이 각각 맡을 역할을 구분하고 겹치는 통제를 정리합니다." },
    ],
  },
  {
    key: "server",
    name: "서버",
    summary: "업무 시스템이 올라가는 컴퓨트 구역입니다.",
    settings: [
      { label: "올릴 업무 시스템", detail: "올릴 업무 시스템과 지금 가상화의 종류를 적어 주세요." },
      { label: "전환 조건", detail: "전환 중 멈출 수 있는 시간과 되돌릴 조건을 정합니다." },
      { label: "설치 환경", detail: "랙, 전력, 냉각, 기존 네트워크 구분을 확인합니다." },
    ],
  },
  {
    key: "storage",
    name: "스토리지",
    summary: "클러스터 안에 데이터를 두고 보호하는 구역입니다.",
    settings: [
      { label: "데이터 보호", detail: "백업 주기, 보관 위치, 복구 담당을 정합니다." },
      { label: "별도 스토리지 검토", detail: "HCI에 스토리지가 포함되어도 별도 스토리지(aStor)가 필요한지 함께 확인합니다." },
      { label: "응답과 용량", detail: "응답, 용량, 기존 연결, 보호 요구를 적습니다." },
    ],
  },
  {
    key: "backup",
    name: "백업·재해복구",
    summary: "장애나 랜섬웨어 뒤에 무엇을 어떤 순서로 되살릴지 정하는 구역입니다.",
    settings: [
      { label: "복구 목표", detail: "업무별 RPO·RTO와 복구 우선순위를 업무 영향 기준으로 합의합니다." },
      { label: "보호 수단의 역할", detail: "스냅샷, 백업, 복제, 격리 보관, DR 전환이 각각 해결하는 위험과 책임을 구분합니다." },
      { label: "복구 리허설", detail: "데이터 정합성, 애플리케이션 기동 순서, 사용자 인수와 원복 조건을 실제로 확인합니다." },
    ],
  },
  {
    key: "security",
    name: "보안",
    summary: "접근 정책과 탐지·대응 책임을 정하는 구역입니다.",
    settings: [
      { label: "접근 정책", detail: "사용자, 장치 상태, 애플리케이션, 데이터 민감도에 따른 접근 정책과 예외 승인 기준을 만듭니다." },
      { label: "탐지와 연결", detail: "방화벽, 원격접속, 엔드포인트, 클라우드 보안의 로그를 연결하고 역할 중복을 확인합니다." },
      { label: "대응 책임", detail: "의심 시 어떤 증거를 보고 누가 차단할지, 탐지·조사·차단·복구 책임을 정합니다." },
    ],
  },
] as const
