const init = {
  transition: null,
  propSize: "",
  height: 0,
  width: 0
};

const resetStyles = el => {
  el.style[init.propSize] = "";
  el.style.transition = "";
};

const getChildrenSizes = el => {
  return Array.prototype.reduce.call(el.children, (acc, it) => {
    const height = getComputedStyle(it)[init.propSize];
    return acc += parseFloat(height);
  }, 0);
};

const setInitStyles = el => {
  init.transition = getComputedStyle(el).transition;
  init[init.propSize] = getChildrenSizes(el);
};

export const expandHooks = (expandedParentClass, x = false) => {
  return {
    onBeforeEnter(el) {
      init.propSize = x ? "width" : "height";
      el.style.transition = "";
    },

    onEnter(el) {
      setInitStyles(el);
      el.style[init.propSize] = "0";
      el.style.transition = init.transition;
      requestAnimationFrame(() => {
        el.style[init.propSize] = `${init[init.propSize]}px`;
      });

      if (expandedParentClass) {
        el.parentNode.classList.add(expandedParentClass);
      }
    },

    onAfterEnter(el) {
      el.parentNode.classList.remove(expandedParentClass);
      resetStyles(el);
    },

    onBeforeLeave(el) {
      setInitStyles(el);
    },

    onLeave(el) {
      el.style.transition = init.transition;
      el.style[init.propSize] = `${init[init.propSize]}px`;
      requestAnimationFrame(() => el.style[init.propSize] = "0");
    },

    onAfterLeave(el) {
      requestAnimationFrame(() => resetStyles(el));
    }

  };
};
//# sourceMappingURL=expand-transition.js.map