# NCI 7.6 Security Profiles 조사 메모

상태: review 초안용. 2026-08-28 KST.
대상 MDX: content/insights/ko/nutanix-nci-76-security-profiles.mdx

## Evidence

- TME community blog public 200. Standard/Elevated/Strict, rolling reboot, 2-hour cron, upgrade not set, syslog/LDAP/segmentation not in profile.
- PC 7.6 2026-07-27: Apply predefined Security Profiles.
- AOS 7.6 2026-07-27 thin: important security enhancements, Secure Access SSH. No profile name.
- nutanix.com blog: public security hardening mention only.
- Portal Hardening Guide login-walled. Not official-3.

## Buyer Decision

- 결정 대상: not set 유지 vs Standard/Elevated/Strict, 재부팅 창, 프로파일 밖 설정
- 비결정 대상: 외부 스토리지 글, 잠긴 PDF 인용, VMware 비교

## Conversion

- 단일 CTA: mailto:jm.park@blro.co.kr HCI 진단 범위

## Quality panel verdicts

- 정확성: 통과. AOS 페이지가 얇은 점을 본문에 남김.
- 공개 준비: 보류. status review.

## Rejected claims

- 포털 Hardening Guide를 공식 3출처로 사용
- PowerStore/external-storage 각도 재사용
- 프로파일이 규제 적합을 보장
