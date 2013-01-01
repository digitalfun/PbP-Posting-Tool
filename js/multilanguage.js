<!-- hide from HTML

/*
------------------------------
File: multilanguage.js
Type: JavaScript
Author/Copyright: Florian Schmid (LordSmith)
Company: private
Desc:
Multilanguage support.

Note:
-----------------------------
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

	//activate language
	postingTool.multiLanguage.activate[lang]();
	
	//translate page with choosen lang
	postingTool.multiLanguage.translate();
	
*/
postingTool.multiLanguage = (function ( ) {
	var that = { };
	
	//language-strings
	that.strings = { 
		title: 'strings.title',
		forumtext: 'strings.forumtext',
		generate: 'strings.generate',
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
	
	that.activate = (function ( ) {
		var that = { };
		
		// MULTILANGUAGE: Deutsch	
		that.de = function () {
			var strings = postingTool.multiLanguage.strings;
			postingTool.multiLanguage.strings.title='Posting Tool fürs Forenspiel (Play by Post)';
			strings.forumtext = 'Forumstext';
			strings.generate = 'Text erstellen';
			strings.reset='Zurücksetzen';
			strings.select='Auswählen';
			strings.talk='Sprechen';
			strings.talk_title='Sprechen';
			strings.think='Denken';
			strings.think_title='Denken';
			strings.ooc='OOC';
			strings.ooc_title='Out Of Character';
			strings.roll='Würfeln';
			strings.roll_title='Würfeln';
			strings.insert='zum Forumstext hinzufügen';
			strings.character='Charakter';
			strings.character_title='Name des Charakters';
		};

		// MULTILANGUAGE: English	
		that.en = function () {
			var strings = postingTool.multiLanguage.strings;
			strings.title='Posting Tool for Forum-PbP (Play by Post)';
			strings.forumtext = 'Forum';
			strings.generate = 'Generate Text';
			strings.reset='Reset';
			strings.select='Select';
			strings.talk='Talk';
			strings.talk_title='Talk';
			strings.think='Think';
			strings.think_title='Think';
			strings.ooc='OOC';
			strings.ooc_title='Out Of Character';
			strings.roll='Roll';
			strings.roll_title='Roll';
			strings.insert='Add to forumtext';
			strings.character='Character';
			strings.character_title='Name of character';
		};	
		
		return that;
	}());
	
	that.translate = function () {
		$(".mlTITLE").text(that.strings.title);
		$(".mlFORUMTEXT").text(that.strings.forumtext);
		$(".mlGENERATE").text(that.strings.generate);
		$(".mlINSERT").text(that.strings.insert);
		$(".mlRESET").text(that.strings.reset);
		$(".mlSELECT").text(that.strings.select);
		$(".mlCHAR").text(that.strings.character);
		$(".mlTALK").text(that.strings.talk);
		$(".mlTHINK").text(that.strings.think);
		$(".mlROLL").text(that.strings.roll);
		$(".mlOOC").text(that.strings.ooc);
		
		$(".mlCHAR_title").attr("title", that.strings.character_title);
		$(".mlTALK_title").attr("title", that.strings.talk_title);
		$(".mlTHINK_title").attr("title", that.strings.think_title);
		$(".mlOOC_title").attr("title", that.strings.ooc_title);
		$(".mlROLL_title").attr("title", that.strings.roll_title);
	};
	
	return that;
}());

-->