import "../../../src/components/VList/VListItem.scss";
import { h, computed, defineComponent } from 'vue';
export const VListItem = defineComponent({
  name: 'v-list-item',
  props: {
    value: String,
    modelValue: [String, Number],
    activeClass: String,
    active: Boolean
  },
  emits: ['update:active', 'active'],

  setup(props, {
    slots,
    emit
  }) {
    const classes = computed(() => ({
      'v-list-item': true,
      'v-list-item--active': !!props.activeClass,
      [props.activeClass]: !!props.activeClass && props.active
    }));

    function onClick() {
      if (props.activeClass) {
        emit('update:active', !props.active);
        emit('active', !props.active);
      }
    }

    return () => {
      const content = props.value || props.modelValue || slots.default && slots.default();
      const propsData = {
        class: classes.value,
        onClick
      };
      return h('div', propsData, content);
    };
  }

});
//# sourceMappingURL=VListItem.js.map