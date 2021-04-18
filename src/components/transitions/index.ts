import { createVTransition } from "./create-transition";

import { expandHooks } from "./expand-transition";
import { fadeHooks } from "./fade-transition";

export const VExpandTransition = createVTransition(
  expandHooks("expand-transition")
);
export const VFadeTransition = createVTransition(fadeHooks("fade-transition"));
