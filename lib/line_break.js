if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.line_break = {

  init: function() {
    that = this;

    this.opts.keydownCallback =  function(obj, event) {
      if (event.which != 13) {
        return ;
      }
      
      current_node = obj.getCurrentNode();

      bq_node = that.getMostTopBlockquote(current_node, that.getCode());
      closeTags = that.getClose(current_node, bq_node);

      console.log('blockquote', closeTags);

      splitToken = '<div id="_$'+ (new Date()).getTime() + '$_"></div>';
      split_node = $(splitToken)[0]
      obj.insertNodeAtCaret(split_node);
      
      split_contents = obj.getCode().split(splitToken);
      obj.setCode(split_contents[0] + closeTags + "</blockquote><br id=\"__\"><blockquote>" + split_contents[1]);

      /* get the <br id="__"> element and put cursor on it */
        el = that.$editor.find('#__');
        node = el.get(0);
        el.removeAttr('id');
        sel = obj.getSelection();
        range = sel.getRangeAt(0);
        range.collapse(false);
        range.selectNodeContents(node);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

    }

  },
  
  getMostTopBlockquote: function(n, r) {
    var last_bq = null;
    while (n) {
      if (n == r)
        break;
      if (n.nodeName === 'BLOCKQUOTE')
        last_bq = n;
      n = n.parentNode;
    }
    return last_bq;
  },
  getClose: function(n, r) {
    // get the htnk "close-tag" of a node
    function getCloseTag(n) {
        return "</" + n.nodeName.toLowerCase() + ">";
    }

      var result = '';
      while (n) {
        if (n == r)
          break;
        result += getCloseTag(n);
        n = n.parentNode;
      }
      return result;
    }
}