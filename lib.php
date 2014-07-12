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
 * Return the order this plugin should be displayed in the toolbar
 * @return int the absolute position within the toolbar
 */

function atto_mathslate_strings_for_js() {
global $PAGE;

$PAGE->requires->strings_for_js(array( 'mathslate', 'cancel', 'cancel_desc',
        'inline', 'display', 'inline_desc', 'display_desc', 'nomathjax',
        'clear', 'undo', 'redo', 'help'), 'tinymce_mathslate');
};

function atto_mathslate_params_for_js($elementid, $options, $fpoptions) {
    global $CFG;
    $context = $options['context'];
    if (!$context) {
        $context = context_system::instance();
    }

    $filteractive = array_key_exists('mathjaxloader', filter_get_active_in_context($context));

    $config = $CFG->wwwroot . '/lib/editor/tinymce/plugins/mathslate/config.json';
    $icon = $CFG->wwwroot . '/lib/editor/atto/plugins/mathslate/pix/mathslate.png';
    return array('configurl' => $config,
                'filteractive' => $filteractive,
                'iconurl' => $icon
    );
}
