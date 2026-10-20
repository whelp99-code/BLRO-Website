export type HciLayer = {
  readonly key: "compute" | "storage" | "network" | "management"
  readonly name: string
  readonly summary: string
  readonly points: readonly string[]
}

// HCI 구성 4개 층. 설명은 /solutions/hci에 이미 공개된 사실만 담습니다.
export const HCI_LAYERS: readonly HciLayer[] = [
  {
    key: "compute",
    name: "컴퓨트",
    summary: "업무 시스템을 올리는 층입니다.",
    points: ["올릴 업무 시스템과 지금 가상화의 종류를 적어 주세요.", "전환 중 멈출 수 있는 시간과 되돌릴 조건을 알려 주세요.", "필요한 대수와 성능은 상담에서 확인합니다."],
  },
  {
    key: "storage",
    name: "스토리지",
    summary: "클러스터 안에 데이터를 두는 층입니다.",
    points: ["데이터 보호: 백업 주기, 보관 위치, 복구 담당을 알려 주세요.", "별도 스토리지(aStor)가 필요한지도 함께 확인합니다."],
  },
  {
    key: "network",
    name: "네트워크",
    summary: "업무망과 관리망을 잇는 층입니다.",
    points: ["랙, 전력, 냉각, 기존 네트워크 구분을 알려 주세요.", "업무망과 관리망을 나누어 구성하는지 확인합니다."],
  },
  {
    key: "management",
    name: "관리",
    summary: "자원과 운영 담당을 다루는 층입니다.",
    points: ["HCI 관리 화면과 별개로, 자원 관리와 운영 담당 체계(SCP)가 필요한지 확인합니다.", "국내 공급 조건과 BLRO 수행 범위는 상담에서 정리합니다."],
  },
] as const
