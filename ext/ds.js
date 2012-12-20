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

	postingTool.extension.ds.setupMultiLanguage( );
	var lang = postingTool.multiLanguage.strings.ds;
	
	//add a DS-icon before the charname
	postingTool.settings.codeChar = ":ds: [color=blue][size=12pt][b]" +postingTool.settings.userTextTag+ ":[/b][/size][/color]\n";
	
	document.title += " - DS v" +postingTool.extension.ds.version; 
	
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
	$("#text_roll_desc").before('<br /><strong>' +lang.action +'</strong><br />');	
	
	$rolldiv.append('<br /><br /><strong>' +lang.check +'</strong><br />');
	
	//create selection-list
	var createOption = postingTool.extension.ds.tools.createOption;
	var $append = $("<select id=selectProbe onchange='postingTool.extension.ds.selectProbe_onChange();'>");
	$append.append( createOption("", ""));
	$append.append( createOption(lang.melee +":", lang.cv + ": " + lang.melee));
	$append.append( createOption(lang.ranged +":", lang.cv + ": " + lang.ranged));
	$append.append( createOption(lang.defense +":", lang.cv + ": " + lang.defense));
	$append.append( createOption(lang.spellcast +":", lang.cv + ": " + lang.spellcast));
	$append.append( createOption(lang.targetspell +":", lang.cv + ": " + lang.targetspell));
	
	$append.append( createOption(lang.regainConsciousness_check, lang.regainConsciousness_desc));
	$append.append( createOption(lang.perception_check, lang.perception_desc));
	$append.append( createOption(lang.wakeup_check, lang.wakeup_desc));
	$append.append( createOption(lang.disableTraps_check, lang.disableTraps_desc));
	$append.append( createOption(lang.haggle_check, lang.haggle_desc));
	$append.append( createOption(lang.startFire_check, lang.startFire_desc));
	$append.append( createOption(lang.flirt_check, lang.flirt_desc));
	$append.append( createOption(lang.defyPoison_check, lang.defyPoison_desc));
	$append.append( createOption(lang.decipherScript_check, lang.decipherScript_desc));
	$append.append( createOption(lang.climb_check, lang.climb_desc));
	$append.append( createOption(lang.strength_check, lang.strength_desc));
	$append.append( createOption(lang.resistDisease_check, lang.resistDisease_desc));
	$append.append( createOption(lang.senseMagic_check, lang.senseMagic_desc));
	$append.append( createOption(lang.identifyMagic_check, lang.identifyMagic_desc));	
	$append.append( createOption(lang.mechanism_check, lang.mechanism_desc));
	$append.append( createOption(lang.navigate_check, lang.navigate_desc));
	$append.append( createOption(lang.ride_check, lang.ride_desc));
	$append.append( createOption(lang.appraise_check, lang.appraise_desc));
	$append.append( createOption(lang.sneak_check, lang.sneak_desc));
	$append.append( createOption(lang.openLock_check, lang.openLock_desc));
	$append.append( createOption(lang.swim_check, lang.swim_desc));
	$append.append( createOption(lang.jump_check, lang.jump_desc));
	$append.append( createOption(lang.readTracks_check, lang.readTracks_desc));
	$append.append( createOption(lang.search_check, lang.search_desc));
	$append.append( createOption(lang.pickPocket_check, lang.pickPocket_desc));
	$append.append( createOption(lang.hide_check, lang.hide_desc));
	$append.append( createOption(lang.communicate_check, lang.communicate_desc));
	$append.append( createOption(lang.knowledge_check, lang.knowledge_desc));
	$append.append( createOption(lang.changeSpell_check, lang.changeSpell_desc));
	$append.append("</select>");
	
	//append content to the "Roll dice"-div
	$rolldiv.append( $append);

	$rolldiv.append( $('<br /><strong>Probenwert</strong><br />	<TEXTAREA id="text_RollProperties" class=textarea_entry rows=2 cols=20></TEXTAREA>'));
});

//overwrite code.char
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

//overwrite code.roll
postingTool.code["roll"] = function() {
console.log("ds extension: code.roll()");

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
	
	postingTool.code['append']( sCode);
return sCode;
}

/*md# NAMESPACE postingTool.extension.ds #####################*/
postingTool.extension.ds = { };

postingTool.extension.ds.version = "1.1";

postingTool.extension.ds.dichbChar = 0;

postingTool.extension.ds.setupMultiLanguage = function ( ) {
	//create new namespace for extentsion-multilanguage
	postingTool.multiLanguage.strings.ds = { };
	
	//
	//add multilanguage-strings
	//
	postingTool.multiLanguage.strings.ds.action = "strings.ds.action";
	
		//Combat Values
	postingTool.multiLanguage.strings.ds.cv = "strings.ds.cv"; //combat value
	postingTool.multiLanguage.strings.ds.melee = "strings.ds.melee";
	postingTool.multiLanguage.strings.ds.ranged = "strings.ds.ranged";
	postingTool.multiLanguage.strings.ds.defense = "strings.ds.defense";
	postingTool.multiLanguage.strings.ds.spellcast = "strings.ds.spellcast";
	postingTool.multiLanguage.strings.ds.targetspell = "strings.ds.targetspell";
	
		//Checks
	postingTool.multiLanguage.strings.ds.check = "strings.ds.check";
	postingTool.multiLanguage.strings.ds.regainConsciousness_check = "strings.ds.regainConsciousness_check"; //aufwachen (aus Ohmacht)
	postingTool.multiLanguage.strings.ds.regainConsciousness_desc = "strings.ds.regainConsciousness_desc"; 
	postingTool.multiLanguage.strings.ds.perception_check = "strings.ds.perception_check"; //Bemerken
	postingTool.multiLanguage.strings.ds.perception_desc = "strings.ds.perception_desc"; 
	postingTool.multiLanguage.strings.ds.wakeup_check = "strings.ds.wakeup_check"; //Erwachen
	postingTool.multiLanguage.strings.ds.wakeup_desc = "strings.ds.wakeup_desc";
	postingTool.multiLanguage.strings.ds.disableTraps_check = "strings.ds.disableTraps_check"; //Falle entsch�rfen
	postingTool.multiLanguage.strings.ds.disableTraps_desc = "strings.ds.disableTraps_desc";
	postingTool.multiLanguage.strings.ds.haggle_check = "strings.ds.haggle_check"; //Feilschen
	postingTool.multiLanguage.strings.ds.haggle_desc = "strings.ds.haggle_desc"; 
	postingTool.multiLanguage.strings.ds.startFire_check = "strings.ds.startFire_check"; //Feuer machen
	postingTool.multiLanguage.strings.ds.startFire_desc = "strings.ds.startFire_desc";
	postingTool.multiLanguage.strings.ds.flirt_check = "strings.ds.flirt_check"; //Flirten
	postingTool.multiLanguage.strings.ds.flirt_desc = "strings.ds.flirt_desc";
	postingTool.multiLanguage.strings.ds.defyPoison_check = "strings.ds.defyPoison_check"; //Gift trotzen
	postingTool.multiLanguage.strings.ds.defyPoison_desc = "strings.ds.defyPoison_desc";
	postingTool.multiLanguage.strings.ds.decipherScript_check = "strings.ds."; //Inschrift entziffern
	postingTool.multiLanguage.strings.ds.decipherScript_desc = "strings.ds.";
	postingTool.multiLanguage.strings.ds.climb_check = "strings.ds.climb_check"; //Klettern
	postingTool.multiLanguage.strings.ds.climb_desc = "strings.ds.climb_desc";
	postingTool.multiLanguage.strings.ds.strength_check = "strings.ds.strength_check"; //Feat of Strength / Kraftakt
	postingTool.multiLanguage.strings.ds.strength_desc = "strings.ds.strength_desc";
	postingTool.multiLanguage.strings.ds.resistDisease_check = "strings.ds.resistDisease_check"; //Krankheit trotzen
	postingTool.multiLanguage.strings.ds.resistDisease_desc = "strings.ds.resistDisease_desc";
	postingTool.multiLanguage.strings.ds.senseMagic_check = "strings.ds.senseMagic_check"; //Magie sp�ren
	postingTool.multiLanguage.strings.ds.senseMagic_desc = "strings.ds.senseMagic_desc";
	postingTool.multiLanguage.strings.ds.identifyMagic_check = "strings.ds.identifyMagic_check"; //Magie begreifen
	postingTool.multiLanguage.strings.ds.identifyMagic_desc = "strings.ds.identifyMagic_desc";
	postingTool.multiLanguage.strings.ds.mechanism_check = "strings.ds.mechanism_check"; //WORK MECHANISM / Mechanismus �ffnen
	postingTool.multiLanguage.strings.ds.mechanism_desc = "strings.ds.mechanism_desc";
	postingTool.multiLanguage.strings.ds.navigate_check = "strings.ds.navigate_check"; //Orientieren
	postingTool.multiLanguage.strings.ds.navigate_desc = "strings.ds.navigate_desc";
	postingTool.multiLanguage.strings.ds.ride_check = "strings.ds.ride_check";//Reiten
	postingTool.multiLanguage.strings.ds.ride_desc = "strings.ds.ride_desc";
	postingTool.multiLanguage.strings.ds.appraise_check = "strings.ds.appraise_check"; //APPRAISE TREASURE / Sch�tzen
	postingTool.multiLanguage.strings.ds.appraise_desc = "strings.ds.appraise_desc";
	postingTool.multiLanguage.strings.ds.sneak_check = "strings.ds.sneak_check"; //Schleichen
	postingTool.multiLanguage.strings.ds.sneak_desc = "strings.ds.sneak_desc";
	postingTool.multiLanguage.strings.ds.openLock_check = "strings.ds.openLock_check"; //Schloss �ffnen
	postingTool.multiLanguage.strings.ds.openLock_desc = "strings.ds.openLock_desc";
	postingTool.multiLanguage.strings.ds.swim_check = "strings.ds.swim_check"; //Schwimmen
	postingTool.multiLanguage.strings.ds.swim_desc = "strings.ds.swim_desc";
	postingTool.multiLanguage.strings.ds.jump_check = "strings.ds.jump_check"; //Springen
	postingTool.multiLanguage.strings.ds.jump_desc = "strings.ds.jump_desc";
	postingTool.multiLanguage.strings.ds.readTracks_check = "strings.ds.readTracks_check"; //Spuren lesen
	postingTool.multiLanguage.strings.ds.readTracks_desc = "strings.ds.readTracks_desc";
	postingTool.multiLanguage.strings.ds.search_check = "strings.ds.search_check"; //Suchen
	postingTool.multiLanguage.strings.ds.search_desc = "strings.ds.search_desc";
	postingTool.multiLanguage.strings.ds.pickPocket_check = "strings.ds.pickPocket_check"; //Taschendiebstahl
	postingTool.multiLanguage.strings.ds.pickPocket_desc = "strings.ds.pickPocket_desc";
	postingTool.multiLanguage.strings.ds.hide_check = "strings.ds."; //Verbergen
	postingTool.multiLanguage.strings.ds.hide_desc = "strings.ds.";
	postingTool.multiLanguage.strings.ds.communicate_check = "strings.ds.communicate_check"; //Verst�ndigen
	postingTool.multiLanguage.strings.ds.communicate_desc = "strings.ds.communicate_desc";
	postingTool.multiLanguage.strings.ds.knowledge_check = "strings.ds.knowledge_check"; //Wissen
	postingTool.multiLanguage.strings.ds.knowledge_desc = "strings.ds.knowledge_desc";
	postingTool.multiLanguage.strings.ds.changeSpell_check = "strings.ds.changeSpell_check"; //Zauber wechseln
	postingTool.multiLanguage.strings.ds.changeSpell_desc = "strings.ds.changeSpell_desc";
	
	//activate translation-language according to settings
	if( postingTool.extension.ds.multiLanguage[postingTool.settings.lang] !== undefined) {
		postingTool.extension.ds.multiLanguage[postingTool.settings.lang]();
	}
	else {
		alert("Failure! Language -" +postingTool.settings.lang +"- is not supported by DS extension!");
	}
	
};

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
	
	if( postingTool.extension.ds.dichbChar !== 0) {
	
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
	
	if( postingTool.extension.ds.dichbChar !== 0) {
		for( x in theProps) {
			switch( theProps[ x]) {
				case "K�R":
					sValue = g_dichbChar.kor;
				  break;
				case "ST":
					sValue = g_dichbChar.st;
				  break;
				case "H�":
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

/*md# NAMESPACE postingTool.extension.ds.multiLanguage #####################*/
postingTool.extension.ds.multiLanguage = { };

/*md## de( ) : void
Set strings for German translation.
*/
postingTool.extension.ds.multiLanguage.de = function ( ) {

	postingTool.multiLanguage.strings.ds.action = "Aktion";
	
	postingTool.multiLanguage.strings.ds.cv = "Kampfwert";
	postingTool.multiLanguage.strings.ds.melee = "Schlagen";
	postingTool.multiLanguage.strings.ds.ranged = "Schiessen";
	postingTool.multiLanguage.strings.ds.defense = "Abwehren";
	postingTool.multiLanguage.strings.ds.spellcast = "Zaubern";
	postingTool.multiLanguage.strings.ds.targetspell = "Zielzaubern";

	postingTool.multiLanguage.strings.ds.check = "Probe";
	postingTool.multiLanguage.strings.ds.regainConsciousness_check = "Aufwachen:K�R,H�";
	postingTool.multiLanguage.strings.ds.regainConsciousness_desc = "Aufwachen (wenn Bewusstloser geweckt wird)";
	postingTool.multiLanguage.strings.ds.perception_check = "Bemerken:GEI,VE";
	postingTool.multiLanguage.strings.ds.perception_desc = "Bemerken (min.8, Diebeskunst,Wahrnehmung)";
	postingTool.multiLanguage.strings.ds.wakeup_check = "Erwachen:GEI,VE";
	postingTool.multiLanguage.strings.ds.wakeup_desc = "Erwachen (Schnelle Reflexe,Wahrnehmung)";
	postingTool.multiLanguage.strings.ds.disableTraps_check = "Falle entsch�rfen:GEI,GE";
	postingTool.multiLanguage.strings.ds.disableTraps_desc = "Fallen entsch�rfen (Diebeskunst)";
	postingTool.multiLanguage.strings.ds.haggle_check = "Feilschen:GEI,VE,AU";
	postingTool.multiLanguage.strings.ds.haggle_desc = "Feilschen(Charmant,Schlitzohr)";
	postingTool.multiLanguage.strings.ds.startFire_check = "Feuer machen:GEI,GE";
	postingTool.multiLanguage.strings.ds.startFire_desc = "Feuer machen (J�ger)";
	postingTool.multiLanguage.strings.ds.flirt_check = "Flirten:GEI,AU";
	postingTool.multiLanguage.strings.ds.flirt_desc = "Flirten (Charmant)";
	postingTool.multiLanguage.strings.ds.defyPoison_check = "Gift trotzen:K�R,H�";
	postingTool.multiLanguage.strings.ds.defyPoison_desc = "Gift trotzen (Einstecker)";
	postingTool.multiLanguage.strings.ds.decipherScript_check = "Inschrift entziffern:GEI,VE";
	postingTool.multiLanguage.strings.ds.decipherScript_desc = "Inschrift entziffern (Wahrnehmung,Bildung)";
	postingTool.multiLanguage.strings.ds.climb_check = "Klettern:AGI,ST";
	postingTool.multiLanguage.strings.ds.climb_desc = "Klettern (Akrobat,Kletterass)";
	postingTool.multiLanguage.strings.ds.strength_check = "Kraftakt:K�R,ST";
	postingTool.multiLanguage.strings.ds.strength_desc = "Kraftakt (Brutaler Hieb,Vernichtender Schlag)";
	postingTool.multiLanguage.strings.ds.resistDisease_check = "Krankheit trotzen:K�R,H�";
	postingTool.multiLanguage.strings.ds.resistDisease_desc = "Krankheit trotzen (Einstecker)";
	postingTool.multiLanguage.strings.ds.senseMagic_check = "Magie sp�ren:GEI,AU";
	postingTool.multiLanguage.strings.ds.senseMagic_desc = "Magie sp�ren (nur Zauberwirker)";
	postingTool.multiLanguage.strings.ds.identifyMagic_check = "Magie begreifen:GEI,VE";
	postingTool.multiLanguage.strings.ds.identifyMagic_desc = "Magie begreifen (nur Zauberwirker)";
	postingTool.multiLanguage.strings.ds.mechanism_check = "Mechanismus �ffnen:GEI,GE,VE";
	postingTool.multiLanguage.strings.ds.mechanism_desc = "Mechanismus �ffnen (Diebeskunst,Handwerk,Schlossknacker)";
	postingTool.multiLanguage.strings.ds.navigate_check = "Orientieren:GEI,VE,AU";
	postingTool.multiLanguage.strings.ds.navigate_desc = "Orientieren (J�ger)";
	postingTool.multiLanguage.strings.ds.ride_check = "Reiten:AGI,BE,AU";
	postingTool.multiLanguage.strings.ds.ride_desc = "Reiten (Reiten, Sattelsch�tze,Tiermeister)";
	postingTool.multiLanguage.strings.ds.appraise_check = "Sch�tzen:GEI,VE";
	postingTool.multiLanguage.strings.ds.appraise_desc = "Sch�tzen (Beute sch�tzen)";
	postingTool.multiLanguage.strings.ds.sneak_check = "Schleichen:AGI,BE";
	postingTool.multiLanguage.strings.ds.sneak_desc = "Schleichen (Heimlichkeit)";
	postingTool.multiLanguage.strings.ds.openLock_check = "Schloss �ffnen:GEI,GE";
	postingTool.multiLanguage.strings.ds.openLock_desc = "Schl�sser �ffnen (Diebeskunst,Schlossknacker)";
	postingTool.multiLanguage.strings.ds.swim_check = "Schwimmen:AGI,BE";
	postingTool.multiLanguage.strings.ds.swim_desc = "Schwimmen (Schwimmen)";
	postingTool.multiLanguage.strings.ds.jump_check = "Springen:AGI,BE";
	postingTool.multiLanguage.strings.ds.jump_desc = "Springen (Akrobat)";
	postingTool.multiLanguage.strings.ds.readTracks_check = "Spuren lesen:GEI,VE";
	postingTool.multiLanguage.strings.ds.readTracks_desc = "Spuren lesen (J�ger,Wahrnehmung)";
	postingTool.multiLanguage.strings.ds.search_check = "Suchen:GEI,VE";
	postingTool.multiLanguage.strings.ds.search_desc = "Suchen (min.8, Diebeskunst,Heimlichkeit,Wahrnehmung)";
	postingTool.multiLanguage.strings.ds.pickPocket_check = "Taschendiebstahl:AGI,GE";
	postingTool.multiLanguage.strings.ds.pickPocket_desc = "Taschendiebstahl (Diebeskunst,Heimlichkeit)";
	postingTool.multiLanguage.strings.ds.hide_check = "Verbergen:AGI,BE";
	postingTool.multiLanguage.strings.ds.hide_desc = "Verbergen (Heimlichkeit)";
	postingTool.multiLanguage.strings.ds.communicate_check = "Verst�ndigen:GEI,GE";
	postingTool.multiLanguage.strings.ds.communicate_desc = "Verst�ndigen (Bildung)";
	postingTool.multiLanguage.strings.ds.knowledge_check = "Wissen:GEI,VE";
	postingTool.multiLanguage.strings.ds.knowledge_desc = "Wissen (Bildung,Wissensgebiet)";
	postingTool.multiLanguage.strings.ds.changeSpell_check = "Zauber wechseln:GEI,VE";
	postingTool.multiLanguage.strings.ds.changeSpell_desc = "Zauber wechseln (nur Zauberwirker)";
};

/*md## en( ) : void
Set strings for English translation.
*/
//postingTool.extension.ds.multiLanguage.en = function ( ) {
//};

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