import { createVTransition } from './create-transition'

import { expandHooks } from './expand-transition'
import { fadeHooks } from './fade-transition'
import { scaleInHooks } from './scale-in-transition'

export const VExpandTransition = createVTransition(expandHooks('expand-transition'))
export const VFadeTransition = createVTransition(fadeHooks('fade-transition'))
export const VScaleInTransition = createVTransition(scaleInHooks('scale-in-transition'))
