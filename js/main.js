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

    if (activeFrom) {
      if (activeFrom === current) {
        activeFrom = null;
        $this.removeClass('active');
      }
    } else {
      activeFrom = current;
      $this.addClass('active');
    }
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
