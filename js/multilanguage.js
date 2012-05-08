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


/* 
@object: MultiLanguage
@Usage:
	var lang = "de"; //or "en" etc
	
	//default ENGLISH (en)
	if( lang === "") { lang = "en"; };
	
	//translate page with choosen lang
	MultiLanguage[lang]();
*/
var multiLanguage = {
	"de" : function() {
		mlDeutsch();
	},
	
	"en" : function() {
		mlEnglish();
	},
	
	translate : function() {
		$(".mlTITLE").text(mlTITLE);
		$(".mlINSERT").text(mlINSERT);
		$(".mlRESET").text(mlRESET);
		$(".mlSELECT").text(mlSELECT);
		$(".mlCHAR").text(mlCHAR);
		$(".mlOOC").text(mlOOC);
		
		$(".mlCHAR_title").attr("title", mlCHAR_title);
		$(".mlTALK_title").attr("title", mlTALK_title);
		$(".mlTHINK_title").attr("title", mlTHINK_title);
		$(".mlOOC_title").attr("title", mlOOC_title);
		$(".mlROLL_title").attr("title", mlROLL_title);
	}
}

var mlDeutsch = function() {
// MULTILANGUAGE: Deutsch
mlTITLE='Posting Tool fürs Forenspiel (Play by Post)';
mlRESET='Zurücksetzen';
mlSELECT='Auswählen';
mlTALK='Sprechen';
mlTALK_title='Sprechen';
mlTHINK='Denken';
mlTHINK_title='Denken';
mlOOC='OOC';
mlOOC_title='Out Of Character';
mlROLL='Würfeln';
mlROLL_title='Würfeln';
mlINSERT='Einfügen';
mlCHAR='Charakter';
mlCHAR_title='Name des Charakters';
}

var mlEnglish = function () {
// MULTILANGUAGE: English
mlTITLE='Posting Tool for Forum-PbP (Play by Post)';
mlRESET='Reset';
mlSELECT='Select';
mlTALK='Talk';
mlTALK_title='Talk';
mlTHINK='Think';
mlTHINK_title='Think';
mlOOC='OOC';
mlOOC_title='Out Of Character';
mlROLL='Roll';
mlROLL_title='Roll';
mlINSERT='Insert';
mlCHAR='Character';
mlCHAR_title='Name of character';
}

-->