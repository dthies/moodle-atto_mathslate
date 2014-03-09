<?php
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
 * Atto text editor integration version file.
 *
 * @package    atto_mathslate
 * @copyright  2013 Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_mathslate_init_editor($elementid) {
    global $PAGE, $OUTPUT, $CFG;

    $icon = array('mathslate', 'atto_mathslate');

    $PAGE->requires->strings_for_js(array( 'mathslate'),'atto_mathslate');

    $PAGE->requires->yui_module('moodle-atto_mathslate-button',
                                'M.atto_mathslate.init',
                                array(array('elementid'=>$elementid, 'icon'=>$icon, 'group'=>'mathslate', 'config'=>$CFG->wwwroot . '/lib/editor/atto/plugins/mathslate/config.json')),
                                true);

}

/**
 * Return the order this plugin should be displayed in the toolbar
 * @return int the absolute position within the toolbar
 */
function atto_mathslate_sort_order() {
    return 21;
}
