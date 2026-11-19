# Speech & Language Development Hub — Content Sources

**Content reviewed against primary sources:** 2026-11-19
**Clinical review status:** not reviewed by a clinician. The UI states this wherever content is shown.

The machine-readable registry lives in `lib/speech-delay/sources.ts`; every article, activity and milestone cites it by `id`. Nothing below is invented: each statement was copied from the page listed, and the page's own scope is recorded so a population-level finding is never turned into a promise for one child.

## 1. Source registry

| id | Title | Publisher | URL | Accessed |
| --- | --- | --- | --- | --- |
| `cdc-2y` | Milestones by 2 Years | CDC — Learn the Signs. Act Early. | https://www.cdc.gov/act-early/milestones/2-years.html | 2026-11-19 |
| `cdc-30m` | Milestones by 30 Months | CDC — Learn the Signs. Act Early. | https://www.cdc.gov/act-early/milestones/30-months.html | 2026-11-19 |
| `cdc-3y` | Milestones by 3 Years | CDC — Learn the Signs. Act Early. | https://www.cdc.gov/act-early/milestones/3-years.html | 2026-11-19 |
| `cdc-4y` | Milestones by 4 Years | CDC — Learn the Signs. Act Early. | https://www.cdc.gov/act-early/milestones/4-years.html | 2026-11-19 |
| `cdc-5y` | Milestones by 5 Years | CDC — Learn the Signs. Act Early. | https://www.cdc.gov/act-early/milestones/5-years.html | 2026-11-19 |
| `asha-lle` | Late Language Emergence (Practice Portal) | ASHA | https://www.asha.org/practice-portal/clinical-topics/late-language-emergence/ | 2026-11-19 |
| `aap-healthychildren` | Language Delays in Toddlers: Information for Parents | AAP — HealthyChildren.org | https://www.healthychildren.org/English/ages-stages/toddler/Pages/Language-Delay.aspx | 2026-11-19 |
| `nidcd-milestones` | Speech and Language Developmental Milestones | NIDCD | https://www.nidcd.nih.gov/health/speech-and-language | 2026-11-19 |
| `roberts-kaiser-2011` | The Effectiveness of Parent-Implemented Language Interventions: A Meta-Analysis | Roberts & Kaiser, 2011 | https://pubmed.ncbi.nlm.nih.gov/21478280/ | 2026-11-19 |
| `roberts-2019` | Association of Parent Training With Child Language Development: A Systematic Review and Meta-analysis | Roberts et al., 2019 | https://pmc.ncbi.nlm.nih.gov/articles/PMC6537769/ | 2026-11-19 |
| `asha-aac-ei` | Augmentative and Alternative Communication in Early Intervention | ASHA | https://www.asha.org/practice/early-intervention-provider-support/augmentative-and-alternative-communication-in-early-intervention/ | 2026-11-19 |

## 2. Claim → source matrix

| Claim as shown to parents | Source(s) | Source statement (quoted / closely paraphrased) | Scope limit recorded |
| --- | --- | --- | --- |
| Milestone = something most children (75 %+) can do by an age; it is surveillance, not a test. | `cdc-2y` | "Developmental milestones are things most children (75% or more) can do by a certain age." | General US population; checklist, not diagnostic instrument. |
| At 2 years: points to things in a book when asked; says at least two words together; points to two body parts; uses gestures beyond waving/pointing. | `cdc-2y` | "Points to things in a book when you ask, like 'Where is the bear?'"; "Says at least two words together, like 'More milk.'"; "Points to at least two body parts…"; "Uses more gestures than just waving and pointing…" | Same as above. |
| At 30 months: about 50 words; two-word combinations with an action word; names things in a book; uses "I/me/we"; follows two-step instructions. | `cdc-30m` | "Says about 50 words"; "Says two or more words together, with one action word, like 'Doggie run'"; "Names things in a book when you point and ask, 'What is this?'"; "Says words like 'I,' 'me,' or 'we'"; "Follows two-step instructions…" | Word counts are parent-reported. |
| At 3 years: two back-and-forth exchanges; asks who/what/where/why; names actions in pictures; says first name; mostly understandable. | `cdc-3y` | Verbatim checklist items, see `milestones.ts`. | General population. |
| At 4 years: sentences of four or more words; words from songs/stories; talks about one thing that happened; answers "what is a coat for?" | `cdc-4y` | Verbatim checklist items. | General population. |
| At 5 years: tells a story with two events; answers questions about a story; keeps a conversation beyond three turns; recognises simple rhymes. | `cdc-5y` | Verbatim checklist items. | General population. |
| "Late language emergence" is commonly operationalised as <50 expressive words and no two-word combinations at 24 months. | `asha-lle` | "An extensively used set of criteria for LLE is an expressive vocabulary of fewer than 50 words and no two-word combinations by 24 months of age." | Monolingual English-speaking children; **not** a standalone diagnostic criterion, and not directly transferable to bilingual children or other language contexts. |
| Children with LLE remain at risk, so early assessment and periodic monitoring matter — waiting is not neutral. | `asha-lle` | "Because children with late language emergence (LLE) remain at risk for later language and literacy problems, early assessment and periodic monitoring are essential." | Risk at population level, not a prediction for an individual child. |
| Hearing assessment is part of the initial pathway. | `asha-lle`, `nidcd-milestones` | Typical pathway includes "a complete audiologic assessment"; NIDCD describes delay as possibly caused by hearing loss or by a speech/language disorder. | — |
| Listed risk factors are statistical, not causal for one child. | `asha-lle` | Risk factors named by ASHA include male sex, family history, low birth weight/preterm birth, and 12-month language ability. | Population-level association. |
| Parent-implemented language intervention has supportive evidence with variable effect sizes. | `roberts-kaiser-2011` | Meta-analysis of 18 studies; positive effects on receptive and expressive language, effect sizes varying by outcome measure. | Heterogeneous studies, mostly young children with language delay; not a guarantee for an individual child. |
| Parent training is associated with moderate child language gains and larger gains in parent strategy use. | `roberts-2019` | Systematic review/meta-analysis of 76 studies (5,848 participants); association between parent training and child language development, stronger association with improved parent strategies. | Observational/association language matters; dose and quality vary. |
| AAC does not hinder speech development. | `asha-aac-ei` | ASHA states AAC does not impede speech development, and that AAC may be used temporarily or long-term as part of SLP services. | Do not read as "AAC replaces speech therapy"; complex systems need SLP guidance. |
| Two languages at home do not cause language delay. | `asha-lle`, `nidcd-milestones` | LLE criteria are defined for monolingual children, so bilingual development must be evaluated across all languages rather than blamed for delay. | Module states this explicitly and refers concerns to assessment. |
| Seek evaluation for lost skills, hearing concerns, comprehension or social-communication concerns. | `asha-lle`, `aap-healthychildren`, `nidcd-milestones` | All three describe referral/assessment pathways when caregivers or clinicians have concerns. | — |

## 3. Editorial rules applied

1. **Evidence labels are per strategy, not per game.** `supported_caregiver_strategy` marks activities built on strategies studied in parent-implemented intervention (responsive interaction, expectant pause, expansion/recast, choice-making, dialogic reading). `general_developmental_play` marks ordinary play ideas that are developmentally sensible but were not trialled as a standalone protocol. The label text says exactly that.
2. **No `requires_clinician_guidance` activity is shipped.** The module teaches no articulation hierarchy, motor-speech protocol or complex AAC system, so nothing earned that label. Speech-sound and complex-AAC needs are routed to a speech-language therapist in the education and safety pages instead. This is deliberate, not an omission.
3. **No population statistic is translated into a personal promise.** Effect sizes are described qualitatively ("bervariasi", "asosiasi moderat"); no percentage chance of improvement appears anywhere.
4. **No invented citations, quotes, statistics or endorsements.** Every quote in `sources.ts` was copied from the page on 2026-11-19.
5. **Review dates are visible.** `MEDICAL_CONTENT_REVIEWED_AT` is rendered on the education index, article footers, source lists and the resources page, together with "belum ditinjau oleh klinisi".

## 4. How to update content

- Edit `lib/speech-delay/sources.ts` for a new or revised source; keep `accessedAt`, `reviewedAt`, `supports`, `statement` and `scope`.
- Edit `lib/speech-delay/milestones.ts` for CDC wording (keep `sourceText` verbatim in English).
- Edit `lib/speech-delay/education.ts` and `activities-a.ts` / `activities-b.ts` for prose.
- Run `npm test` — it fails if any article, activity or milestone cites an unregistered source, if ids/slugs duplicate, or if an activity loses its dialogue, steps or observations.
