declare global {
  interface Window {
    Prism: any;
  }
}

const prismSetup = () => {
  console.log("prismSetup");
  const hook = function (env: any) {
    const pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }

    // check for title div already exists
    // autoload runs twice for languages
    const matches = pre.getElementsByClassName("prism-titlename");
    if (matches.length > 0) {
      return;
    }

    // Create wrapper for <pre> to prevent scrolling toolbar with content
    if (pre.getAttribute("title")) {
      const title = document.createElement("div");
      title.classList.add("prism-titlename");
      title.innerHTML = pre.getAttribute("title");
      pre.prepend(title);
    }
  };

  if (window.Prism) {
    window.Prism.hooks.add("complete", hook);
    console.log("window.Prism", window.Prism);
  }
};

export default prismSetup;
