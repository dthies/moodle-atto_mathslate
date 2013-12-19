YUI.add('moodle-atto_mathslate-mathjaxeditor', function (Y, NAME) {

M.atto_mathslate = M.atto_mathslate|| {};
M.atto_mathslate.MathJaxEditor=function(id){
        var math=[];
        var se=new M.atto_mathslate.mSlots();
        se.slots.push(math);
        this.workspace=Y.one(id).append('<div id="canvas" class="mathslate-workspace"/>');
        var canvas=new Y.DD.Drop({
            node: this.workspace.one('#canvas')});
        this.canvas=canvas;
        function makeDraggable () {
            se.forEach(function(m){
                var node=canvas.get('node').one('#'+m[1].id);
                if(!node){return;}
                var drag = new Y.DD.Drag({node: node}).plug(Y.Plugin.DDProxy, {
                    resizeFrame: false,
                    moveOnEnd: false
                });
                drag.on('drag:start', function(){
                    var id = Y.guid();
                    this.get('dragNode').set('innerHTML','' );
                    MathJax.Hub.Queue(['addElement',MathJax.HTML,
                        this.get('dragNode').getDOMNode(),'span',{id: id},
                        [['math',{},[Y.JSON.parse(se.getItemByID(m[1].id))]]]]);
                    MathJax.Hub.Queue(['Typeset',MathJax.Hub,id]);
                    
                });


                var drop = new Y.DD.Drop({node: node});
                drop.on('drop:hit',function(e){
                    var dragTarget=e.drag.get('node').get('id');
                    if(e.drag.get('data')) {
                        se.insertSnippet(m[1].id,se.createItem(e.drag.get('data')));
                    }
                    else if(dragTarget!==m[1].id&&se.isItem(dragTarget)&&!canvas.get('node').one('#'+dragTarget).one('#'+m[1].id)) {
                        se.insertSnippet(e.drop.get('node').get('id'), se.removeSnippet(dragTarget));
                    }
                    render();
                });
                drop.on('drop:enter',function(e){
                    e.stopPropagation();
                    canvas.get('node').all('.highlight',function(n){
                         n.removeClass('highlight');
                    });
                    this.get('node').addClass('highlight');
                });
                drop.on('drop:exit',function(){
                    this.get('node').removeClass('highlight');
                });
                
            });
        }
        function render() {
            se.rekey();
            canvas.get('node').setHTML('');
            MathJax.Hub.Queue(['addElement',MathJax.HTML,canvas.get('node').getDOMNode(),'span',{},[['math',{},math]]]);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub, 'canvas']);
            MathJax.Hub.Queue(makeDraggable);
        }
        this.render = render;
        this.addMath=function(target,json){
            math.push(se.createItem(json));
            render();
        };
        this.clear = function(){
            math=[];
            se=new M.atto_mathslate.mSlots();
            se.slots.push(math);
            render();
        };
        this.output = function(format){
            if(format==='MathML') {
                return canvas.get('node').one('script').getHTML();
            }
            if(format==='HTML') {
                return canvas.get('node').one('span').getHTML();
            }
            return se.output(format);
        };
        this.getHTML = function(){
            return canvas.get('node').one('span').getHTML();
        };
        render();
};


}, '@VERSION@', {"requires": ["moodle-atto_mathslate-snippeteditor", "dd-proxy", "dd-drop"]});
