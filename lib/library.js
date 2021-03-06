import * as components from './components';
import * as directives from './directives';
export class Vueland {
  static installed = false;
  static options;

  constructor(options) {
    Vueland.options = options;
  }

  static install(app) {
    if (Vueland.installed) return;
    Vueland.installed = true;
    Object.keys(components).forEach(key => {
      if (key && components[key]) {
        const component = components[key];
        app.component(key, component);
      }
    });
    Object.keys(directives).forEach(key => {
      if (key && directives[key]) {
        app.directive(key, directives[key]);
      }
    });
    app.provide('$options', Vueland.options);
  }

}
//# sourceMappingURL=library.js.map