var selectors = [];

var check_bound = false;
var debounceCheck = false;
var defaults = {
  interval: 50,
  forceProcess: false,
  container: document.documentElement,
  vOffset: 0,
  hOffset: 0
};

var priorAppearedList = [];

function appeared(selector) {
  var container = $(selector.options.container).get(0),
    containerRect = container.getBoundingClientRect();

  var containerTop = containerRect.top,
    containerBottom = containerTop + containerRect.height;

  var containerLeft = containerRect.left,
    containerRight = containerLeft + containerRect.width;

  $(selector.selector).each((i, el) => {
    var $el = $(el);
    $el.data("appear-container-pos", {
      top: Math.max(containerTop, 0),
      bottom: Math.min(containerBottom, window.innerHeight),
      left: Math.max(containerLeft, 0),
      right: Math.min(containerRight, window.innerWidth)
    });

    $el.data("appear-v-offset", selector.options.vOffset);
    $el.data("appear-h-offset", selector.options.hOffset);
  });

  return $(selector.selector).filter((i, el) => {
    return $(el).is(":appeared");
  });
}

function process() {
  debounceCheck = false;

  for (
    var index = 0, selectorsLength = selectors.length;
    index < selectorsLength;
    index++
  ) {
    var appearedList = appeared(selectors[index]);

    appearedList.trigger("appear", [appeared]);

    if (priorAppearedList[index]) {
      var $disappeared = priorAppearedList[index].not(appearedList);
      $disappeared.trigger("disappear", [$disappeared]);
    }
    priorAppearedList[index] = appearedList;
  }
}

function addSelector(selector) {
  selectors.push(selector);
  priorAppearedList.push();
}

function destroy(selector) {
  selectors = selectors.filter((s, i) => {
    if ($(s.selector).is(selector))

    return true;
  });
}

// "appeared" custom filter
$.expr[":"].appeared = el => {
  var $el = $(el);

  if (!$el.is(":visible")) {
    return false;
  }

  var containerPos = $el.data("appear-container-pos");
  var vOffset = $el.data("appear-v-offset"),
    hOffset = $el.data("appear-h-offset");

  var rect = el.getBoundingClientRect();

  if (
    rect.top + vOffset >= containerPos.top &&
    rect.top - vOffset < containerPos.bottom &&
    rect.left + hOffset >= containerPos.left &&
    rect.left - hOffset < containerPos.right
  )
    return true;
  else return false;
};

$.fn.extend({
  // watching for element's appearance in browser viewport
  appear: function(options) {
    options = $.extend({}, defaults, options || {});

    var selector = this.selector || this;

    if (options.destroy) {
      destroy(selector);

      return $(selector);
    }

    if (options.forceProcess) {
      setTimeout(process, options.interval);
    }

    addSelector({
      selector: selector,
      options: options
    });

    return $(selector);
  }
});

function onScroll() {
  if (debounceCheck) {
    return;
  }
  debounceCheck = true;

  setTimeout(process, 50);
}

document.addEventListener("scroll", onScroll, true);
