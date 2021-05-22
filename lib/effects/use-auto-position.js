import { ref, reactive, computed } from 'vue';
export function autoPositionProps() {
  return {
    positionX: {
      type: Number,
      default: 0
    },
    positionY: {
      type: Number,
      default: 0
    }
  };
}
export function useAutoPosition(props) {
  const dimensions = reactive({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    content: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    pageYOffset: 0,
    pageWidth: 0
  });
  const contentRef = ref(null);
  const offset = +props.offsetY || 10;
  let activator;
  let content;
  let diff;
  let minDiff;

  function getBoundedClientRect(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  }

  const isAbsolutePositioned = computed(() => {
    return props.positionY || props.positionX;
  });

  function getInnerHeight() {
    if (!window) return 0;
    return innerHeight || document.documentElement.clientHeight;
  }

  function getOffsetTop() {
    if (!window) return 0;
    return pageYOffset || document.documentElement.scrollTop;
  }

  function getOffsetLeft() {
    if (!window) return 0;
    return pageXOffset || document.documentElement.scrollLeft;
  }

  function getContentAbsoluteBottom() {
    return dimensions.content.height + props.positionY + getOffsetTop();
  }

  function getContentBottom() {
    return dimensions.content.height + dimensions.activator.top;
  }

  function calcDiffs() {
    const pageHeight = getOffsetTop() + getInnerHeight() - offset;
    const contentBottom = isAbsolutePositioned.value ? getContentAbsoluteBottom() : getContentBottom();
    minDiff = dimensions.content.height / 100 * 10;
    return pageHeight - contentBottom;
  }

  function calcLeftPosition() {
    if (props.positionX) return props.positionX + getOffsetLeft();
    return dimensions.activator.left;
  }

  function calcTopPosition() {
    diff = calcDiffs();

    if (props.positionY) {
      if (diff <= minDiff) return props.positionY + getOffsetTop() + diff;
      return props.positionY + getOffsetTop();
    }

    if (props.bottom) {
      if (diff <= minDiff) return dimensions.activator.top - dimensions.content.height;
      return dimensions.activator.top + dimensions.activator.height;
    }

    if (diff <= minDiff) return dimensions.activator.top + diff;
    return dimensions.activator.top;
  }

  function snapShot(cb) {
    requestAnimationFrame(() => {
      if (!content || content.style.display !== 'none') return cb();
      content.style.display = 'inline-block';
      cb();
      content.style.display = 'none';
    });
  }

  function updateDimensions() {
    return new Promise(resolve => {
      snapShot(() => {
        activator && setActivatorDimensions();
        content && setContentDimensions();
        resolve();
      });
    });
  }

  function setActivatorDimensions() {
    dimensions.activator = getBoundedClientRect(activator);
    dimensions.activator.height = activator.offsetHeight;
    dimensions.activator.top = dimensions.activator.top + getOffsetTop();
    dimensions.activator.left = dimensions.activator.left + getOffsetLeft();
  }

  function setContentDimensions() {
    const rect = activator ? dimensions.activator : getBoundedClientRect(content);
    dimensions.content.height = content.offsetHeight;
    dimensions.content.top = calcTopPosition();
    dimensions.content.left = calcLeftPosition();
    dimensions.content.width = rect.width;
  }

  function setDimensions(activatorEl) {
    if (!activator && !content) {
      activator = activatorEl;
      content = contentRef.value;
    }

    return updateDimensions();
  }

  return {
    dimensions,
    contentRef,
    setDimensions,
    updateDimensions
  };
}
//# sourceMappingURL=use-auto-position.js.map