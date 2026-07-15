# BLRO daily deep-research insight plan

## Outcome

Publish two decision-useful Korean insights every calendar day. Keep a third draft as a reserve. Do not trade publication speed for unsupported vendor, customer, security, pricing, compatibility, or performance claims.

## Rolling daily operating loop

| Time | Owner | Output |
| --- | --- | --- |
| T-1 09:00 | Researcher | Tomorrow's two questions, one reserve, research brief and source list |
| T-1 09:15-10:30 | Researcher | Primary-source capture, source date, quoted facts, assumptions and conflicts |
| T-1 10:30-11:30 | Writer | Tomorrow's two 700-1,100 word MDX drafts: problem, decision criteria, practical checklist, exclusions, next action |
| T-1 13:00 | Technical reviewer | Accuracy, version/date, operational feasibility, source coverage and limitation review |
| T-1 15:00 | Publication approver | Public/private classification; customer, vendor, price and legal claim review |
| T 08:00 | Publisher | Two `approved` MDX items, approval digest, build and public-index verification |
| T 08:30 | Operator | Publish log, related service linkage, CTA check and correction queue |

An item missing its technical or publication approval remains `review`. VMware-Nutanix comparison content remains `draft` until it has vendor-document, contract, legal and publication review.

## Research source hierarchy

1. Primary: vendor release notes, product documentation, compatibility matrices, security advisories, standards bodies, CISA KEV and NVD.
2. Corroboration: official architecture guides, cloud provider documentation, public technical conference material and independently reproducible tests.
3. Field signal: anonymized discovery notes, operational questions and community discussions. These create research questions, never standalone public factual claims.

Every claim needs a URL, accessed date, exact version or effective date, intended scope, and a statement of what the source does not establish.

## Four-week editorial backlog

### Week 1: security consulting

1. Remote access inventory before ZTNA or SSL VPN decisions
2. Security policy exception register that operators can actually use
3. Firewall rule review: business service mapping before cleanup
4. Ransomware recovery exercise: the first 90-minute decision checklist
5. KEV-driven vulnerability prioritization without CVSS-only triage
6. Branch-to-cloud access path review for SASE planning
7. Identity, device and network controls: where responsibility changes
8. Logging requirements for incident investigation before tool selection
9. Third-party access onboarding and offboarding checks
10. Security PoC acceptance criteria that avoid feature-demo bias

### Week 2: infrastructure consulting

1. Capacity planning inputs that matter more than average utilisation
2. Server, storage and network dependencies to map before renewal
3. Infrastructure change window design for critical services
4. Backup, replication and DR: deciding the responsibility boundary
5. Cloud connectivity assumptions to test before migration
6. Operational ownership model for patching and incident response
7. Performance baseline capture before an architecture change
8. Infrastructure risk register for a modernization programme
9. Procurement questions that protect the operating model
10. PoC exit criteria for infrastructure decisions

### Week 3: virtualization and HCI migration

1. Virtualization migration discovery worksheet
2. Workload grouping for low-risk first migration waves
3. HCI capacity, fault domain and growth assumptions
4. VM migration rollback criteria before the change window
5. Backup and recovery validation during platform migration
6. Application owner sign-off checklist for migrated workloads
7. Hypervisor migration: network and identity dependencies
8. HCI operations handover: patching, expansion and failure response
9. Migration rehearsal scorecard
10. First 30-day stabilization plan after a virtualization cutover

### Week 4: VMware-Nutanix evaluation preparation

1. Internal evaluation scope and non-disclosure checklist
2. Workload fit questions before comparing platforms
3. Operations model comparison worksheet
4. Availability and recovery scenario design for a platform PoC
5. Migration runbook evidence checklist
6. Lifecycle, support and contract assumption register
7. Ecosystem integration test plan
8. Cost comparison assumptions that must be normalized
9. Decision log template for the evaluation committee
10. Public-safe summary rules and redaction checklist

## Publish gate

- At least two primary sources, or one primary source plus a labelled field-practice source.
- Source version/date and access date recorded.
- No customer name, logo, price, contract term, unsupported benchmark, confidential architecture or unapproved vendor claim.
- Practical decision question, scope, exclusions, checklist and related BLRO service are present.
- Technical reviewer and publication approver both sign off.
- Content schema, approval digest, content tests and production build pass.

## Metrics and decision rules

| Metric | Target | Corrective action |
| --- | --- | --- |
| Published insights | 14 per calendar week | Use reserve draft; do not bypass review |
| Primary-source coverage | 100 percent | Hold item in review |
| Review age | before the next publication day | Escalate to reviewer pool |
| Corrections after publication | zero material corrections | Archive, correct and document root cause |
| Insight to service CTA engagement | weekly trend | Rewrite weak topics around real decision questions |

## Authority

The researcher can draft and classify. Only the technical reviewer confirms technical accuracy. Only the publication approver may change public status. Vendor comparison material is private by default.
