import * as components from './components/index';
import * as directives from './directives/index';
export class Vueland {
  constructor(options = null) {
    this.userOptions = {};
    this.userOptions = options;
  }

  install(app) {
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
    app.provide('$options', this.userOptions);
  }

}
Vueland.installed = false;
//# sourceMappingURL=library.js.map