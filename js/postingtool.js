/*
------------------------------
File: postingtool.js
Type: JavaScript
Author/Copyright: Florian Schmid (LordSmith)
Company: private
Desc:
Creates Forum-Code for Play-By-Post Forum Roleplaying sessions.

Note:
uses jQuery
-----------------------------
 VERSION HISTORY:
 1.0: first release
 */

/*
###########################
LICENSE START
"MIT License"
http://www.opensource.org/licenses/mit-license.php
###########################
Copyright (c) 2011 Florian Markus Schmid (aka LordSmith aka DM Spry), Switzerland

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

###########################
LICENSE END
###########################
*/

//namespace postingTool
var postingTool = postingTool || { };

postingTool.setup = function () {

	//get URL parameters
	postingTool.settings.getURLParams( );		
	
	//activate language according to URL parameter (or if not given, standard value)
	if( postingTool.multiLanguage.activate[postingTool.settings.lang] !== undefined ) {
		postingTool.multiLanguage.activate[postingTool.settings.lang]( );
	}
	else {
		alert( "FAILURE! URL Paramter [lang=" + postingTool.settings.lang + "] is not supported!");
	}
	
	//if custom title is given by URL Parameters then overwrite title
	if( postingTool.settings.showTitle !== "") {
		$(".mlTITLE").hide();
	}
	
	postingTool.tables.hideAll();
	
	//query all tablecells (=tabs)
	var $tabcell = $("td.tabs_tablecell");

	//all tablecells: attach a click event
	$tabcell.click( function() {
		postingTool.tables.onClick( $(this));
	});
	
	//all tablecells: make the tab-mousecursor to a "hand" when mouseover
	$tabcell.hover( function() { 
		$(this).attr("style.cursor", "pointer");
	});
	
	//all BUTTONS: add CSS classes
	$(":button").addClass("css_button");
	
	//set setting of dice
	$("#text_roll_dice").val( postingTool.settings.dice);
	
	//multilanguage translation by CSS-classes
	postingTool.multiLanguage.translate( );

	//install extension 
	postingTool.extension.extend();
	
}; //postingTool.setup()
	
		
//OBJECT postingTool.tables		
postingTool.tables = {

	onClick : function ( $tab) { 
		var $content, sID;
		
		//remove selection from previously selected tab
		$("td.tabs_tablecell.is_selected").removeClass("is_selected");

		//hide the previous tab-content
		$content = $(".tab.is_visible");
		$content.removeClass("is_visible");
		$content.hide();
		
		
		//highlight the new tab
		$tab.addClass("is_selected");
		
		//show and focus new tab-content
		sID = $tab.attr("id");
		sID = "tabcontent" +sID.slice( sID.lastIndexOf( "_"));
console.log( 'postingTool.tables.onClick( $tab): show tab-content of id: ' +sID);
		$content = $("#" +sID);
		$content.addClass("is_visible");
		$content.show()
		
		$content = $("#" +sID +" > textarea.textarea_entry");
		$content.focus();
	},
	
	
	hideAll : function( ) {
		var $tabs = $(".tab");
		$tabs.hide();
	},
	
	
	show : function( ) {
		
	},
	
	clearActiveContent : function() {
		var $content = $(".tab.is_visible, textarea.textarea_entry");
		$content.val("");
		//$content.focus();
	},
};



postingTool.code = {
	
	"char" : function () {
		var sInsert = $("#text_charactername").val();
		var sCode = postingTool.settings.codeChar;
		sCode = sCode.replace( postingTool.settings.userTextTag, sInsert);
		postingTool.code['append']( sCode);
	return sCode;
	},
	
	
	"speak" : function () {
		var sInsert = $("#text_speak").val();
		var sCode = postingTool.settings.codeSpeak;
		sCode = sCode.replace( postingTool.settings.userTextTag, sInsert);
		postingTool.code['append']( sCode);
	return sCode;
	},
	
	
	"think" : function () {
		var sInsert = $("#text_think").val();
		var sCode = postingTool.settings.codeThink;
		sCode = sCode.replace( postingTool.settings.userTextTag, sInsert);
		postingTool.code['append']( sCode);
	return sCode;
	},

	
	"ooc" : function () {
		var sInsert = $("#text_ooc").val();
		var sCode = postingTool.settings.codeOOC;
		sCode = sCode.replace( postingTool.settings.userTextTag, sInsert);
		postingTool.code['append']( sCode);
	return sCode;
	},
	
	
	"roll" : function () {
		var sCode = "[roll]";
		
		//add description (if given by user)
		var sDesc = $("#text_roll_desc").val();
		( sDesc != "") ? sCode += "{" + sDesc +" | } " : sCode += "";
			
		sCode += $("#text_roll_dice").val();
		sCode += "x" + $("#text_roll_times").val();
		sCode +="[/roll]\n";
		
		postingTool.code['append']( sCode);
	return sCode;
	},
	
	"append" : function( sText) {
		var $maincode = $("#text_forumcode");
		var sNewCode = $maincode.val() +sText;
		$maincode.val( sNewCode);
	},
	
};

postingTool.extension = {
	create : function ( in_fn) {
		postingTool.extension.extend = in_fn;
	},
	
	extend : function() {
	},
};

///////////////////////////////////////////////
// NAMESPACE postingTools.tools
///////////////////////////////////////////////
postingTool.tools = postingTool.tools || { };


// Grab URL Parameter (gup)
// SOURCE: http://www.netlobo.com/url_query_string_javascript.html
//
// EXAMPLE: 
// http://www.foo.com/index.html?bob=123&frank=321&tom=213
// javascript: var param = gup("frank");
// param will contain "321"
postingTool.tools.gup = function ( name ){

  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ) {
	return "";
  }
  else {
	return results[1];
  }
  
};
	