window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  // api 可以操作 elements
  return {
    jquery: true,
    elements: elements,
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
    // 添加节点
    appendTo(node) {
      if (node instanceof Element) {
        this.each((el) => node.appendChild(el));
      } else if (node.jquery === true) {
        this.each((el) => node.get(0).appendChild(el));
      }
      return this;
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
    oldApi: selectorOrArrayOrTemplate.oldApi,
    end() {
      return this.oldApi;
    },
    remove() {
      const array = [];
      this.each((el) => {
        el.parentNode.removeChild(el);
        array.push(el);
      });
      return jQuery(array);
    },
    empty() {
      const array = [];
      this.each((el) => {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
          array.push(el.firstChild);
        }
      });
      return jQuery(array);
    },
    text(string) {
      if (arguments.length === 1) {
        this.each((el) => {
          if ("innerText" in el) {
            el.innerText = string;
          } else {
            el.textContent = string;
          }
        });
      } else if (arguments.length === 0) {
        const array = [];
        this.each((el) => {
          if ("innerText" in el) {
            array.push(el.innerText);
          } else {
            array.push(el.textContent);
          }
        });
        return array;
      }
      return this;
    },
    html(string) {
      if (arguments.length === 1) {
        this.each((el) => (el.innerHTML = string));
        return this;
      } else if (arguments.length === 0) {
        const array = [];
        this.each((el) => array.push(el.innerHTML));
        return array;
      }
    },
    attr(title, value) {
      if (arguments.length === 2) {
        this.each((el) => el.setAttribute(title, value));
      } else if (arguments.length === 1) {
        const array = [];
        this.each((el) => {});
        return array;
      }
      return this;
    },
    css(name) {
      if (typeof name === "string") {
        const array = [];
        this.each((el) => array.push(el.style[name]));
        return array;
      } else if (name instanceof Object) {
        this.each((el) => {
          for (const key in name) {
            if (name.hasOwnProperty(key)) {
              el.style[key] = name[key];
            }
          }
        });
      }
      return this;
    },
    addClass(className) {
      return this.each((el) => el.classList.add(className));
    },
    on(event, fn) {
      return this.each((el) => el.addEventListener(event, fn));
    },
    off(event, fn) {
      return this.removeEventListener(event, fn);
    },
  };
};
