import { createVTransition } from './create-transition'

import { expandHooks } from './expand-transition'

export const VExpandTransition = createVTransition(expandHooks('expand-transition'))
