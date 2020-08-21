window.jQuery = function (selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }
  // api 可以操作 elements
  return {
    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        array = array.concat(
          Array.from(elements[i].querySelectorAll(selector))
        );
      }
      array.oldApi = this; //this 就是Api
      return jQuery(array);
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      return this;
    },
    parent() {
      elements;
    },
    // 闭包：函数访问外部的变量
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.classList.add(className);
      }
      return this;
    },
    oldApi: selectorOrArray.oldApi,
    end() {
      return this.oldApi;
    },
  };
};
