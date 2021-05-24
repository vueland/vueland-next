import "../../../src/components/VList/VListGroup.scss";
import { h, ref, computed, withDirectives, defineComponent, onBeforeUnmount, onMounted, vShow } from 'vue';
import { useIcons } from '../../effects/use-icons';
import { useColors } from '../../effects/use-colors';
import { useGroup } from '../../effects/use-group';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { VIcon } from '../VIcon';
import { VListItem } from './VListItem';
import { VListItemIcon } from './index';
import { VExpandTransition } from '../transitions';
export const VListGroup = defineComponent({
  name: 'v-list-group',
  props: {
    activeClass: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    dark: Boolean,
    multiple: Boolean,
    group: String,
    disabled: Boolean,
    active: Boolean,
    noAction: Boolean,
    expanded: Boolean,
    subGroup: Boolean,
    value: Boolean,
    modelValue: Boolean,
    ...elevationProps()
  },

  setup(props, {
    slots
  }) {
    const {
      setTextColor
    } = useColors();
    const {
      elevationClasses
    } = useElevation(props);
    const {
      icons,
      iconSize
    } = useIcons('md');
    const {
      injectGroup,
      provideGroup
    } = useGroup();
    const refGroup = ref(null);
    const isActive = ref(false);
    const childrenGroups = ref([]);
    provideGroup('subgroups');
    provideGroup('selected');
    provideGroup('items');
    const groups = injectGroup('list-groups');
    const subgroups = props.subGroup && injectGroup('subgroups');
    const listGroup = genListGroupParams();
    const isNotActive = computed(() => {
      return !props.subGroup && !props.active;
    });
    const classes = computed(() => ({
      'v-list-group': true,
      'v-list-group__sub-group': props.subGroup,
      'v-list-group--active': isActive.value,
      'v-list-group--no-action': props.noAction,
      [props.activeClass]: isActive.value,
      ...elevationClasses.value
    }));

    function onClick() {
      if (isNotActive.value) return;
      if (groups) groups.listClick(listGroup);

      if (childrenGroups.value.length) {
        childrenGroups.value.forEach(it => it.active = false);
      }
    }

    function genListGroupParams() {
      return {
        ref: refGroup,
        active: isActive
      };
    }

    function genIcon(icon) {
      const propsData = {
        size: iconSize
      };
      return h(VIcon, propsData, {
        default: () => icon
      });
    }

    function genAppendIcon() {
      const slotAppendIcon = slots.appendIcon && slots.appendIcon();
      const propsAppendIcon = !props.subGroup ? icons.$expand : props.appendIcon;
      if (!propsAppendIcon && !slotAppendIcon) return null;
      const propsData = {
        class: 'v-list-group__append-icon'
      };
      return h(VListItemIcon, propsData, {
        default: () => slotAppendIcon || genIcon(propsAppendIcon)
      });
    }

    function genPrependIcon() {
      const icon = props.subGroup ? icons.$subgroup : props.prependIcon;
      const slotIcon = slots.prependIcon && slots.prependIcon();
      if (!icon && !slotIcon) return null;
      const propsData = {
        class: 'v-list-group__prepend-icon'
      };
      return h(VListItemIcon, propsData, {
        default: () => slotIcon || genIcon(icon)
      });
    }

    function genGroupHeader() {
      const propsData = {
        class: {
          'v-list-group__header': true
        },
        onClick
      };
      return h(VListItem, propsData, {
        default: () => [genPrependIcon(), slots.title && slots.title(), genAppendIcon()]
      });
    }

    function genItems() {
      const propsData = {
        class: 'v-list-group__items'
      };
      return withDirectives(h('div', propsData, slots.default && slots.default()), [[vShow, isActive.value]]);
    }

    onMounted(() => {
      if (groups) groups.register(listGroup);
      if (subgroups) subgroups.register(listGroup);
      if (isNotActive.value) isActive.value = true;
    });
    onBeforeUnmount(() => {
      groups.unregister(listGroup);
    });
    return () => {
      const items = slots.default && VExpandTransition(genItems());
      const header = slots.title && genGroupHeader();
      const propsData = {
        class: classes.value,
        ref: refGroup
      };
      const children = [header, items];
      const color = props.dark ? 'white' : props.color;
      return h('div', color ? setTextColor(color, propsData) : propsData, children);
    };
  }

});
//# sourceMappingURL=VListGroup.js.map