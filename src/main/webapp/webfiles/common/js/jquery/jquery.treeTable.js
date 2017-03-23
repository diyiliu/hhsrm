/* jQuery treeTable Plugin 2.2.3 - http://ludo.cubicphuse.nl/jquery-plugins/treeTable/ */
(function($) {
  // Helps to make options available to all functions
  // TODO: This gives problems when there are both expandable and non-expandable
  // trees on a page. The options shouldn't be global to all these instances!
  var options;
  var defaultPaddingLeft;
  var tempChild = {};
  $.fn.treeTable = function(opts) {
    options = $.extend({}, $.fn.treeTable.defaults, opts);
    
    
    return this.each(function() {
      $(this).addClass("treeTable").find("tbody tr").each(function() {
        // Initialize root nodes only if possible
        if(!options.expandable || $(this)[0].className.search("child-of-") == -1) {
          // To optimize performance of indentation, I retrieve the padding-left
          // value of the first root node. This way I only have to call +css+ 
          // once.
          if (isNaN(defaultPaddingLeft)) {
            defaultPaddingLeft = parseInt($($(this).children("td")[options.treeColumn]).css('padding-left'), 10);
          }
          
          initialize($(this));
        } else if(options.initialState == "collapsed") {
          if(options.initAll){
            initialize($(this));
          }
          this.style.display = "none"; // Performance! $(this).hide() is slow...
        }
      });
    });
  };
  
  $.fn.treeTable.defaults = {
    childPrefix: "child-of-",
    clickableNodeNames: true,
    expandable: true,
    linkingTrigger: true,
    indent: 15,
    initialState: "collapsed",
    treeColumn: 0,
    initAll:false
  };
  
  // Recursively hide all node's children in a tree
  $.fn.collapse = function() {
    $(this).removeClass("expanded").addClass("collapsed");
    
    childrenOf($(this)).each(function() {
      if(!$(this).hasClass("collapsed")) {
        $(this).collapse();
      }
      
      this.style.display = "none"; // Performance! $(this).hide() is slow...
    });
    
    return this;
  };
  
  //--selectAll
  $.fn.selected = function() {
    childrenOf($(this)).each(function() {
         $(this)[0].getElementsByTagName("input")[0].checked = "true";
         $(this).selected();
    });
    return this;
  };
  
  //---cancel select
    $.fn.cancleselected = function() {
    childrenOf($(this)).each(function() {
         $(this)[0].getElementsByTagName("input")[0].checked = "";
         $(this).cancleselected();
    });
    return this;
  };  
  
  // Recursively show all node's children in a tree
  $.fn.expand = function(expandAll) {
    $(this).removeClass("collapsed").addClass("expanded");
    childrenOf($(this)).each(function() {
      initialize($(this));
      if(expandAll){
          $(this).addClass("expanded");
      }
      if($(this).is(".expanded.parent")) {
        $(this).expand(expandAll);
      }
      // this.style.display = "table-row"; // Unfortunately this is not possible with IE :-(
      $(this).show();
    });
    
    return this;
  };
  
  // Add an entire branch to +destination+
  $.fn.appendBranchTo = function(destination) {
    var node = $(this);
    var parent = parentOf(node);
    var childNodes = childrenOf(node);
    var ancestorNames = $.map(ancestorsOf($(destination)), function(a) { return a.id; });
    
    // Conditions:
    // 1: +node+ should not be inserted in a location in a branch if this would
    //    result in +node+ being an ancestor of itself.
    // 2: +node+ should not have a parent OR the destination should not be the
    //    same as +node+'s current parent (this last condition prevents +node+
    //    from being moved to the same location where it already is).
    // 3: +node+ should not be inserted as a child of +node+ itself.
    if($.inArray(node[0].id, ancestorNames) == -1 && (!parent || (destination.id != parent[0].id)) && destination.id != node[0].id) {
      if(childNodes.length==0){
         indent(node, ancestorsOf(node).length * options.indent * -1); // Remove indentation
      
         if(parent) { node.removeClass(options.childPrefix + parent[0].id); }
      
          node.addClass(options.childPrefix + destination.id);
          move(node, destination); // Recursively move nodes to new location
          indent(node, ancestorsOf(node).length * options.indent);
         
          
      }
    }
    
    return this;
  };
  
  // Add reverse() function from JS Arrays
  $.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
  };
  
  // Toggle an entire branch
  $.fn.toggleBranch = function() {
    if($(this).hasClass("collapsed")) {
      $(this).expand();
    } else {
      $(this).removeClass("expanded").collapse();
    }
    
    return this;
  };
  
  
  //--Select all
    $.fn.selectAll = function() {
      $(this).selected();
    return this;
  };
  
  
    //--selectAll
    $.fn.selected = function() {
    	//去除复选
//    if(this.hasClass("parent")){
//        var input = getInput(this[0],options.treeColumn);
//        input.indeterminate = false;
//    }
    childrenOf($(this)).each(function() {
    	 var input = this.getElementsByTagName("input")[0];
    	 //添加复选
    	 input.indeterminate = false;
         input.checked = "true";
         $(this).selected();
    });
    return this;
  };
  
  //---cancel select
    $.fn.cancleselected = function() {
    if(this.hasClass("parent")){
        var input = getInput(this[0],options.treeColumn);
        input.indeterminate = false;
    }
    childrenOf($(this)).each(function() {
         $(this)[0].getElementsByTagName("input")[0].checked = "";
         $(this).cancleselected();
    });
    return this;
  };
    function getInput(obj,treeColumn){
        if(treeColumn>=0){
        	var tds = obj.cells;
            var cell = tds[treeColumn];
            var inputs = cell.getElementsByTagName("input");
            for(var i=0;i<inputs.length;i++){
                if(inputs[i].type=="checkbox"){
                    return inputs[i];
                }
            }
        }else{
            var inputs = obj.getElementsByTagName("input");
            for(var i=0;i<inputs.length;i++){
                if(inputs[i].type=="checkbox"){
                    return inputs[i];
                }
            }
        }
    }
    $.fn.selectParent = function (treeColumn) {
        if(treeColumn == null){
            treeColumn = options.treeColumn;
        }
        var parentNode = parentOf($(this));
        if(parentNode != null){
            var allSelected = true;
            var indeterminate = false;
            var input = getInput(parentNode[0],options.treeColumn);
            input.checked = true;
            childrenOf(parentNode).each(function() {
                var input = getInput(this,treeColumn);
                if(!input){
                    input = getInput(this,options.treeColumn);
                }
                if(!input){
                    input = getInput(this);
                }
                if(!input.checked){
                    allSelected = false;
                }else if(input.indeterminate){
                    indeterminate = true;
                }
            });
            var input = getInput(parentNode[0],options.treeColumn);
            if(allSelected){
                input.indeterminate = indeterminate;
            }else{
                input.indeterminate = true;
            }
            parentNode.selectParent(treeColumn);
        }
    }
    $.fn.unSelectParent = function (treeColumn) {
        if(treeColumn == null){
            treeColumn = options.treeColumn;
        }
        var parentNode = parentOf($(this));
        if(parentNode != null){
            var unSelected = true;
            childrenOf(parentNode).each(function() {
                var input = getInput(this,treeColumn);
                if(!input){
                    input = getInput(this,options.treeColumn);
                }
                if(!input){
                    input = getInput(this);
                }
                if(input.checked){
                  unSelected = false;
                }
            });
            var input = getInput(parentNode[0],options.treeColumn);
            if(unSelected){
                input.checked = false;
                input.indeterminate = false;
            }else{
                input.indeterminate = true;
            }
            parentNode.unSelectParent(treeColumn);
        }
    }
          
    $.fn.selectParentStartFromSelf = function (treeColumn) {
        if(treeColumn == null){
            treeColumn = options.treeColumn;
        }
        var parentNode = $(this);
        if(parentNode != null){
            var allSelected = true;
            var indeterminate = false;
            var input = getInput(parentNode[0],options.treeColumn);
            input.checked = true;
            childrenOf(parentNode).each(function() {
                var input = getInput(this,treeColumn);
                if(!input.checked){
                    allSelected = false;
                }else if(input.indeterminate){
                    indeterminate = true;
                }
            });
            var input = getInput(parentNode[0],options.treeColumn);
            if(allSelected){
                input.indeterminate = indeterminate;
            }else{
                input.indeterminate = true;
            }
            parentNode.selectParent();
        }
    }
    $.fn.unSelectParentStartFromSelf = function (treeColumn) {
        if(treeColumn == null){
            treeColumn = options.treeColumn;
        }
        var parentNode = $(this);
        if(parentNode != null){
            var unSelected = true;
            childrenOf(parentNode).each(function() {
                var input = getInput(this,treeColumn);
                if(input.checked){
                  unSelected = false;
                }
            });
            var input = getInput(parentNode[0],options.treeColumn);
            if(unSelected){
                input.checked = false;
                input.indeterminate = false;
            }else{
                input.indeterminate = true;
            }
            parentNode.unSelectParent();
        }
    }
  
  //-----cancel selected
    $.fn.cancleSelect = function() {
      $(this).cancleselected();
    return this;
  };  
  
  // === Private functions
  
  function ancestorsOf(node) {
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  };
  function childrenOf(node) {
    var strClass = "."+options.childPrefix + node[0].id;
    if(!tempChild[strClass]){
         //table.treeTable tbody tr
        //var temp = $("table.treeTable tbody tr." + options.childPrefix + node[0].id);
        var nextNode = node.nextAll(strClass);
        tempChild[strClass]=nextNode;
    }
    return tempChild[strClass];
  };
  
  function getPaddingLeft(node) {
    var paddingLeft = parseInt(node[0].style.paddingLeft, 10);
    return (isNaN(paddingLeft)) ? defaultPaddingLeft : paddingLeft;
  }
  
  function indent(node, value) {
    var cell = node[0].cells[options.treeColumn];
    cell.style.paddingLeft = getPaddingLeft($(cell)) + value + "px";
    
    childrenOf(node).each(function() {
      indent($(this), value);
    });
  };
  
  function initialize(node) {
    if(!node.hasClass("initialized")) {
      node.addClass("initialized");
      
      var childNodes = childrenOf(node);
      
      if(!node.hasClass("parent") && childNodes.length > 0) {
        node.addClass("parent");
      }
      var cell = $(node.children("td")[options.treeColumn]);
      if(node.hasClass("parent")) {
        
        var padding = getPaddingLeft(cell) + options.indent;
        
        childNodes.each(function() {
          this.cells[options.treeColumn].style.paddingLeft = padding + "px";
        });
        
        if(options.expandable) {
          cell.prepend('<span style="margin-left: 0; padding-left: ' + options.indent + 'px" class="expander">&nbsp;</span>');
          
          $(cell.find("span")[0]).click(function() {
            node.toggleBranch();
           });
           $(cell.find(">:input")[0]).click(function() {
            if(this.checked){
                if(options.linkingTrigger){
                    node.selectAll();
                }
                node.expand(true);
            };
            if(!this.checked){
                if(options.linkingTrigger){
                    node.cancleSelect();
                }           
            };
            if(this.checked){
                node.selectParent();
            }else{
                node.unSelectParent();
            }
           });
          
          // Check for a class set explicitly by the user, otherwise set the default class
          if(!(node.hasClass("expanded") || node.hasClass("collapsed"))) {
            node.addClass(options.initialState);
          }

          if(node.hasClass("expanded")) {
            node.expand();
          }
        }
      }else{
        var cell = $(node[0].cells[options.treeColumn]);
        cell.prepend('<span style="margin-left: 0;margin-top:0; padding-left: ' + options.indent + 'px" >&nbsp;</span>');
        var inputs = cell[0].getElementsByTagName("input");
        if(inputs.length>0){
            $(inputs[0]).click(function() {
                if(this.checked){
                    node.selectParent();
                }else{
                    node.unSelectParent();
                }
            });
        }
      }
    }
  };
  
  function move(node, destination) {
    node.insertAfter(destination);
    //initialize(destination);
    childrenOf(node).reverse().each(function() { move($(this), node[0]); });
  };
  
  function parentOf(node) {
    var classNames = node[0].className.split(' ');
    if(classNames != null && classNames.length > 0){
    	if(classNames[0].match("child-of-")) {
		    return $("#" + classNames[0].substring(9));
		}else if(classNames[0].match("node--of")){
		  	return $("#" + classNames[0].substring(6));
		}	
    }
//    for(key in classNames) {alert(classNames[key]);
//    	alert(classNames[key].substring(9));
//      if(classNames[key].match("child-of-")) {
//        return $("#" + classNames[key].substring(9));
//      }else if(classNames[key].match("node--of")){
//      	return $("#" + classNames[key].substring(6));
//      }
//    }
  };
})(jQuery);