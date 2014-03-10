atto_mathslate
=================

Mathslate is a graphical tool for constructing mathematics within Moodle.
This plugin adds the tool to the Atto editor available as a plugin for
Moodle 2.5 and 2.6.  Install this directory as a subdirectory in the Moodle
directory lib/editor/atto/plugins with the named mathslate.  Also install
the corresponding plugin for tinymce in lib/editor/tinymcie/plugins/mathslate.
Then visit the administrators notification page to install the plugin
to the database and adjust the settings.  The settings common to both
will appear in the TinyMCE settings submenu.

This requires MathJax to run. It will load and configure MathJax if it is
not already configured site wide. It is not compatible with the 'Safe'
configuration option in MathJax.  The 'Safe' option will interfere with
some of the drag and drop functionality. For more information of MathJax
see mathjax.org.

All original files are copyright Daniel Thies 2013-4
dthies@ccal.edu
and are licensed under the included GPL 3
