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

/*
 * @package    atto_mathslate
 * @copyright  2014 onward Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_mathslate-button
 */

/**
 * Atto text editor mathslate plugin.
 *
 * @namespace M.atto_mathslate
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_mathslate';
var CSS = {EDITOR: 'mathslate-atto'};

Y.namespace('M.atto_mathslate').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    _currentSelection: null,
    _getTeX: null,
    initializer: function() {
        // Check whether MathJax is available.
        if (typeof MathJax === 'undefined' && !this.get('filteractive')) {
            return;
        }
        this._groupFocus = {};

        this.addButton({
            icon: 'mathslate',
            iconComponent: COMPONENTNAME,
            callback: this._displayDialogue
        });
        M.tinymce_mathslate.help = this.get('helpurl');
    },
    _displayDialogue: function() {
        var editorID = Y.guid();
        var config = this.get('configurl');

        var host = this.get('host');

        // Store the current selection.
        this._currentSelection = host.getSelection();
        var currentSelection = host.getSelection();
        if (this._currentSelection === false) {
            return;
        }

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('pluginname', COMPONENTNAME),
            bodyContent: '<div style="height:500px"></div>',
            width: 500
        }, true);
        dialogue.show();
        dialogue.set('bodyContent', '<div class="filter_mathjaxloader_equation"><div id="'
            + editorID
            + '"></div><!--\\( \\)--></div>');

        // Trigger Mathjaxloader so that it will load MathJax.
        Y.fire(M.core.event.FILTER_CONTENT_UPDATED, {nodes: (new Y.NodeList(dialogue.get('boundingBox')))});

        var me;
        var context = this;
        window.setTimeout(function() {
            me = new M.tinymce_mathslate.Editor('#' + editorID, config);
            Y.one('#' + editorID).addClass(CSS.EDITOR);
            var cancel = Y.one('#' + editorID).appendChild(Y.Node.create('<button>Cancel</button>'));
            var displayTex = Y.one('#' + editorID).appendChild(Y.Node.create('<button>Display TeX</button>'));
            var inlineTex = Y.one('#' + editorID).appendChild(Y.Node.create('<button>Inline TeX</button>'));
            cancel.on('click', function(){
                dialogue.hide();
            });
            displayTex.on('click', function() {
                dialogue.hide();
                host.setSelection(currentSelection);
                host.insertContentAtFocusPoint('\\[' + me.output('tex') + '\\]');
                context.markUpdated();
            });
            inlineTex.on('click', function() {
                dialogue.hide();
                host.setSelection(currentSelection);
                host.insertContentAtFocusPoint('\\(' + me.output('tex') + '\\)');
                context.markUpdated();
            });
        }, (typeof window.MathJax === 'undefined') ? 500 : 0);

    }
}, {
    ATTRS: {
        /**
         * The url of the configuration file for mathematics templates
         *
         * @attribute configurl
         * @type string
         */
        configurl: {
            value: null
        },
        /**
         * The url of the help file
         *
         * @attribute helpurl
         * @type string
         */
        helpurl: {
            value: null
        }
    }
});
