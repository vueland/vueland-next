import { createVTransition } from './create-transition';
import { expandHooks } from './expand-transition';
import { fadeHooks } from './fade-transition';
export const VExpandTransition = createVTransition(expandHooks('expand-transition'));
export const VFadeTransition = createVTransition(fadeHooks('fade-transition'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90cmFuc2l0aW9ucy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQTtBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBRTdDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLGlCQUFpQixDQUNoRCxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FDakMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FDOUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQzdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVWVHJhbnNpdGlvbiB9IGZyb20gJy4vY3JlYXRlLXRyYW5zaXRpb24nXG5cbmltcG9ydCB7IGV4cGFuZEhvb2tzIH0gZnJvbSAnLi9leHBhbmQtdHJhbnNpdGlvbidcbmltcG9ydCB7IGZhZGVIb29rcyB9IGZyb20gJy4vZmFkZS10cmFuc2l0aW9uJ1xuXG5leHBvcnQgY29uc3QgVkV4cGFuZFRyYW5zaXRpb24gPSBjcmVhdGVWVHJhbnNpdGlvbihcbiAgZXhwYW5kSG9va3MoJ2V4cGFuZC10cmFuc2l0aW9uJylcbilcbmV4cG9ydCBjb25zdCBWRmFkZVRyYW5zaXRpb24gPSBjcmVhdGVWVHJhbnNpdGlvbihcbiAgZmFkZUhvb2tzKCdmYWRlLXRyYW5zaXRpb24nKVxuKVxuIl19