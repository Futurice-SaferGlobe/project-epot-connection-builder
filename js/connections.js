(function ($) {

  const container = "#connections-container";

  var svg = null;
  var activeFrom = null;
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

  const removeConnection = (key) => {
    delete connections[key];
    update();
  };

  const setActiveFrom = (uid) => {
    activeFrom = uid;
    update();
  };

  const dimStrokeColor = "#6699CC";
  const findYbyUID = uid => $('#from-column a[data-uid="' + uid + '"]').position().top + 6;
  const findX2 = () => $('svg').width();
  const lineGenerator = d3.line().curve(d3.curveBasis);
  const strokeWidthByType = type => type === 'strong-connection' ? 4 : 2;
  const strokeColor = d => {
    if (d.from !== activeFrom) return dimStrokeColor;
    return d.type === 'broken-connection' ? 'rgb(255,0,0)' : 'rgb(255,92,57)';
  };
  const strokeDasharrayByType = type => type === 'broken-connection' ? '5,5' : 'none';

  const update = () => {
    const connectionArray = connectionsAsArray();

    if (!svg) {
      svg = d3.select(container).append("svg")
          .attr("width", "100%")
          .attr("height", "1300");
    }

    svg.selectAll("path")
      .data(connectionArray)
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
        .attr("id", d => createKey(d.from, d.to))
        .style("fill", "none")
        .style("stroke", d => strokeColor(d))
        .style("stroke-width", d => strokeWidthByType(d.type))
        .style("stroke-dasharray", d => strokeDasharrayByType(d.type));

    svg.selectAll("path")
      .style("stroke", d => strokeColor(d));

    svg.selectAll("path")
      .data(connectionArray)
      .exit().remove();
  };

  window.Connections = {
      add: addConnection,
      setActiveFrom: setActiveFrom
  };

})(jQuery);
