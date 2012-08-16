<!-- hide from HTML
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

//extend 
extension.create_extension( function() {
	console.log("ds extension: extension created");

	//add a DS-icon before the charname
	code_char	= ":ds: [color=blue][size=12pt][b]" +code_tag+ ":[/b][/size][/color]\n";
	
	document.title += " - DS"; 
	
	/*
	get cookie information (from diChB export)
	*/
	var dichbImport = getCookie("dichb_export");
	g_dichbChar = 0; //GLOBAL
	
	if( dichbImport != "") {
		try {
			g_dichbChar = jQuery.parseJSON( dichbImport);
		}
		catch( err) {
			g_dichbChar = 0;
		}	
		
		if( g_dichbChar === null) {
			g_dichbChar = 0;
		}
	}
	
	if ( g_dichbChar != 0) {
		console.log( "ds extension: diChB export data found: " +g_dichbChar.name);
	}
	else {
		console.log( "NO diChB export data found!");
	}
	

	//add title: DS symbol and extension title
	var appendTitle = "<b><img src='http://s176520660.online.de/dungeonslayers/forum/Smileys/default/ds.gif' alt='DS'/>";
		//if chardata imported from dichb -> add info
		((g_dichbChar != 0) ? appendTitle += "  <b>diChB import: " +  g_dichbChar.name +"</b><br>" : "" ); 
	$("#title").append( appendTitle);
	

	//add a new div in the TAB Roll
	$rolldiv = $("#tabcontent_roll");	
	$rolldiv.append('<br /><br /><strong>Probe</strong><br />');
	
	//create selection-list
	$append = $("<select id=selectProbe onchange='selectProbe_onChange();'>");
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

//overwrite Code.Char
Code.Char = function () {
console.log("ds extension: Code.Char()");	

	var sChar = $("textarea#text_charactername").val();
	if ( sChar === "") {
		if ( g_dichbChar != 0) {
			sChar = g_dichbChar.name;
		}
	}
	var sCode = code_char;
	sCode = sCode.replace( code_tag, sChar);
	this.append( sCode);
return sCode;
}

//overwrite Code.Roll
Code.Roll = function() {
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


var createOption = function( inValue, inText) {
	var $option = $("<option value='" +inValue +"'>" +inText +"</option>");
	return $option;
}


var selectProbe_onChange = function() {
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



//FUNCTION: getCookie
//
//from 
// http://www.w3schools.com/js/js_cookies.asp
//
function getCookie( c_name) {
	if ( document.cookie.length >0)
	{
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

-->