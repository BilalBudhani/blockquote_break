/*
 * BlockQuote Plugin for Redactor v 8.2.2
 * Author: BilalBudhani
 * Latest: https://github.com/BilalBudhani/blockquote_break
 */

if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.blockquote_break   = {

  init: function() {
    this.opts.keydownCallback =  function(event) {
      if (event.which != 13) {
        return ;
      }
      current_node = this.getParent();
      bq_node = this.getMostTopBlockquote(current_node, this.get());
      if (!bq_node) {
        return;
      }
      console.log('current_node', current_node, bq_node);
      
      closeTags = this.getClose(current_node, bq_node);
      openTags = this.getOpen(current_node, bq_node);

      splitToken = '<div id="_$'+ (new Date()).getTime() + '$_"></div>';
      split_node = $(splitToken)[0];
      this.insertNode(split_node);
      
      split_contents = this.get().split(splitToken);
      this.set(split_contents[0] + closeTags + "</blockquote><br id=\"__\"><blockquote>" + openTags + split_contents[1]);

      /* get the <br id="__"> element and put cursor on it */
      el = this.$editor.find('#__');
      node = el.get(0);
      el.removeAttr('id');
      sel = this.getSelection();
      range = sel.getRangeAt(0);
      range.collapse(false);
      range.selectNodeContents(node);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      event.preventDefault();
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
  },
  getOpen: function (n, r) {
    // get the html "open-tag" of a node
    function getOpenTag(n) {
      var attr, copy;
      copy = n.cloneNode(false);
      if (!copy) {
        return '';
      }
      copy.innerHTML = '';
      attr = '';
      console.log('copy', copy, n, r);
      attr = $(copy)[0].outerHTML
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