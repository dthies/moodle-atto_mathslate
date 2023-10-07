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
 * Atto text editor Mathslate integration version file.
 *
 * @package    atto_mathslate
 * @copyright  2013 onward Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require('../../../../../config.php');

require_login();

?> 
<h3>Selecting mathematics</h3>

<p>Mathslate does not the allow the selection of individual characters
as with a word processor, but instead treats mathematics as blocks
of code associated with well defined mathematical expressions. A
selected expression appears highlighted in the work space, and the
block of code appears with a cursor in front of it below the work space.
<h3>Moving mathematics</h3>

<p>To move an expression simply select an element after the place it
should be inserted on work space and then click the expression to move
there. Alternatively, you may simply drag the expression to where it
should be inserted.

<h3>Editing functions</h3>

<p>There is a row of buttons in the center of the editor that allows
the user to delete a selection or the whole content, undo the previous
action, and redo previously undone actions.

<p><a href="http://docs.moodle.org/en/Mathslate_for_Atto"
target="_blank">more information</a>
