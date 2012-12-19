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

/*md# Namespace postingTool #################*/
var postingTool = postingTool || { };


//extend 
postingTool.extension.create( function() {
	console.log("ds extension: extension created");

	//add a DS-icon before the charname
	postingTool.settings.codeChar = ":ds: [color=blue][size=12pt][b]" +postingTool.settings.userTextTag+ ":[/b][/size][/color]\n";
	
	document.title += " - DS"; 
	
	/*
	get cookie information (from diChB export)
	*/
	var dichbImport = postingTool.extension.ds.tools.getCookie("dichb_export");
	
	if( dichbImport !== "") {
		try {
			postingTool.extension.ds.dichbChar = jQuery.parseJSON( dichbImport);
		}
		catch( err) {
			postingTool.extension.ds.dichbChar = 0;
		}	
		
		if( postingTool.extension.ds.dichbChar === null) {
			postingTool.extension.ds.dichbChar = 0;
		}
	}
	
	if ( postingTool.extension.ds.dichbChar !== 0) {
		console.log( "ds extension: diChB export data found: " +postingTool.extension.ds.dichbChar.name);
	}
	else {
		console.log( "NO diChB export data found!");
	}
	

	//add title: DS symbol and extension title
	var appendTitle = "<b><img src='http://s176520660.online.de/dungeonslayers/forum/Smileys/default/ds.gif' alt='DS'/>";
	//if chardata imported from dichb -> add info
	if( postingTool.extension.ds.dichbChar !== 0) {
		appendTitle += "  <b>diChB import: " +  postingTool.extension.ds.dichbChar.name +"</b><br>"; 
	}
	else {
		appendTitle += "  DungeonSlayer <br>";
	}
	
	$("#title").append( appendTitle);
	

	//add a new div in the TAB Roll
	var $rolldiv = $("#tabcontent_roll");	
	$rolldiv.append('<br /><br /><strong>Probe</strong><br />');
	
	//create selection-list
	var createOption = postingTool.extension.ds.tools.createOption;
	var $append = $("<select id=selectProbe onchange='postingTool.extension.ds.selectProbe_onChange();'>");
	$append.append( createOption("", ""));
	$append.append( createOption("Schlagen:", "Kampfwert: Schlagen"));
	$append.append( createOption("Schiessen:", "Kampfwert: Schiessen"));
	$append.append( createOption("Abwehr:", "Kampfwert: Abwehren"));
	$append.append( createOption("Zaubern:", "Kampfwert: Zaubern"));
	$append.append( createOption("Zielzaubern:", "Kampfwert: Zielzauber"));
	$append.append( createOption("Aufwachen:KÖR,HÄ", "Aufwachen (wenn Bewusstloser geweckt wird)"));
	$append.append( createOption("Bemerken:GEI,VE", "Bemerken (min.8, Diebeskunst,Wahrnehmung)"));
	$append.append( createOption("Erwachen:GEI,VE", "Erwachen (Schnelle Reflexe,Wahrnehmung)"));
	$append.append( createOption("Falle entschärfen:GEI,GE", "Fallen entschärfen (Diebeskunst)"));
	$append.append( createOption("Feilschen:GEI,VE,AU", "Feilschen(Charmant,Schlitzohr)"));
	$append.append( createOption("Feuer machen:GEI,GE", "Feuer machen (Jäger)"));
	$append.append( createOption("Flirten:GEI,AU", "Flirten (Charmant)"));
	$append.append( createOption("Gift trotzen:KÖR,HÄ", "Gift trotzen (Einstecker)"));
	$append.append( createOption("Inschrift entziffern:GEI,VE", "Inschrift entziffern (Wahrnehmung,Bildung)"));
	$append.append( createOption("Klettern:AGI,ST", "Klettern (Akrobat,Kletterass)"));
	$append.append( createOption("Kraftakt:KÖR,ST", "Kraftakt (Brutaler Hieb,Vernichtender Schlag)"));
	$append.append( createOption("Krankheit trotzen:KÖR,HÄ", "Krankheit trotzen (Einstecker)"));
	$append.append( createOption("Magie spüren:GEI,AU", "Magie spüren (nur Zauberwirker)"));
	$append.append( createOption("Magie begreifen:GEI,VE", "Magie begreifen (nur Zauberwirker)"));
	$append.append( createOption("Mechanismus öffnen:GEI,GE,VE", "Mechanismus öffnen (Diebeskunst,Handwerk,Schlossknacker)"));
	$append.append( createOption("Orientieren:GEI,VE,AU", "Orientieren (Jäger)"));
	$append.append( createOption("Reiten:AGI,BE,AU", "Reiten (Reiten, Sattelschütze,Tiermeister)"));
	$append.append( createOption("Schätzen:GEI,VE", "Schätzen (Beute schätzen)"));
	$append.append( createOption("Schleichen:AGI,BE", "Schleichen (Heimlichkeit)"));
	$append.append( createOption("Schloss öffnen:GEI,GE", "Schlösser öffnen (Diebeskunst,Schlossknacker)"));
	$append.append( createOption("Schwimmen:AGI,BE", "Schwimmen (Schwimmen)"));
	$append.append( createOption("Springen:AGI,BE", "Springen (Akrobat)"));
	$append.append( createOption("Spuren lesen:GEI,VE", "Spuren lesen (Jäger,Wahrnehmung)"));
	$append.append( createOption("Suchen:GEI,VE", "Suchen (min.8, Diebeskunst,Heimlichkeit,Wahrnehmung)"));
	$append.append( createOption("Taschendiebstahl:AGI,GE", "Taschendiebstahl (Diebeskunst,Heimlichkeit)"));
	$append.append( createOption("Verbergen:AGI,BE", "Verbergen (Heimlichkeit)"));
	$append.append( createOption("Verständigen:GEI,GE", "Verständigen (Bildung)"));
	$append.append( createOption("Wissen:GEI,VE", "Wissen (Bildung,Wissensgebiet)"));
	$append.append( createOption("Zauber wechseln:GEI,VE", "Zauber wechseln"));
	$append.append("</select>");
	//append content to the "Roll dice"-div
	$rolldiv.append( $append);

	$rolldiv.append( $('<br /><strong>Probenwert</strong><br />	<TEXTAREA id="text_RollProperties" class=textarea_entry rows=2 cols=20></TEXTAREA>'));
});

//overwrite code.Char
postingTool.code["char"] = function () {
console.log("ds extension: code.char()");	

	var sChar = $("textarea#text_charactername").val();
	if ( sChar === "") {
		if ( g_dichbChar != 0) {
			sChar = g_dichbChar.name;
		}
	}
	var sCode = postingTool.settings.codeChar;
	sCode = sCode.replace( postingTool.settings.userTextTag, sChar);
	this.append( sCode);
return sCode;
}

//overwrite code.Roll
postingTool.code["roll"] = function() {
console.log("ds extension: Code.Roll()");

	var sCode = "[roll]";
	sCode += "{";
	
	//add description (if given by user)
	var sDesc = $("textarea#text_roll_desc").val();
	( sDesc != "") ? sCode += sDesc +"; " : sCode += "";

	//add the Proben-Text
	var theProps = $("#selectProbe").val();
	if( theProps != "") {
		theProps = theProps.split(":");
		
		switch ( theProps[ 0]) {
			case 'Schlagen': sCode += ":kw5: "; break;
			case 'Schiessen': sCode += ":kw6: "; break;
			case 'Abwehr': sCode += ":kw2: "; break;
			case 'Zaubern': sCode += ":kw7: "; break;
			case 'Zielzauber': sCode += ":kw8: "; break;
			
			default: sCode += theProps[ 0]; 
		}
	}
	else {
		sCode += "PW ";
	}
	
	
	//calc the values of the Probenwert	
	var theProbenwerte = $( "#text_RollProperties").val( );

	if( theProbenwerte != "") { 

		var nTotal = 0;
		var nCount = 0;
		var nPosStart = 0;
		var nPosEnd = 0;
		var sSearch = theProbenwerte;
		var nResult = 0;
		
		//loop all "(xx)"
		nPosStart = sSearch.indexOf( "(");
		while ( nPosStart != -1) {
			//if no ")" (closing) found, exit
			nPosEnd = sSearch.indexOf( ")");
			if( nPosEnd == -1) break;

			nCount++;
			nPosStart++;
			nResult = parseInt( sSearch.substr( nPosStart, nPosEnd));
			if( isNaN( nResult) == false) {
				nTotal += nResult;
			}
			nPosEnd++;
			sSearch = sSearch.substring( nPosEnd);
			nPosStart = sSearch.indexOf( "(");
		} //while
		
		if( nCount == 1) sCode += " - " +theProbenwerte +" | ";
		else sCode += " - " +theProbenwerte +"= " +nTotal +" | ";
	} //if	
	
	
	
	
	sCode += "}";
	sCode += $("textarea#text_roll_dice").val();
	sCode += "x" + $("textarea#text_roll_times").val();
	sCode +="[/roll]\n";
	
	Code.append( sCode);
return sCode;
}

/*md# NAMESPACE postingTool.extension.ds #####################*/
postingTool.extension.ds = { };

postingTool.extension.ds.dichbChar = 0;

postingTool.extension.ds.selectProbe_onChange = function() {
console.log("selectProbe_onChange()")

	var theProps = $("#selectProbe").val();
	var theProps = theProps.split(":");
	//if no properties, leave
	if( theProps.length == 1) {
		return (false);
	}

	var sText = "";
	var sValue = "";
	
	if( g_dichbChar != 0) {
	
		//check if Kampfwert 
		switch( theProps[ 0]) {
			case "Schlagen":
				sValue = g_dichbChar.schlagen;	
			break;
			case "Schiessen":
				sValue = g_dichbChar.schiessen;	
			break;
			case "Abwehr":
				sValue = g_dichbChar.abwehr;	
			break;
			case "Zauber":
				sValue = g_dichbChar.zaubern;	
			break;
			case "Zielzaubern":
				sValue = g_dichbChar.zielzaubern;	
			break;
			
			default:
		}
	}
	
	//check Eigenschaften/Attribute
	theProps = theProps[ 1];
	theProps = theProps.split(",");
	
	if( g_dichbChar != 0) {
		for( x in theProps) {
			switch( theProps[ x]) {
				case "KÖR":
					sValue = g_dichbChar.kor;
				  break;
				case "ST":
					sValue = g_dichbChar.st;
				  break;
				case "HÄ":
					sValue = g_dichbChar.ha;
				  break;

				case "AGI":
					sValue = g_dichbChar.agi;
				  break;
				case "GE":
					sValue = g_dichbChar.ge;
				  break;
				case "BE":
					sValue = g_dichbChar.be;
				  break;

				case "GEI":
					sValue = g_dichbChar.gei;
				  break;
				case "VE":
					sValue = g_dichbChar.ve;
				  break;
				case "AU":
					sValue = g_dichbChar.au;
				  break;

				default:
			}		
		sText += theProps[ x] +"(" +sValue +") ";	
		}
	}	
	else {
		for( x in theProps) {
			sText += theProps[ x] +"(" +sValue +") ";	
		}
	}
	

	$( "#text_RollProperties").val( sText);
	
return (true);
}


/*md# NAMESPACE postingTool.extension.ds.tools #####################*/
postingTool.extension.ds.tools = { };

/*md## createOption(inValue, inText) : jQuery-obj
Create an option for a HTML selection-list (SELECT-tag) with the value of **inValue** and displaying the text **inText**.

__inValue__ : string
The Value of the option.

__inText__ : string
The text that is displayed in the list.

__Returns__ jQuery-object
Representing a HTML **OPTION**-tag.
*/
postingTool.extension.ds.tools.createOption = function( inValue, inText) {
	var $option = $("<option value='" +inValue +"'>" +inText +"</option>");
	return $option;
}


/*md## getCookie( inName ) : jQuery-obj
from http://www.w3schools.com/js/js_cookies.asp

Get a cookie-value and returns its value.
Returns an empty string if no cookie with that name was found.

**example**
"postingtool_ds.html?lang=en"
*/
postingTool.extension.ds.tools.getCookie = function( c_name) {
	if ( document.cookie.length >0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start = c_start +c_name.length +1;
			c_end = document.cookie.indexOf(";", c_start);
	    
			if ( c_end == -1) 
				c_end = document.cookie.length;
	    
			return unescape(document.cookie.substring(c_start, c_end));
	    }
	}
  
return "";
}