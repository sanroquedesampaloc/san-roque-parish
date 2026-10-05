import {type SchemaTypeDefinition} from 'sanity'

import {blockContent} from './objects/blockContent'
import {scheduleEntry} from './objects/scheduleEntry'

import {announcement} from './documents/announcement'
import {clergy} from './documents/clergy'
import {event} from './documents/event'
import {homily} from './documents/homily'
import {ministry} from './documents/ministry'
import {parishSettings} from './documents/parishSettings'
import {sacrament} from './documents/sacrament'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    blockContent,
    scheduleEntry,

    announcement,
    clergy,
    event,
    homily,
    ministry,
    parishSettings,
    sacrament,
  ],
}
