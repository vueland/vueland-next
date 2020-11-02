import * as components from './components/index';
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
  }

}
VueLand.installed = false;
//# sourceMappingURL=library.js.map