YUI.add("moodle-atto_mathslate-button",function(c,t){var e="atto_mathslate",r="mathslate-atto";c.namespace("M.atto_mathslate").Button=c.Base.create("button",c.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_getTeX:null,initializer:function(){"undefined"==typeof MathJax&&!this.get("filteractive")||(this._groupFocus={},this.addButton({icon:"mathslate",iconComponent:e,callback:this._displayDialogue}),M.atto_mathslate.help=this.get("helpurl"))},_displayDialogue:function(){var n,i,a,l,u=c.guid(),d=this.get("configurl"),s=this.get("host");this._currentSelection=s.getSelection(),n=s.getSelection(),!1!==this._currentSelection&&((i=this.getDialogue({headerContent:M.util.get_string("pluginname",e),bodyContent:'<div style="height:500px"></div>',width:500},!0)).show(),i.set("bodyContent",'<div class="filter_mathjaxloader_equation"><div id="'+u+'"></div>\x3c!--\\( \\)--\x3e</div>'),c.fire(M.core.event.FILTER_CONTENT_UPDATED,{nodes:new c.NodeList(i.get("boundingBox"))}),l=this,window.setTimeout(function(){var t,e,o;a=new M.atto_mathslate.Editor("#"+u,d),c.one("#"+u).addClass(r),t=c.one("#"+u).appendChild(c.Node.create("<button>Cancel</button>")),e=c.one("#"+u).appendChild(c.Node.create("<button>Display TeX</button>")),o=c.one("#"+u).appendChild(c.Node.create("<button>Inline TeX</button>")),t.on("click",function(){i.hide()}),e.on("click",function(){i.hide(),s.setSelection(n),s.insertContentAtFocusPoint("\\["+a.output("tex")+"\\]"),l.markUpdated()}),o.on("click",function(){i.hide(),s.setSelection(n),s.insertContentAtFocusPoint("\\("+a.output("tex")+"\\)"),l.markUpdated()}),c.one("#"+u).on("mouseover",function(t){t.stopPropagation()}),c.one("#"+u).on("mouseout",function(t){t.stopPropagation()})},"undefined"==typeof window.MathJax?500:0))}},{ATTRS:{configurl:{value:null},helpurl:{value:null}}})},"@VERSION@",{requires:["escape","moodle-atto_mathslate-editor"]});