(function() {

  const generate = () => {
    const content = {
      "operationInternalId": "",
      "connections": Connections.list()
    };
    download([content]);
  };

  const download = (content) => {
    const el = document.getElementById("downloadAnchor");
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content));
    el.setAttribute("href", data);
    el.setAttribute("download", "epot-connections.json");
    el.click();
  };

  window.Download = {
    generate: generate
  };
})();
