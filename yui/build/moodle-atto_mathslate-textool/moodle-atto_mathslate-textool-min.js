YUI.add("moodle-atto_mathslate-textool",function(c,e){M.atto_mathslate=M.atto_mathslate||{},(M&&M.atto_mathslate||{}).TeXTool=function(e,o){var n,t=c.Node.create('<input type="text">'),i=c.Node.create("<span>\\[ \\]</span>");o&&i.on("click",function(){o(i.json)}),c.one(e).appendChild(t),c.one(e).appendChild(i),t.focus(),(n=new c.DD.Drag({node:i})).on("drag:end",function(){this.get("node").setStyle("top","0"),this.get("node").setStyle("left","0")}),i.toMathML=function(e){var t,a=window.MathJax.Hub.getAllJax(this.generateID())[0];try{t=a.root.toMathML("")}catch(r){if(!r.restart)throw r;return window.MathJax.Callback.After(["toMathML",this,a,e],r.restart)}return window.MathJax.Callback(e)(t)},t.on("change",function(){var a,r,e=window.MathJax.Hub.getAllJax(i.generateID())[0],t=this.getDOMNode().value;e&&(a="",window.MathJax.Hub.Queue(["Text",e,this.getDOMNode().value]),r=function(e){if(!/<mtext mathcolor="red">/.test(e)&&!/<merror/.test(e)){var t=(e=e.replace(/$\s+/gm," ")).replace(/^\s*<([a-z]*).*/,"$1");for(e=e.replace(/^\s*<[a-z]*/,""),a+='["'+t+'", {';1<e.trim().search(">");)a+=e.replace(/^ *([a-z]*) *= *"([^"]*)".*/,'"$1": "$2"'),1<(e=e.replace(/^ *([a-z]*) *= *"([^"]*)"/,"")).trim().search(">")&&(a+=", ");if(e.trim().match("^/>"))return a+="}]",void e.trim().replace("/>","");if(a+="}, ",(e=e.replace(/^ *>/,"")).replace(new RegExp("^ *([^<]*).*"),"$1"))a+='"'+e.replace(/<.*/,"")+'"',0===(e=e.replace(/^ *[^<]*/,"")).trim().search("\x3c!--")&&(e=e.replace(/<!--[^>]*-->/,""));else{for(a+="[";0!==e.trim().search("</"+t+">");)0!==(e=r(e)).trim().search("</"+t+">")&&(a+=", ");a+="]"}a+="]",e.replace("</"+t+">","")}},window.MathJax.Hub.Queue(["toMathML",i,r]),window.MathJax.Hub.Queue(function(){""!==a&&(i.json=c.JSON.stringify(["mrow",{tex:[t]},c.JSON.parse(a)[2]]),n.set("data",i.json),o(i.json))}))})}},"@VERSION@",{requires:["dd-drag","dd-proxy","dd-drop","event","json"]});