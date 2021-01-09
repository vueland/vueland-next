import * as components from './components/index';
import * as directives from './directives/index';
export class VueLand {
  install(Vue) {
    if (VueLand.installed) return;
    VueLand.installed = true;
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
VueLand.installed = false;
//# sourceMappingURL=library.js.map