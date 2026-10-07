import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('San Roque Parish')
    .items([
      S.listItem()
        .id('parish')
        .title('Parish')
        .child(
          S.list()
            .title('Parish')
            .items([
              S.listItem()
                .title('Parish Settings')
                .child(
                  S.document()
                    .schemaType('parishSettings')
                    .documentId('parishSettings')
                    .title('Parish Settings'),
                ),
              S.documentTypeListItem('clergy').title('Clergy'),
              S.documentTypeListItem('ministry').title('Ministries'),
              S.documentTypeListItem('sacrament').title('Sacraments'),
              S.documentTypeListItem('faq').title('FAQs'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id('content')
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('announcement').title('Announcements'),
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('homily').title('Homilies'),
            ]),
        ),
    ])
