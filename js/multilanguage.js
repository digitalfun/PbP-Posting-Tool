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

	that.translate = function() {
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

	that.activate = (function ( ) {
		var that = { };
		
		// MULTILANGUAGE: Deutsch	
		that.de = function() {
			mlTITLE='Posting Tool f�rs Forenspiel (Play by Post)';
			mlRESET='Zur�cksetzen';
			mlSELECT='Ausw�hlen';
			mlTALK='Sprechen';
			mlTALK_title='Sprechen';
			mlTHINK='Denken';
			mlTHINK_title='Denken';
			mlOOC='OOC';
			mlOOC_title='Out Of Character';
			mlROLL='W�rfeln';
			mlROLL_title='W�rfeln';
			mlINSERT='Einf�gen';
			mlCHAR='Charakter';
			mlCHAR_title='Name des Charakters';
		};

		// MULTILANGUAGE: English	
		that.en = function() {
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
		
		return that;
	}());
	
	return that;
}());


var mlDeutsch = function() {

}

var mlEnglish = function () {

}

-->