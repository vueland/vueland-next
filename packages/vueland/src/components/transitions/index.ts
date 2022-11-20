import { createTransition } from './helpers'

import { expandHooks } from './expand-transition'

export const ExpandTransition = createTransition(expandHooks('expand-transition'))
