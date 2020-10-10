import * as components from './components/index';
export class Retn {
  install(Vue) {
    if (Retn.installed) return;
    Retn.installed = true;
    Object.keys(components).forEach(key => {
      if (key && components[key]) {
        const component = components[key];
        Vue.component(key, component);
      }
    });
  }

}
Retn.installed = false;
//# sourceMappingURL=library.js.map