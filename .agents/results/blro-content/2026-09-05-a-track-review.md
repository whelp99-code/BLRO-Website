# 2026-09-05 KST A-track Korean review insight drafts

Timezone: KST. Confirmation date used in MDX: 2026-09-05.
Branch: `cursor/ko-review-insights-2026-09-05-a-f1ec` from latest `origin/main` (`7e832cf`). Did not stack onto open PRs #8–#19.

## Rotation

- Today areas: security, server-virtualization, HCI, VDI, SASE
- Not written: B-track (AI / cloud / infra / backup / observability)
- Cloud vendor (AWS/Azure/GCP) slots this round: 0

## GET verification (2026-09-05)

User-Agent browser + curl -L. Rejected login-thin, empty JS shell, Loading-only, and HTTP 403 as evidence.

### Security (jfrog-artifactory-cve-2026-82329-kev)

| URL | HTTP | Readable | Notes |
| --- | --- | --- | --- |
| https://www.cisa.gov/news-events/alerts/2026/09/02/cisa-adds-seven-known-exploited-vulnerabilities-catalog | 403 | no | Akamai Access Denied. Not cited. |
| https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-82329 | 403 | no | Not cited. |
| https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json | 200 | yes | catalogVersion 2026.09.04. CVE-2026-82329 dateAdded 2026-09-02, dueDate 2026-09-05, forensicTriage Yes, ransomware Unknown. |
| https://cveawg.mitre.org/api/cve/CVE-2026-82329 | 200 | yes | CWE-287, default config, CVSS 9.8, lessThan ranges, KEV 2026-09-02. |
| https://docs.jfrog.com/releases/docs/jfrog-security-advisories | 200 | yes | HTML cited. `.md` sibling is the same advisory (counts as one source). Cloud fortified; Self-Hosted fixed builds listed. Advisory table quirks vs CVE lessThan noted in draft. |
| https://www.cyber.gc.ca/en/alerts-advisories/jfrog-security-advisory-av26-867 | 200 | yes | AV26-867 Update 1, CISA KEV 2026-09-02. |

nvd.nist.gov HTML not used.

### Server virtualization (vsphere-8-vlcm-baselines-deprecated-images)

All Broadcom URLs HTTP 200 with readable TechDocs/KB text. Paths match GET character-for-character.

### HCI (vsan-hci-max-cluster-type-no-convert)

Preferred Dell VxRail vLCM-before-9.x pages were specified as 403; not fetched as evidence. Nutanix portal skipped as login-thin. Did not rewrite Azure Local Repair-Server.

Substitute (same category): vSAN HCI vs vSAN Max cluster type, no in-place convert.

| URL | HTTP | Readable |
| --- | --- | --- |
| .../sharing-remote-vsan-datastores-with-hci-mesh.html | 200 | yes |
| .../configure-a-cluster-for-vsan-using-the-vsphere-client.html | 200 | yes |
| .../view-remote-vsan-datastores.html | 200 | yes |

Guessed paths that 404'd (not cited): characteristics-of-a-vsan-cluster.html, before-creating-a-vsan-cluster.html, what-is-virtual-san.html, enable-vsan-on-an-existing-cluster.html, create-a-vsan-cluster.html.

### VDI (citrix-cvad-2607-edt-mtu-rediscovery)

2607-ltsr paths (apps-desktops, not apps-and-desktops). HTTP 200: whats-new, enlightened-data-transport, hdx-registry-settings, ica-policy-settings. Guessed `edt-mtu-discovery.html` was 404 and was not cited.

### SASE (prisma-access-panorama-mt-to-scm-cutoff)

All three preferred Palo Alto URLs HTTP 200 with readable document text.

## Written slugs

1. jfrog-artifactory-cve-2026-82329-kev — Self-Hosted default-config Artifactory: upgrade to branch-fixed build this week; Cloud already fortified.
2. vsphere-8-vlcm-baselines-deprecated-images — baseline clusters must plan irreversible image switch before relying on future ESX major upgrades.
3. vsan-hci-max-cluster-type-no-convert — choose HCI vs Max at creation; no in-place convert; no workload VMs on Max.
4. citrix-cvad-2607-edt-mtu-rediscovery — set MTU Rediscovery Static/Dynamic after Session Reliability + Workspace app Windows 2607+; remove registry leftover.
5. prisma-access-panorama-mt-to-scm-cutoff — greenfield MT after 2026-04-15 uses SCM; existing Panorama MT stays; plugin ≥5.2 before 2026-04-30; SCM migration one-way.

## Skipped

- Preferred CISA HTML alert/catalog pages (403).
- All slugs already on main or in open PRs #8–#19, including 2026-09-03 A and 2026-09-04 B topics and the hard-skip list.
- VxRail vLCM-before-9.x (403 / overlap with existing vxrail-*).
- Azure Local / AVD / additional Citrix / Prisma / vxrail slugs already present.
- B-track topics.

## Publication gate

- New files only under content/insights/ko/
- status: review; updatedAt: 2026-09-05; locale: ko
- public-approvals.json, approved/public MDX, homepage, Sangfor Korea CEO copy: untouched
- No merge, deploy, or public approve
- CTA: mailto:jm.park@blro.co.kr only. Does not claim /contact intake works.

## Next

B-track (AI · cloud · infra · backup/DR · observability). Do not repeat these five slugs or #8–#19 slugs.
