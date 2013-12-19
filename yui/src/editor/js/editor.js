/*
 * Mathslate Editor Copyright Daniel Thies 2013
 * dthies@ccal.edu
 */

M.atto_mathslate = M.atto_mathslate|| {};
M.atto_mathslate.Editor=function(editorID,config){
    var toolboxID=Y.guid();
    var workID=Y.guid();
    this.node=Y.one(editorID);
    this.node.appendChild(Y.Node.create('<div id="' +toolboxID +'">'));
    this.node.appendChild(Y.Node.create('<div id="' +workID +'" class="mathslate-workspace">'));

    var mje=new M.atto_mathslate.MathJaxEditor('#'+workID);
    this.insertMath = null;
    var me=this;
    function insertMath (m) {if(me.insertMath){me.insertMath(m);}}
    var clear=this.node.appendChild(Y.Node.create('<button>Clear</button>'));
    clear.on('click',function(){mje.clear();});
    var inlineTex=this.node.appendChild(Y.Node.create('<button>Inline TeX</button>'));
    inlineTex.on('click',function(){insertMath('\\('+mje.output('tex')+'\\)');});
    var displayTex=this.node.appendChild(Y.Node.create('<button>Display TeX</button>'));
    displayTex.on('click',function(){insertMath('\\['+mje.output('tex')+'\\]');});
    var html=this.node.appendChild(Y.Node.create('<button>Insert HTML</button>'));
    html.on('click',function(){insertMath(mje.output('HTML'));});
    var mathmml=this.node.appendChild(Y.Node.create('<button>Insert MathML</button>'));
    mathmml.on('click',function(){insertMath(mje.output('MathML'));});

    var tbox={tools: [],
        fillToolBox: function(tools){
        function Tool(snippet) {
            function findBlank(snippet) {
                if (Array.isArray(snippet[2])) {
                    snippet[2].forEach(function(a){
                    if (Array.isArray(a)) {
                            findBlank(a);
                        }
                        else if(a==='[]') {
                        newID=Y.guid();
                        snippet[2][snippet[2].indexOf(a)]=['mn',{},'[]'];
                        }
                    });
                }
            }
            this.id=Y.guid();
            
            this.json=JSON.stringify(snippet);
            this.HTMLsnippet=[['span', {id: this.id}, [['math', {}, [snippet]]]]];
            
            findBlank(snippet);
            tbox.tools.push(this);
        }
        var tabs={children: []};
        tools.forEach(function(tab){
            var q=Y.Node.create('<span></span>');
            tab.tools.forEach(function(snippet){
                var t = new Tool(snippet);
                MathJax.HTML.addElement(q.getDOMNode(),'span',{},t.HTMLsnippet);
                });
            tabs.children.push({label: tab.label, content: q.getHTML()});
        });
        var tabview = new Y.TabView(
            tabs
            );
        if(Y.one('#'+toolboxID)){
        tabview.render('#'+toolboxID);
        }
    
    },
        getToolByID: function(id){
        var t;
        this.tools.forEach(function(tool){
            if(tool.id){ if(tool.id===id) {t=tool;}}
        });
        return t;
    }
    };


    mje.canvas.on('drop:hit',function(e){
        if(e.drag.get('data')) {
            mje.addMath(e.drop.get('node').get('id'),e.drag.get('data'));
        }
    });
       
    function makeToolsDraggable(){
        tbox.tools.forEach(function(tool) {
        var d=new Y.DD.Drag({node: '#'+tool.id});
        d.set('data',tool.json);
        d.on('drag:end', function() {
            this.get('node').setStyle('top' , '0');
            this.get('node').setStyle('left' , '0');
            });
        });
    }
    
    Y.on('io:success',function(id,o){
        if(tbox.tools.length===0) {
            tbox.fillToolBox(Y.JSON.parse(o.response));
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,toolboxID]);
            MathJax.Hub.Queue(makeToolsDraggable);
        }
    });
    if(config===undefined) {
        Y.io(M.atto_mathslate.config);
    } else {
        Y.io(config);
    }
    
};
