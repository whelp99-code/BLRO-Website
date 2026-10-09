# Kubernetes 1.34 유지보수·EOL 조사 메모

상태: review 초안용. 2026-08-29 KST.
대상 MDX: content/insights/ko/kubernetes-134-maintenance-eol.mdx

## Evidence

- kubernetes.io/releases/1.34/ HTTP 200. Maintenance mode 2026-08-27. EOL 2026-10-27. Latest patch shown 1.34.9 (2026-06-09). Upcoming 1.34.10 target 2026-07-14, already past on this check day.
- kubernetes.io/releases/ HTTP 200. Most recent three minors 1.37, 1.36, 1.35. 1.37.0 released 2026-08-26. 1.34 Latest still 1.34.9 (2026-06-09).
- GitHub blob CHANGELOG-1.34.md was empty JS this run. Raw CHANGELOG HTTP 200. Has v1.34.11 and Changelog since v1.34.10.
- GitHub tag v1.34.11 HTTP 200. Published 2026-08-20T18:45:38Z.
- Version skew policy HTTP 200. Maintained branches 1.37, 1.36, 1.35. kubelet skew examples. Last modified April 14, 2026.

## Buyer Decision

- 결정 대상: EOL 전 유지 마이너로 이동, HTML 패치 vs GitHub 패치 대조
- 비결정 대상: 필수 목표 마이너 단정, EKS CA 교체, AKS Azure Files

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr 인프라 수명 주기 진단 범위

## Quality panel verdicts

- 정확성: 통과. HTML 1.34.9와 GitHub v1.34.11 불일치를 남김. 목표 마이너 미단정.
- 공개 준비: 보류. status review.

## Rejected claims

- 필수 목표를 1.37로 고정
- EKS CA rotation, AKS Azure Files 재작성
- HTML latest patch를 운영 패치로 사용
- /contact send 정상

## Source ledger

- 1.34 page. URL: https://kubernetes.io/releases/1.34/. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- Releases. URL: https://kubernetes.io/releases/. 확인일: 2026-08-29. HTTP 200. 직접 열람.
- CHANGELOG raw. URL: https://raw.githubusercontent.com/kubernetes/kubernetes/master/CHANGELOG/CHANGELOG-1.34.md. 확인일: 2026-08-29. HTTP 200. blob HTML empty.
- Tag. URL: https://github.com/kubernetes/kubernetes/releases/tag/v1.34.11. 확인일: 2026-08-29. HTTP 200. Published 2026-08-20.
- Version skew. URL: https://kubernetes.io/releases/version-skew-policy/. 확인일: 2026-08-29. HTTP 200. 직접 열람.

## firstPass

- Maintenance 2026-08-27, EOL 2026-10-27, HTML 1.34.9 vs GitHub v1.34.11, maintained 1.37/1.36/1.35.

## secondPass

- 표, 본문 링크, 인라인 강조 없음.
- 필수 목표 마이너 문장 없음.

## Uncertainties

- kubernetes.io HTML이 언제 1.34.11을 최신으로 올릴지는 문서에 없다.
- CHANGELOG v1.34.11 절 자체에는 게시 날짜가 없다. 날짜는 GitHub tag Published만 사용했다.
