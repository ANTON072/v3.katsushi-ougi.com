const importScript = (url: string, id: string) => {
  return new Promise((resolve, reject) => {
    let s = document.createElement("script");
    s.id = id;
    s.onload = () => {
      resolve("success");
    };
    s.onerror = () => {
      reject();
    };
    s.src = url;
    document.head.append(s);
  });
};

export { importScript };
