import {type SchemaTypeDefinition} from 'sanity'

import {blockContent} from './objects/blockContent'
import {scheduleEntry} from './objects/scheduleEntry'
import {columbariumNicheOption} from './objects/columbariumNicheOption'
import {columbariumInquiryStep} from './objects/columbariumInquiryStep'
import {columbariumFaq} from './objects/columbariumFaq'

import {announcement} from './documents/announcement'
import {clergy} from './documents/clergy'
import {columbariumPage} from './documents/columbariumPage'
import {event} from './documents/event'
import {faq} from './documents/faq'
import {homily} from './documents/homily'
import {ministry} from './documents/ministry'
import {parishSettings} from './documents/parishSettings'
import {sacrament} from './documents/sacrament'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    blockContent,
    scheduleEntry,
    columbariumNicheOption,
    columbariumInquiryStep,
    columbariumFaq,

    announcement,
    clergy,
    columbariumPage,
    event,
    faq,
    homily,
    ministry,
    parishSettings,
    sacrament,
  ],
}
