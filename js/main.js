(function ($) {

  var activeFrom = null;
  var connectionType = 'connection';

  $('#connection-type input').change(event => {
    connectionType = event.target.value;
  });

  $('#from-column a').click(event => {
    event.preventDefault();
    const $this = $(event.target);
    const current = $this.data('uid');

    if (activeFrom && activeFrom === current) {
      activeFrom = null;
      $this.removeClass('active');
    } else {
      if (activeFrom) {
        $('#from-column a[data-uid="' + activeFrom + '"]').removeClass('active');
      }
      activeFrom = current;
      $this.addClass('active');
    }

    Connections.setActiveFrom(activeFrom);
    updateToList();
  });

  $('#to-column a').click(event => {
    event.preventDefault();
    const $this = $(event.target);
    const current = $this.data('uid');

    if (activeFrom && activeFrom !== current) {
      const connection = {
        from: activeFrom,
        to: current,
        type: connectionType
      };
      const added = Connections.add(connection);

      if (!added) {
        Connections.remove(connection);
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }

      updateToList();
    }
  });

  $('a#clear').click(event => {
    event.preventDefault();
    if (confirm("Are you sure you want to remove all connections and start over?")) {
      Connections.list().forEach(c => Connections.remove(c));
      updateToList();
    }
  });

  const updateToList = () => {
    const connections = Connections.list();
    const active = connections.filter(c => c.from === activeFrom);
    const blocked = connections.filter(c => c.to === activeFrom);

    $('#to-column a').removeClass('active');
    $('#to-column a').removeClass('blocked');

    active.map(c => c.to)
        .forEach(uid => $('#to-column a[data-uid="'+uid+'"]').addClass('active'));

    blocked.map(c => c.from)
        .concat([activeFrom])
        .forEach(uid => $('#to-column a[data-uid="'+uid+'"]').addClass('blocked'));
  };

})(jQuery);
