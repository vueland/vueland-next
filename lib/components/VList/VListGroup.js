import "../../../src/components/VList/VListGroup.scss";
import { h, ref, computed, provide, inject, withDirectives, defineComponent, onBeforeUnmount, vShow } from "vue";
import { useColors } from "../../effects/use-colors";
import { elevationProps, useElevation } from "../../effects/use-elevation";
import { VIcon } from "../VIcon";
import { VListItem } from "./VListItem";
import { VListItemIcon } from "./index";
import { VExpandTransition } from "../transitions";
import { FaIcons } from "../../services/icons";
import { Sizes } from "../../services/sizes";
export const VListGroup = defineComponent({
  name: "v-list-group",
  props: {
    activeClass: {
      type: String,
      default: ""
    },
    appendIcon: {
      type: String,
      default: FaIcons.$expand
    },
    prependIcon: {
      type: String,
      default: ""
    },
    color: {
      type: String
    },
    disabled: Boolean,
    group: String,
    expanded: Boolean,
    noAction: Boolean,
    subGroup: Boolean,
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
    const refGroup = ref(null);
    const isActive = ref(false);
    const children = ref([]);
    const {
      groups,
      register,
      unRegister,
      listClick
    } = inject("groups");
    provide("subgroups", children);
    const subgroups = props.subGroup && inject("subgroups");
    const listGroup = {
      ref: refGroup,
      active: isActive
    };
    if (groups) register(listGroup);
    if (subgroups) subgroups.value.push(listGroup);

    if (!props.noAction && props.expanded) {
      requestAnimationFrame(onClick);
    }

    const classes = computed(() => ({
      "v-list-group": true,
      "v-list-group__sub-group": props.subGroup,
      "v-list-group--expanded": isActive.value && !props.noAction,
      [props.activeClass]: isActive.value,
      ...elevationClasses.value
    }));

    function onClick() {
      if (props.noAction) return;
      (groups === null || groups === void 0 ? void 0 : groups.value.length) && listClick(refGroup);
      children.value.length && children.value.forEach(it => it.active = false);
    }

    function genIcon(icon) {
      const propsData = {
        size: Sizes.small
      };
      return h(VIcon, propsData, {
        default: () => icon
      });
    }

    function genAppendIcon() {
      const slotIcon = slots.appendIcon && slots.appendIcon();
      const icon = !props.subGroup && !props.noAction ? props.appendIcon : false;
      if (!icon && !slotIcon || !props.subGroup && props.noAction) return null;
      const propsData = {
        class: "v-list-group__append-icon"
      };
      return h(VListItemIcon, propsData, {
        default: () => slotIcon || genIcon(icon)
      });
    }

    function genPrependIcon() {
      const icon = props.subGroup && !props.noAction ? FaIcons.$subgroup : props.prependIcon;
      const slotIcon = slots.prependIcon && slots.prependIcon();
      if (!icon && !slotIcon) return null;
      const propsData = {
        class: "v-list-group__prepend-icon"
      };
      return h(VListItemIcon, propsData, {
        default: () => slotIcon || genIcon(icon)
      });
    }

    function genGroupHeader() {
      const propsData = {
        class: {
          "v-list-group__header": !props.subGroup,
          "v-list-group__header--sub-group": props.subGroup
        },
        onClick
      };
      return h(VListItem, propsData, {
        default: () => [genPrependIcon(), slots.title && slots.title(), genAppendIcon()]
      });
    }

    function genItems() {
      const propsData = {
        class: "v-list-group__items"
      };
      return withDirectives(h("div", propsData, slots.default && slots.default()), [[vShow, isActive.value]]);
    }

    function genPropsData() {
      return {
        class: classes.value,
        ref: refGroup
      };
    }

    onBeforeUnmount(() => {
      unRegister(refGroup);
    });
    return () => {
      const items = slots.default && VExpandTransition(genItems());
      const header = slots.title && genGroupHeader();
      const propsData = props.color ? setTextColor(props.color, genPropsData()) : genPropsData();
      const children = [header, items];
      return h("div", propsData, children);
    };
  }

});
//# sourceMappingURL=VListGroup.js.map