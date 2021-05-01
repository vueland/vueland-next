import * as components from './components/index';
import * as directives from './directives/index';

class Vueland {
  install(Vue) {
    if (Vueland.installed) return;
    Vueland.installed = true;
    Object.keys(components).forEach(key => {
      if (key && components[key]) {
        const component = components[key];
        Vue.component(key, component);
      }
    });
    Object.keys(directives).forEach(key => {
      if (key && directives[key]) {
        Vue.directive(key, directives[key]);
      }
    });
  }

}

Vueland.installed = false;
export const library = new Vueland();
//# sourceMappingURL=library.js.map