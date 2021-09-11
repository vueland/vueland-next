"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDataTableFooter = void 0;

require("../../../src/components/VDataTable/VDataTableFooter.scss");

var _vue = require("vue");

var _VIcon = require("../VIcon");

var _VButton = require("../VButton");

var _VSelect = require("../VSelect");

var _useColors2 = require("../../effects/use-colors");

var _useIcons2 = require("../../effects/use-icons");

var VDataTableFooter = (0, _vue.defineComponent)({
  name: 'v-data-table-footer',
  props: {
    pages: Number,
    page: Number,
    firstOnPage: Number,
    lastOnPage: Number,
    pageCorrection: Number,
    rowsLength: Number,
    rowsOnPage: Number,
    options: Object
  },
  emits: ['last-page', 'correct-page', 'select-rows-count', 'next-page', 'prev-page'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor,
        setBackground = _useColors.setBackground;

    var _useIcons = (0, _useIcons2.useIcons)('xs'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var paginationDisplayText = (0, _vue.computed)(function () {
      return "".concat(props.firstOnPage, " - ").concat(props.lastOnPage, "\n        of ").concat(props.rowsLength);
    });
    var isLastPage = (0, _vue.computed)(function () {
      return props.page >= props.pages;
    });
    (0, _vue.watch)(function () {
      return isLastPage.value;
    }, function (to) {
      return to && emit('last-page');
    });

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return;
      var event = isNext ? 'next-page' : 'prev-page';
      emit(event, isNext ? 1 : -1);
    }

    function genPaginationButton() {
      var _props$options, _props$options$pagina;

      var isNext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var btnColor = ((_props$options = props.options) === null || _props$options === void 0 ? void 0 : (_props$options$pagina = _props$options.pagination) === null || _props$options$pagina === void 0 ? void 0 : _props$options$pagina.buttonsColor) || (props.options.dark ? 'white' : 'primary');
      var disableIf = isNext && props.lastOnPage >= props.rowsLength || !isNext && props.firstOnPage === 1;
      var propsData = {
        width: 42,
        color: btnColor,
        text: props.options.dark,
        elevation: 3,
        disabled: disableIf,
        onClick: function onClick() {
          return changeTableRowsPage(isNext);
        }
      };
      return (0, _vue.h)(_VButton.VButton, propsData, {
        "default": function _default() {
          return (0, _vue.h)(_VIcon.VIcon, {
            icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
            color: props.options.dark ? 'white' : '',
            size: iconSize
          });
        }
      });
    }

    function genPaginationPageDisplay() {
      var _props$options2, _props$options2$pagin;

      var displayColor = ((_props$options2 = props.options) === null || _props$options2 === void 0 ? void 0 : (_props$options2$pagin = _props$options2.pagination) === null || _props$options2$pagin === void 0 ? void 0 : _props$options2$pagin.displayColor) || (props.options.dark ? 'white' : 'blue lighten-1');
      var propsData = {
        width: 42,
        style: {
          margin: '0 10px'
        },
        color: displayColor,
        text: props.options.dark,
        elevation: 3
      };
      return (0, _vue.h)(_VButton.VButton, propsData, {
        "default": function _default() {
          return props.page;
        }
      });
    }

    function genRowsCountSelect() {
      var propsData = {
        items: props.options.rowsPerPageOptions,
        dark: props.options.dark,
        listColor: props.options.color,
        value: props.rowsOnPage,
        onSelect: function onSelect(e) {
          return emit('select-rows-count', e);
        }
      };
      return (0, _vue.h)(_VSelect.VSelect, propsData);
    }

    function genRowsCountSelectCaption() {
      var _props$options3;

      var propsData = {
        "class": 'v-data-table__pagination-label'
      };
      var color = props.options.dark ? 'white' : '';
      return (0, _vue.h)('span', color ? setTextColor(color, propsData) : propsData, ((_props$options3 = props.options) === null || _props$options3 === void 0 ? void 0 : _props$options3.rowsPerPageText) || 'Rows per page');
    }

    function genRowsCountSelectBlock() {
      return (0, _vue.h)('div', {
        "class": 'v-data-table__pagination-select'
      }, [genRowsCountSelectCaption(), genRowsCountSelect()]);
    }

    function genPagesCountDisplay() {
      var propsData = {
        "class": 'v-data-table__pagination-pages'
      };
      var color = props.options.dark ? 'white' : '';
      props.pageCorrection && emit('correct-page', -props.pageCorrection);
      return (0, _vue.h)('div', color ? setTextColor(color, propsData) : propsData, props.rowsLength && slots.paginationText && slots.paginationText() || props.rowsLength && paginationDisplayText.value || '-');
    }

    function genPaginationButtonsBlock() {
      return (0, _vue.h)('div', {
        "class": {
          'v-data-table__pagination-route': true
        }
      }, [genPaginationButton(), genPaginationPageDisplay(), genPaginationButton(true)]);
    }

    function genPaginationBlock() {
      return (0, _vue.h)('div', {
        "class": 'v-data-table__pagination'
      }, [genRowsCountSelectBlock(), genPagesCountDisplay(), genPaginationButtonsBlock()]);
    }

    return function () {
      var _props$options4;

      var propsData = {
        "class": {
          'v-data-table__footer': true
        }
      };
      return (0, _vue.h)('div', (_props$options4 = props.options) !== null && _props$options4 !== void 0 && _props$options4.color ? setBackground(props.options.color, propsData) : propsData, genPaginationBlock());
    };
  }
});
exports.VDataTableFooter = VDataTableFooter;
//# sourceMappingURL=VDataTableFooter.js.map