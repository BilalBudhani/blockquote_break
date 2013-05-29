if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.line_break = {

  init: function() {
    
    this.opts.keyupCallback =  function(obj, event) {
      if (event.which == 13) {
        current_node = obj.getCurrentNode();

        if (current_node.nodeName == 'BLOCKQUOTE') {
            $('<p>Testing</p>').insertBefore($(obj.getCurrentNode()));

        }

      }

    }

  }

}