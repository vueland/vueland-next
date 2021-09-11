import "../../../src/components/VList/VListItem.scss";
import { h, ref, inject, computed, watch, defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { useToggle } from '../../effects/use-toggle';
export const VListItem = defineComponent({
  name: 'v-list-item',
  props: {
    activeClass: {
      type: String,
      default: ''
    },
    dark: Boolean,
    inactive: Boolean,
    activator: Boolean,
    active: Boolean,
    noAction: Boolean
  },
  emits: ['click'],

  setup(props, {
    slots,
    emit
  }) {
    const {
      isActive
    } = useToggle(props);
    const handlers = inject('list-handlers');
    const listTypes = inject('list-types');
    const listItems = inject('list-items');
    const groupItems = listTypes.isInGroup && inject('group-items');
    const itemRef = ref(null);
    const item = {
      ref: itemRef,
      active: isActive
    };
    listTypes.isInList = !listTypes.isInGroup;
    watch(() => props.active, to => isActive.value = to, {
      immediate: true
    });
    const classes = computed(() => ({
      'v-list-item': true,
      'v-list-item--active': isActive.value,
      'v-list-item--activator': props.activator,
      [props.activeClass]: isActive.value && !!props.activeClass
    }));

    function onClick() {
      if (props.noAction) return;

      if (props.activator) {
        isActive.value = !isActive.value;
      }

      if (listTypes.isInGroup && !props.activator) {
        handlers.itemClick(groupItems.items, item);
      }

      if (!props.activator && listTypes.isInList) {
        handlers.itemClick(listItems.items, item);
      }

      emit('click');
    }

    onMounted(() => {
      if (groupItems && groupItems.parent.value === itemRef.value.parentNode.parentNode) {
        !props.activator && (groupItems === null || groupItems === void 0 ? void 0 : groupItems.items.value.push(item));
      }

      if (listTypes.isInList && listItems) listItems.items.value.push(item);
    });
    onBeforeUnmount(() => {
      if (listTypes.isInGroup) {
        groupItems.items.value = groupItems.items.value.filter(it => it !== item);
      }

      if (listTypes.isInList) {
        listItems.items.value = listItems.items.value.filter(it => it !== item);
      }
    });
    return () => {
      const content = slots.default && slots.default({
        active: isActive.value
      });
      const propsData = {
        class: classes.value,
        ref: itemRef,
        onClick
      };
      return h('div', propsData, content);
    };
  }

});
//# sourceMappingURL=VListItem.js.map