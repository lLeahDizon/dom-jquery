window.jQuery = function (selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }
  // api 可以操作 elements
  return {
    // 查找子元素
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
    // 遍历节点
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      return this;
    },
    // 获取每个元素的父元素
    parent() {
      const array = [];
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode);
        }
      });
      return jQuery(array);
    },
    children() {
      const array = [];
      this.each((node) => {
        array.push(...node.children);
      });
      return jQuery(array);
    },
    siblings() {
      const array = [];
      this.each((node) => {
        array.push(
          Array.from(node.parentNode.children).filter((n) => n !== node)
        );
      });
      return jQuery(array);
    },
    index() {
      const array = [];
      this.each((node) => {
        const list = node.parentNode.children;
        for (let i = 0; i < list.length; i++) {
          if (list[i] === node) {
            array.push(i);
            break;
          }
        }
      });
      return jQuery(array);
    },
    nextNode() {
      const array = [];
      this.each((node) => {
        let x = node.nextSibling;
        while (x.nodeType === 3) {
          x = x.nextSibling;
        }
        array.push(x);
      });
      return jQuery(array);
    },
    previousNode() {
      const array = [];
      this.each((node) => {
        let x = node.previousSibling;
        while (x.nodeType === 3) {
          x = x.previousSibling;
        }
        array.push(x);
      });
      return jQuery(array);
    },
    print() {
      console.log(elements);
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
