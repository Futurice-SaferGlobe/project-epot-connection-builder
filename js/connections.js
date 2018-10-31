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

  const findYbyUID = uid => $('#from-column a[data-uid="' + uid + '"]').position().top + 6;
  const findX2 = () => $('svg').width();
  const lineGenerator = d3.line().curve(d3.curveBasis);
  const strokeWidthByType = type => type === 'strong-connection' ? 4 : 2;
  const strokeColorByType = type => type === 'broken-connection' ? 'rgb(255,72,131)' : 'rgb(255,159,22)';
  const strokeDasharrayByType = type => type === 'broken-connection' ? '5,5' : 'none';

  const update = () => {
    if (!svg) {
      svg = d3.select(container).append("svg")
          .attr("width", "100%")
          .attr("height", "1300");
    }

    svg.selectAll("path")
    .data(connectionsAsArray())
    .enter()
      .append("path")
      .attr("d", d => {
        const x1 = 0;
        const y1 = findYbyUID(d.from);
        const x2 = findX2();
        const y2 = findYbyUID(d.to);
        const points = [
          [x1, y1],
          [x1 + 100, y1],
          [x2 - 100, y2],
          [x2, y2]
        ];
        return lineGenerator(points);
      })
      .style("fill", "none")
      .style("stroke", d => strokeColorByType(d.type))
      .style("stroke-width", d => strokeWidthByType(d.type))
      .style("stroke-dasharray", d => strokeDasharrayByType(d.type));

  };

  window.Connections = {
      add: addConnection
  };

})(jQuery);
