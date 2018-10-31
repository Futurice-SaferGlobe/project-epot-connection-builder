(function () {

  var connections = {};

  const createKey = (from, to) => from+"-"+to;

  const connectionExists = (from, to) => {
    const keys = Object.keys(connections);
    const key = createKey(from, to);
    const reverseKey = createKey(to, from);
    return keys.indexOf(key) > -1 || keys.indexOf(reverseKey) > -1;
  };

  const addConnection = (connection) => {
    if (!connectionExists(connection.from, connection.to)) {
      const key = createKey(connection.from, connection.to);
      connections[key] = connection;
      return key;
    } else {
      return false;
    }
  };

  window.Connections = {
      add: addConnection
  };

})();
