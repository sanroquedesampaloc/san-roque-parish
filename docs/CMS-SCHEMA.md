# CMS Content Model

## Document Types

| Type | Description | Slug | Ordered |
|------|------------|------|---------|
| `announcement` | Parish announcements and news | yes | by publishedAt |
| `event` | Parish events with dates and registration | yes | by startDate |
| `homily` | Recorded homilies with video links | yes | by date |
| `ministry` | Parish ministries and organizations | yes | by displayOrder |
| `clergy` | Priests and parish staff | no | by displayOrder |
| `sacrament` | Sacrament information and requirements | yes | by displayOrder |
| `parishSettings` | Global parish configuration (singleton) | no | n/a |

## Reusable Object Types

| Type | Fields | Used In |
|------|--------|---------|
| `blockContent` | Portable Text (headings, bold, italic, lists, links, images) | Body/description fields across all content types |
| `scheduleEntry` | label, time, note | Mass schedules, confession, office hours, sacrament schedules |

## Studio Organization

```
Parish
├── Parish Settings (singleton editor)
├── Clergy
├── Ministries
└── Sacraments

Content
├── Announcements
├── Events
└── Homilies
```

## Singleton: parishSettings

- Fixed document ID: `parishSettings`
- Hidden from "new document" creation
- Fields grouped into tabs: General, Contact, Schedules, Social & Links, Other
- Query: `*[_id == "parishSettings"][0]`

## Announcement Categories

`general`, `liturgical`, `community`, `youth`, `outreach`

## Event Statuses

`upcoming`, `ongoing`, `completed`, `cancelled`
