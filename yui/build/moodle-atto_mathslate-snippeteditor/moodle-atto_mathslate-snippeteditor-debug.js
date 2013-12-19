YUI.add('moodle-atto_mathslate-snippeteditor', function (Y, NAME) {

M.atto_mathslate = M.atto_mathslate|| {};
M.atto_mathslate.mSlots= function(){
        var slots=[];
        this.slots=slots;
    this.createItem = function(json) {
        function findBlank(snippet) {
            if (Array.isArray(snippet[2])) {
                snippet[2].forEach(function(a){
                    if (Array.isArray(a)) {
                        findBlank(a);
                    }
                    else if(a==='[]') {
                        var newID=Y.guid();
                        slots.push([['mi',{id: newID, "class": 'blank'},'[drop]']]);
                        snippet[2][snippet[2].indexOf(a)]=['mrow',{},slots[slots.length-1]];
                    }
                });
            }
        }
   
        var newID=Y.Node.create('<span></span').generateID();
        var newMath;

        newMath=Y.JSON.parse(json);
        newMath[1].id=newID;
            findBlank(newMath);
        return newMath;
    },
    this.getItemByID = function(id){
        var str;
        this.slots.forEach(function(slot){
            slot.forEach(function (m){
                if(m[1].id===id) {str = Y.JSON.stringify(m);}
            });
        });
        return str;},
    this.isItem = function(id) {
        var found=false;
        this.slots.forEach(function(slot){
            if(found) {return;}
            slot.forEach(function (m){
                if(m[1].id===id) {found=true;}
            });
        });
        return found;},
    this.removeSnippet = function(id){
        var item=0;
        this.slots.forEach(function(slot){
            slot.forEach(function (m){
                if(m[1].id===id) {
                    item=m;
                    slot.splice(slot.indexOf(m),1);
                }
            });
        });
        return item;
    },
    this.insertSnippet = function(id,s){
        var item=0;
        this.slots.forEach(function(slot){
            slot.forEach(function (m){
                if(item!==0){return;}
                if(m[1].id===id) {
                    item=m;
                    slot.splice(slot.indexOf(item),0,s);
                }
            });
        });
        return ;
    },
    this.forEach = function(f){
        this.slots.forEach(function(slot){
            slot.forEach(function (m){
                f(m,slot);
                });
            });
        },
    this.rekey = function(){
        var buffer=this;
        this.slots.forEach(function(s){
            if(s.length===0)  {
                s.push(['mi',{id: Y.guid(), "class": 'blank'},'[drop]']);
            }
            else {
                s.forEach(function(m){
                    if(!m[1]) {return;}
                    if(m[1]['class']&&m[1]['class']==='blank'&&s.length>1) {buffer.removeSnippet(m[1].id);}
                    if(m[1].id) {m[1].id=Y.guid();}
                });
            }
            
        });
    },
    this.output = function (format) {
            function generateMarkup (s) {
               var str='';
               if (typeof s === 'string') {
                   return s;
               }
               if (s[1]&&s[1][format]){
                  var i=0;
                  while (s[1][format][i]) {
                     str=str+s[1][format][i++];
                     if (s[2]&&typeof s[1][format][i]==='number') {
                            str=str+generateMarkup(s[2][s[1][format][i]]);
                     }
                     i++;
                  }
               }
               else if (s[2]) {
                   if(typeof s[2] === 'string') {
                      str=str+s[2];
                   }
                   else {
                       s[2].forEach(function(t){
                           str=str+generateMarkup(t);
                       });
                   }
               }
               return str;
            }
            var str='';
            slots[0].forEach(function(s) {
               str=str+generateMarkup(s);
               });
            return str;
    };
};


}, '@VERSION@', {"requires": ["json"]});
