import { createVTransition } from './create-transition'

import { expandAnimation } from './expand-transition'

export const VExpandTransition = createVTransition(expandAnimation('expand-transition'))