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
  });

  $('#to-column a').click(event => {
    event.preventDefault();
    const $this = $(event.target);
    const current = $this.data('uid');

    if (activeFrom && activeFrom !== current) {
      Connections.add({
        from: activeFrom,
        to: current,
        type: connectionType
      });
    }
  });

})(jQuery);
