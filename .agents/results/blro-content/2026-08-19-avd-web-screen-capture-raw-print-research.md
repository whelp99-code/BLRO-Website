# AVD 웹 화면캡처 보호와 RAW 인쇄 조사 메모

상태: review 초안용. 2026-08-18 조사분이 2026-08-19에 착륙함.

확인일: 2026-08-19

대상 MDX: content/insights/ko/avd-web-screen-capture-raw-print.mdx

## Evidence

- AVD what’s-new August 2026는 지원 웹 브라우저에서 Screen Capture Protection을 쓸 수 있다고 적는다. RAW 인쇄는 공개 미리보기다.
- screen-capture-protection 문서는 SCP가 DRM이 아니며, 웹은 Edge for Business와 Intune MAM, 조건부 액세스가 필요하다고 적는다. 페이지 updated_at는 2026-08-07이다.
- printer redirection 문서는 신규 AVD 호스트 풀에서 프린터 재연결이 기본 꺼짐이며, RAW 인쇄는 재연결이 켜져 있어야 하고 SmartRawPrinters로 범위를 정한다고 적는다. 라벨 프린터는 what’s-new 예시다.

## Buyer Decision

- 결정 대상: 브라우저 접속에 Edge for Business·MAM·CA로 SCP를 요구할지, 라벨·미리보기용으로 프린터 재연결을 다시 켤지
- 판단 질문: SCP를 DRM으로 오해하지 않는가, 인쇄 예외를 모든 풀에 열지 않는가
- 비결정 대상: RDP Multipath, 연결 복원, 제품 비교

## Conversion

- 단일 CTA: VDI 워크스페이스 진단 범위 확인
- 전환 전 제공 범위: 브라우저 사용자, 보호 정책, 인쇄 예외 풀
- 전환 후 기대 산출물: SCP 적용 범위와 프린터 재연결 예외 판단표

## Quality panel verdicts

- 정확성: 통과. 웹 SCP 전제, DRM 아님, 기본 꺼진 재연결, RAW 미리보기를 공식 문구에 맞춤.
- 범위: 통과. Multipath를 본문에서 완전히 제외했다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- SCP가 DRM이거나 사진 촬영을 막는다는 주장
- 모든 브라우저에서 웹 SCP가 동작한다는 주장
- RAW 인쇄가 일반 공급이라는 주장
- 프린터 재연결이 신규 풀에서 기본 켜져 있다는 주장
- RDP Multipath와의 관계나 효과
- 유출 방지, 인쇄 품질, 성능 보장

## Source ledger

- Microsoft Learn AVD what’s-new. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/whats-new. updated 2026-08-14. August 2026 섹션. 확인일: 2026-08-19. 한계: 같은 달에 Multipath 관련 항목이 있으나 본문에서 제외했다.
- Microsoft Learn screen-capture-protection. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/screen-capture-protection?tabs=intune. updated 2026-08-07. 확인일: 2026-08-19. 한계: 플랫폼별 표가 많다. 웹 경로만 결정 근거로 썼다.
- Microsoft Learn printer redirection. URL: https://learn.microsoft.com/en-us/azure/virtual-desktop/redirection-configure-printers?tabs=intune&pivots=azure-virtual-desktop. updated 2026-08-10. 확인일: 2026-08-19. 한계: Windows 365·Dev Box 구역은 AVD 결정에 쓰지 않았다.

## firstPass

- August 2026 웹 SCP, RAW 공개 미리보기, DRM 아님, Edge+MAM+CA, 신규 풀 프린터 기본 꺼짐을 재확인했다.
- Multipath 문장은 인용하지 않았다.

## secondPass

- 본문에 Multipath 단어를 넣지 않았다.
- 표, 인라인 강조, 마크다운 링크를 넣지 않았다.

## Uncertainties

- 웹 SCP의 일반 공급 범위가 모든 테넌트에 동일하게 켜지는지는 what’s-new가 “now available”만 적는다.
- RAW 인쇄의 GA 전환 시점은 없다.
- 고객별 Intune·조건부 액세스 현재 값은 이 초안이 알지 못한다.
