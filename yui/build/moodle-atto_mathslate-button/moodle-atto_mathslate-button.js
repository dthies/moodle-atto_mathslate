YUI.add('moodle-atto_mathslate-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor mathslate plugin.
 *
 * @package    editor-atto
 * @subpackage    mathslate
 * @copyright  2013 Daniel Thies  <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_mathslate = M.atto_mathslate || {};
M.atto_mathslate={
    /**
     * The window used to hold the editor.
     *
     * @property dialogue
     * @type M.core.dialogue
     * @default null
     */
    dialogue : null,

    /**
     * The selection object returned by the browser.
     *
     * @property selection
     * @type Range
     * @default null
     */
    selection : null,

    /**
     * The configuration json string for math tools.
     *
     * @property config
     * @type Range
     * @default null
     */

    config: null,

display_matheditor : function(e, elementid) {
        e.preventDefault();
        if (!M.editor_atto.is_active(elementid)) {
            M.editor_atto.focus(elementid);
        }
        M.atto_mathslate.selection = M.editor_atto.get_selection();
        if (M.atto_mathslate.selection !== false) {
            var dialogue = M.atto_mathslate.dialogue|| new M.core.dialogue({
                    visible: false,
                    modal: true,
                    close: true,
                    draggable: true
                });
            dialogue.render();
            var editorID=Y.guid();
            dialogue.set('bodyContent', '<div id="'+editorID+'" ></div>');
            dialogue.set('headerContent', M.util.get_string('mathslate', 'atto_mathslate'));
            dialogue.show();
            var me=new M.local_mathslate.Editor('#'+editorID,M.atto_mathslate.config);
            var cancel=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Cancel</button>'));
            var displayTex=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Display TeX</button>'));
            var inlineTex=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Inline TeX</button>'));
            cancel.on('click',function(){
                dialogue.hide();
            });
            displayTex.on('click',function(){
                M.editor_atto.set_selection(M.atto_mathslate.selection);
                document.execCommand('insertHTML', false, '\\['+me.output('tex')+'\\]');
                dialogue.hide();
            });
            inlineTex.on('click',function(){
                M.editor_atto.set_selection(M.atto_mathslate.selection);
                document.execCommand('insertHTML', false, '\\('+me.output('tex')+'\\)');
                dialogue.hide();
            });
            MathJax.Hub.Queue(['Typeset',MathJax.Hub,me.node.generateID()]);


            M.atto_mathslate.dialogue = dialogue;
        }
    },


    /**
     * Add this button to the form.
     *
     * @method init
     * @param {Object} params
     */
    init : function(params) {
        M.atto_mathslate.config=params.config;
        M.editor_atto.add_toolbar_button(params.elementid, 'mathslate', params.icon, params.group, this.display_matheditor, this);
    }

};


}, '@VERSION@', {"requires": ["escape", "moodle-local_mathslate-editor"]});
