if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.line_break = {

  init: function() {
    that = this;

    this.opts.keydownCallback =  function(obj, event) {
      if (event.which != 13) {
        return ;
      }

      // current_node = obj.getCurrentNode();
      // parent_node = obj.getParentNode();
      // bq_node = that.getMostTopBlockquote(current_node, parent_node);
      // console.log('blockquote', current_node, parent_node, bq_node);
      // if (!bq_node) {
      //   return;
      // }

      splitToken = '<div id="_$'+ (new Date()).getTime() + '$_"></div>';
      split_node = $(splitToken)[0]
      obj.insertNodeAtCaret(split_node);
      
      split_contents = obj.getCode().split(splitToken);
      

      obj.setCode(split_contents[0] + "</blockquote><br id=\"__\"><blockquote>" + split_contents[1]);

      /* get the <br id="__"> element and put cursor on it */
        node = that.$editor.find('#__')
        node.removeAttr('id');
        // obj.getSelection().selectNodeContents(node);
        // obj.getSelection().collapse(true);

      console.log('code', obj.getSelection());

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

  getOpen: function (n, r) {
    // get the html "open-tag" of a node
    function getOpenTag(n) {
      var attr, copy;
      copy = n.cloneNode(false);
      copy.innerHTML = '';
      attr = ed.dom.getOuterHTML( copy )
               .replace(new RegExp( '<'  + copy.nodeName, "i"), '')
               .replace(new RegExp( '</' + copy.nodeName + '>', "i" ), '');
      return '<' + copy.nodeName.toLowerCase() + attr;
    };

    var result = '';
    while (n) {
      if (n == r)
        break;
      result = getOpenTag(n) + result;
      n = n.parentNode;
    }
    return result;
  }

}