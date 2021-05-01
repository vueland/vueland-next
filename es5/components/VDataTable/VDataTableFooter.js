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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VDataTableFooter = (0, _vue.defineComponent)({
  name: 'v-data-table-footer',
  props: _objectSpread({
    dark: Boolean,
    pages: Number,
    page: Number,
    rowsPerPage: Number,
    tableRowsCount: Number,
    allRowsCount: Number,
    counts: Array
  }, (0, _useColors2.colorProps)()),
  emits: ['last-page', 'reset-page', 'select', 'next', 'prev'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useColors = (0, _useColors2.useColors)(),
        setTextColor = _useColors.setTextColor;

    var _useIcons = (0, _useIcons2.useIcons)('xs'),
        icons = _useIcons.icons,
        iconSize = _useIcons.iconSize;

    var lastOnPage = (0, _vue.computed)(function () {
      var page = props.page,
          tableRowsCount = props.tableRowsCount,
          rowsPerPage = props.rowsPerPage;
      return page * rowsPerPage > tableRowsCount ? tableRowsCount : page * rowsPerPage;
    });
    var firstOnPage = (0, _vue.computed)(function () {
      var page = props.page,
          rowsPerPage = props.rowsPerPage;
      return page === 1 ? 1 : (page - 1) * rowsPerPage + 1;
    });
    var paginationDisplay = (0, _vue.computed)(function () {
      return props.tableRowsCount ? "".concat(firstOnPage.value, " - ").concat(lastOnPage.value, " from ").concat(props.tableRowsCount) : '-';
    });
    var isLastPage = (0, _vue.computed)(function () {
      return props.page >= props.pages;
    });
    var overPages = (0, _vue.computed)(function () {
      var page = props.page,
          tableRowsCount = props.tableRowsCount,
          rowsPerPage = props.rowsPerPage;

      if ((page - 1) * rowsPerPage > tableRowsCount) {
        return Math.ceil((page * rowsPerPage - tableRowsCount) / rowsPerPage);
      }

      return null;
    });
    (0, _vue.watch)(function () {
      return isLastPage.value;
    }, function (to) {
      if (to && props.tableRowsCount === props.allRowsCount) {
        emit('last-page', props.allRowsCount);
      }
    });

    function changeTableRowsPage(isNext) {
      if (props.page === props.pages && isNext) return;
      var event = isNext ? 'next' : 'prev';
      emit(event, isNext ? 1 : -1);
    }

    function genPaginationButton(isNext) {
      return (0, _vue.h)(_VButton.VButton, {
        width: 42,
        color: props.dark ? 'white' : 'primary',
        text: props.dark,
        elevation: 3,
        onClick: function onClick() {
          return changeTableRowsPage(isNext);
        }
      }, {
        "default": function _default() {
          return (0, _vue.h)(_VIcon.VIcon, {
            icon: isNext ? icons.$arrowRight : icons.$arrowLeft,
            color: props.dark ? 'white' : '',
            size: iconSize
          });
        }
      });
    }

    function genPageDisplay() {
      return (0, _vue.h)(_VButton.VButton, {
        width: 42,
        style: {
          margin: '0 10px'
        },
        color: props.dark ? 'white' : 'blue lighten-1',
        text: props.dark,
        elevation: 3
      }, {
        "default": function _default() {
          return props.page;
        }
      });
    }

    function genSelect() {
      return (0, _vue.h)(_VSelect.VSelect, {
        items: props.counts,
        modelValue: props.rowsPerPage,
        dark: props.dark,
        listColor: props.color,
        onSelect: function onSelect(e) {
          return emit('select', e);
        }
      });
    }

    function genSelectCaption() {
      var propsData = {
        "class": {
          'v-data-table__pagination-label': true
        }
      };
      var color = props.dark ? 'white' : '';
      return (0, _vue.h)('span', color ? setTextColor(color, propsData) : propsData, 'Rows per page');
    }

    function genPageItemsSelect() {
      return (0, _vue.h)('div', {
        "class": 'v-data-table__pagination-select'
      }, [genSelectCaption(), genSelect()]);
    }

    function genPagesCountDisplay() {
      var propsData = {
        "class": {
          'v-data-table__pagination-pages': true
        }
      };
      var color = props.dark ? 'white' : '';
      overPages.value && emit('reset-page', -overPages.value);
      return (0, _vue.h)('div', color ? setTextColor(color, propsData) : propsData, paginationDisplay.value);
    }

    function genPaginationButtonsBlock() {
      return (0, _vue.h)('div', {
        "class": {
          'v-data-table__pagination-route': true
        }
      }, [genPaginationButton(false), genPageDisplay(), genPaginationButton(true)]);
    }

    function genPaginationBlock() {
      return (0, _vue.h)('div', {
        "class": 'v-data-table__pagination'
      }, [genPageItemsSelect(), genPagesCountDisplay(), genPaginationButtonsBlock()]);
    }

    return function () {
      return (0, _vue.h)('div', {
        "class": 'v-data-table__footer'
      }, genPaginationBlock());
    };
  }
});
exports.VDataTableFooter = VDataTableFooter;
//# sourceMappingURL=VDataTableFooter.js.map