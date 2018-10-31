(function ($) {

  const container = "#connections-container";

  var svg = null;
  var connections = {};

  const createKey = (from, to) => from+"-"+to;
  const connectionsAsArray = () => Object.keys(connections).map(key => connections[key]);

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
      update();
      return key;
    } else {
      return false;
    }
  };

  const findYbyUID = uid => {
    const svgTop = $('svg').position().top;
    const liTop = $('#from-column a[data-uid="' + uid + '"]').position().top;
    return liTop;
  };

  const update = () => {
    if (!svg) {
      svg = d3.select(container).append("svg")
          .attr("width", "100%")
          .attr("height", "1300")
          .attr("viewbox", "0 0 300 1300");
    }

    svg.selectAll("line")
    .data(connectionsAsArray())
    .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", d => findYbyUID(d.from))
      .attr("x2", 300)
      .attr("y2", d => findYbyUID(d.to))
      .style("stroke", "black");

  };

  window.Connections = {
      add: addConnection
  };

})(jQuery);
