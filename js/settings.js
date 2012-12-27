/*
------------------------------
File: settings.js
Type: JavaScript
Author/Copyright: Florian Schmid (LordSmith)
Company: private
Desc:
Settings

Note:
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

//object postingTools.settings
postingTool.settings = (function ( ) {
	var that = { };
	
	//lang : string
	//The language setting.
	//
	//list of available languages
	//- de : German
	//- en : English
	that.lang = "en";
	
	//dice : string
	//the standard dice for rolls
	//
	//values (XdY): 1d6 | 1d20 | ...
	that.dice = "1d20";
	
	//showTitle : String
	//if this is not "" (empty string) the title will not be shown
	that.showTitle = "";
	
	//Method getURLParams( )
	//
	//get params from URL Paramters
	//
	//example for a URL with params:
	//- language: german (lang=de)
	//- dice: 1d6 (dice=1d6)
	//- custom title: Create your post here (title="Create your post here")
	//resulting url: "...\postingtool.html?lang=de&dice=1d6"
	that.getURLParams = function ( ) {
	
		//get language from URL-parameter (/default "en" (english))
		that.lang = postingTool.tools.gup("lang");
		if( that.lang === "") { that.lang = "en"; };
		
		//get dice-setting from URL-parameter
		that.diceStandard = postingTool.tools.gup("dice"); 
		if( that.diceStandard === "") { that.diceStandard = "1d20"; };
		
		//get dice-setting from URL-parameter
		that.showTitle = postingTool.tools.gup("title"); 
		
	}

	/*
		settings for BBCode generation
	*/
	
	//userTextTag : this tag will be replaced by the text of the user
	that.userTextTag	= "CODECOMESHERE";
	
	that.codeChar	= "[color=blue][size=12pt][b]" +that.userTextTag+ ":[/b][/size][/color]\n";
	that.codeSpeak	= "[color=blue]>>" +that.userTextTag+ "<<[/color]\n";
	that.codeThink	= "[i]>>" +that.userTextTag+ "<<[/i]\n";
	that.codeOOC	= "[color=red][size=8pt][i]" +that.userTextTag+ "[/i][/size][/color]\n";
	
	return that;
	
}());