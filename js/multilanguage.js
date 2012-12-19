<!-- hide from HTML

/*
------------------------------
File: multilanguage.js
Type: JavaScript
Author/Copyright: Florian Schmid (LordSmith)
Company: private
Desc:
Support multilanguage.

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

/* 
@object: postingTool.multiLanguage
@Usage:
	//store language setting in variable
	var lang = "de"; //or "en" etc
	
	//(OPTIONAL)
	//set default language: ENGLISH (en)
	if( lang === "") { lang = "en"; };

	//translate page with choosen lang
	postingTool.multiLanguage[lang]();
	//...
	
	

*/
postingTool.multiLanguage = (function ( ) {
	var that = { };
	
	that.strings = { 
		title: 'strings.title',
		reset: 'strings.reset',
		select: 'strings.select',
		talk: 'strings.talk',
		talk_title: 'strings.talk_title',
		think: 'strings.think',
		think_title: 'strings.think_title',
		ooc: 'strings.ooc',
		ooc_title: 'strings.ooc_title',
		roll: 'strings.roll',
		roll_title: 'strings.roll_title',
		insert: 'strings.insert',
		character: 'strings.character',
		character_title: 'strings.character_title'
	};
	
	that.translate = function() {
		$(".mlTITLE").text(that.strings.title);
		$(".mlINSERT").text(that.strings.insert);
		$(".mlRESET").text(that.strings.reset);
		$(".mlSELECT").text(that.strings.select);
		$(".mlCHAR").text(that.strings.character);
		$(".mlOOC").text(that.strings.ooc);
		
		$(".mlCHAR_title").attr("title", that.strings.character_title);
		$(".mlTALK_title").attr("title", that.strings.talk_title);
		$(".mlTHINK_title").attr("title", that.strings.think_title);
		$(".mlOOC_title").attr("title", that.strings.ooc_title);
		$(".mlROLL_title").attr("title", that.strings.roll_title);
	}

	that.activate = (function ( ) {
		var that = { };
		
		// MULTILANGUAGE: Deutsch	
		that.de = function() {
			postingTool.multiLanguage.strings.title='Posting Tool fürs Forenspiel (Play by Post)';
			postingTool.multiLanguage.strings.reset='Zurücksetzen';
			postingTool.multiLanguage.strings.select='Auswählen';
			postingTool.multiLanguage.strings.talk='Sprechen';
			postingTool.multiLanguage.strings.talk_title='Sprechen';
			postingTool.multiLanguage.strings.think='Denken';
			postingTool.multiLanguage.strings.think_title='Denken';
			postingTool.multiLanguage.strings.ooc='OOC';
			postingTool.multiLanguage.strings.ooc_title='Out Of Character';
			postingTool.multiLanguage.strings.roll='Würfeln';
			postingTool.multiLanguage.strings.roll_title='Würfeln';
			postingTool.multiLanguage.strings.insert='Einfügen';
			postingTool.multiLanguage.strings.character='Charakter';
			postingTool.multiLanguage.strings.character_title='Name des Charakters';
		};

		// MULTILANGUAGE: English	
		that.en = function() {
			postingTool.multiLanguage.strings.title='Posting Tool for Forum-PbP (Play by Post)';
			postingTool.multiLanguage.strings.reset='Reset';
			postingTool.multiLanguage.strings.select='Select';
			postingTool.multiLanguage.strings.talk='Talk';
			postingTool.multiLanguage.strings.talk_title='Talk';
			postingTool.multiLanguage.strings.think='Think';
			postingTool.multiLanguage.strings.think_title='Think';
			postingTool.multiLanguage.strings.ooc='OOC';
			postingTool.multiLanguage.strings.ooc_title='Out Of Character';
			postingTool.multiLanguage.strings.roll='Roll';
			postingTool.multiLanguage.strings.roll_title='Roll';
			postingTool.multiLanguage.strings.insert='Insert';
			postingTool.multiLanguage.strings.character='Character';
			postingTool.multiLanguage.strings.character_title='Name of character';
		}		
		
		return that;
	}());
	
	return that;
}());

-->