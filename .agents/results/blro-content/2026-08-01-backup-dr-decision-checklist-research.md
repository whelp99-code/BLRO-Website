# 백업·재해복구 의사결정 글 리서치 기록

상태: 초안 근거 검토 완료, 공개 승인 전

대상 글: `content/insights/ko/backup-dr-decision-checklist.mdx`

확인일: 2026-08-01

## Evidence

- NIST SP 800-34 Rev. 1은 영향 분석, 예방 통제, 복구 전략, 계획, 시험·훈련·연습, 유지관리를 포함하는 비상계획 과정을 제시한다.
- CISA #StopRansomware Guide는 중요 데이터의 오프라인·암호화 백업과 재해복구 시나리오에서의 백업 가용성·무결성 시험을 권고한다.
- AWS 백서는 DR 전략을 업무의 RPO·RTO에 맞추고, 백업·복원 전략에는 데이터 외 구성과 인프라의 재배포 및 백업 시험이 필요하다고 설명한다.
- Microsoft Cloud Security Benchmark는 정기 시험으로 백업 구성, 복구 절차, 데이터 무결성과 RTO·RPO 충족 여부를 검증하도록 안내하며, 단일 시스템 시험만으로 상호 의존 시스템의 재해 시나리오를 검증할 수 없다고 설명한다.

## Buyer Decision

구매자 또는 의사결정자는 제품 선택 전에 다음을 합의해야 한다.

- 어떤 업무를 어떤 순서로 복구할지
- 시스템별 데이터 손실 허용 범위와 복구 시간 목표의 업무 근거
- 데이터 외에 구성, 코드, 접근 절차, 운영 문서를 복구 대상에 포함할지
- 복구 책임자, 업무 검증자, 공지 담당자와 훈련 기록 방식

## Conversion

단일 CTA는 업무 우선순위와 현재 복구 절차를 기준으로 가정과 검증 항목을 정리하는 상담 요청이다.

CTA는 제품 교체, 특정 공급자 채택, 비용 절감, 성능 향상, 보안 보장 또는 계약 체결을 유도하지 않는다.

## Quality panel verdicts

- 근거성: 통과. 본문 핵심 원칙은 공식 1차 출처 네 곳으로 뒷받침한다.
- 최신성: 조건부 통과. CISA 2023, AWS 2022 문서 이력, Microsoft 2026 페이지를 확인했다. NIST 기준 문서는 2010년판이므로 최신 제품 기능의 근거로 사용하지 않았다.
- 과장 방지: 통과. 가격, 성능, 호환성, 고객 사례, 계약, 공급자 우위, 보안·복구 성공 보장을 주장하지 않는다.
- 전환 경계: 통과. 진단 범위와 의사결정 산출물, 운영 검증을 분리하고 단일 상담 CTA만 둔다.
- 공개 준비: 보류. `status: review`이며 콘텐츠 책임자의 사실·표현·서비스 범위 검토와 승인 전에는 공개하지 않는다.

## Rejected claims

- 특정 백업 또는 DR 방식이 더 저렴하거나 더 빠르다는 주장
- 특정 공급자가 다른 공급자보다 우수하다는 주장
- 오프라인, 암호화 또는 변경 불가 백업이 침해·손실을 방지하거나 복구 성공을 보장한다는 주장
- 백업 성공 로그만으로 RPO·RTO 충족을 증명할 수 있다는 주장
- 복구 시험 없이 무중단 또는 규제 적합성을 주장하는 문구
- 고객 환경, 계약, 라이선스 또는 호환성을 확인하지 않은 채 특정 구성을 권고하는 문구

## Source ledger

### NIST

- 기관·문서: National Institute of Standards and Technology, SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems
- URL: https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final
- 문서 날짜·버전: Rev. 1, 2010-11-11
- 확인일: 2026-08-01
- 사용 근거: 영향 분석부터 시험·훈련·유지관리까지 이어지는 계획 과정, 복구 우선순위의 필요성
- 보장하지 않는 것: 개별 조직의 RTO·RPO 충족, 특정 제품의 적합성, 실제 복구 성공 또는 규제 적합성

### CISA

- 기관·문서: Cybersecurity and Infrastructure Security Agency, #StopRansomware Guide
- URL: https://www.cisa.gov/stopransomware/ransomware-guide
- 문서 날짜·버전: 2023-09, 2020년 안내서 개정판
- 확인일: 2026-08-01
- 사용 근거: 중요 데이터의 오프라인·암호화 백업과 재해복구 시나리오에서의 가용성·무결성 시험 권고
- 보장하지 않는 것: 랜섬웨어 방지, 백업 무결성, 복구 성공, 특정 저장소나 설정의 보안 수준

### AWS

- 기관·문서: Amazon Web Services, Disaster Recovery of Workloads on AWS: Recovery in the Cloud
- URL: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html
- 문서 날짜·버전: 최초 발행 2021-02-12, 문서 이력 최종 표시 2022-04-01
- 확인일: 2026-08-01
- 사용 근거: DR 전략을 업무 RPO·RTO에 맞추고 데이터 외 구성·인프라와 백업 시험을 고려해야 한다는 설명
- 보장하지 않는 것: AWS 사용 시 특정 RPO·RTO, 비용, 가용성, 성능, 자동 복구 또는 규제 적합성

### Microsoft

- 기관·문서: Microsoft Learn, Microsoft cloud security benchmark v2 - Backup and Recovery
- URL: https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-backup-recovery
- 문서 날짜·버전: 페이지 최종 업데이트 2026-05-04
- 확인일: 2026-08-01
- 사용 근거: 정기 복구 시험, 데이터 무결성·RTO·RPO 확인, 단일 시스템 시험의 한계
- 보장하지 않는 것: Azure 또는 다른 환경에서의 복구 성공, 성능, 보안, 규제 적합성, 모든 의존성의 복구

## FirstPass provisional evidence

- 공식 출처 네 곳이 모두 복구 목표의 업무 기반 설정과 정기 복구 검증의 필요성을 지지한다.
- NIST는 계획 프로세스, CISA는 랜섬웨어 관점의 백업 보호와 시험, AWS와 Microsoft는 복구 목표·구성 요소·훈련의 운영적 연결을 제공한다.
- 초안에 인용한 내용은 특정 공급자 기능의 비교나 수치 주장으로 확장하지 않는다.

## SecondPass provisional evidence

- 본문 문단별 주장과 source ledger의 사용 근거를 대조했다.
- 외부 링크는 본문 출처 섹션에만 원문 URL로 노출했고, 본문에는 마크다운 링크를 사용하지 않았다.
- 모든 공식 출처에 문서 날짜 또는 버전, 확인일, 보장하지 않는 범위를 기록했다.
- 공개 전 최종 검토가 끝나지 않았으므로 이 평가는 잠정적이다.

## Uncertainties

- 고객의 실제 워크로드, 데이터 분류, 의존 관계, 권한 구조, 계약·라이선스, 법적·규제 요구는 확인하지 않았다.
- 각 문서의 권고는 일반 지침이며 고객 환경의 설계나 복구 결과를 대체하지 않는다.
- NIST 기준 문서는 2010년판이며, 최신 플랫폼별 구현 조건은 해당 공급자의 현재 공식 문서와 실제 검증으로 별도 확인해야 한다.
- CISA, AWS, Microsoft 문서의 향후 개정 가능성을 고려해 공개 승인 직전에 URL과 문서 이력을 재확인해야 한다.
