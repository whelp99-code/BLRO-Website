# Oracle HTTP/WebLogic 프록시 KEV 조사 메모

상태: review 초안용. 2026-08-25 KST.

확인일: 2026-08-25

대상 MDX: content/insights/ko/oracle-http-weblogic-proxy-kev.mdx

## Evidence

- CISA 경보 2026-08-24는 CVE-2026-21962 한 건을 KEV에 올렸다. BOD 26-04는 미국 FCEB에만 적용.
- KEV 항목 추가일 2026-08-24, 기한 2026-08-27. Required Action은 아직 BOD 22-01을 적는다.
- BOD 26-04 본문은 2026-06-10에 BOD 22-01을 폐지했다고 적는다.
- NVD KEV 표 기한은 2026-08-27. 변경 이력 일부 줄은 기한을 2026-08-24로 넣었다.
- Oracle January 2026 CPU는 CVSS 10.0, HTTP, Remote Yes. Note 1은 IIS 플러그인을 12.2.1.4.0만 영향으로 둔다.

## Buyer Decision

- 결정 대상: 인터넷에 열린 Oracle HTTP와 WebLogic 프록시, IIS 버전 한정, CPU 적용
- 판단 질문: BOD 기한을 한국 고객 법정 기한으로 옮기는가
- 비결정 대상: Cisco ASA KEV, Windows IKE KEV, GlobalProtect 재작성

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 로 컨설팅 문의
- 전환 전 제공 범위: 노출 프록시, 플러그인, 버전
- 전환 후 기대 산출물: 패치와 중지 판단표

## Quality panel verdicts

- 정확성: 통과. 기한과 BOD 문구 불일치를 본문에 남겼다.
- 범위: 통과. 가장자리 HTTP 프록시만 다룬다.
- 전환: 통과. CTA 하나.
- 공개 준비: 보류. status review.

## Rejected claims

- BOD 26-04를 한국 법정 의무로 적용
- IIS 14.1.x를 같은 영향 버전으로 취급
- 악용 절차, 가격, Sangfor 사례

## Source ledger

- CISA alert 2026-08-24. URL: https://www.cisa.gov/news-events/alerts/2026/08/24/cisa-adds-one-known-exploited-vulnerability-catalog. 확인일: 2026-08-25. 직접 열람.
- CISA KEV 항목. URL: https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-21962. 확인일: 2026-08-25. 직접 열람.
- NVD CVE-2026-21962. URL: https://nvd.nist.gov/vuln/detail/CVE-2026-21962. 확인일: 2026-08-25. 직접 열람.
- Oracle CPU January 2026. URL: https://www.oracle.com/security-alerts/cpujan2026.html. 확인일: 2026-08-25. 직접 열람.
- BOD 26-04. URL: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk. 확인일: 2026-08-25. 직접 열람.

## firstPass

- KEV 기한 카탈로그 2026-08-27을 운영 기준으로 재확인했다.
- 소셜 근거는 사용하지 않았다.

## secondPass

- 표, 본문 링크, 인라인 강조를 넣지 않았다.
- 기존 보안 초안을 다시 쓰지 않았다.

## Uncertainties

- Oracle MOS 패치 설치 절차는 로그인 문서라 이 작업에서 열지 못했다.
- 고객별 인터넷 노출 여부는 공개 출처로 확인할 수 없다.
