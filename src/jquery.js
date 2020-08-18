window.jQuery = function (selector) {
  const elements = document.querySelectorAll(selector);
  // api 可以操作 elements
  return {
    // 闭包：函数访问外部的变量
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.classList.add(className);
      }
      return this;
    },
    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        array = array.concat(
          Array.from(elements[i].querySelectorAll(selector))
        );
      }
      return array;
    },
  };
};
