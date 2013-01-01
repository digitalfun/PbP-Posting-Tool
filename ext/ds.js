/*md# DS Extension
**Version 1.1**
	
##v1.1
- support multilanguage
- english translation
- german translation

##v1.0: initial release
	
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
	

	// add title: DS symbol and extension title
	//
	var appendTitle = "<b><img src='http://s176520660.online.de/dungeonslayers/forum/Smileys/default/ds.gif' alt='DS'/>";
	//if chardata imported from dichb -> add info
	if( postingTool.extension.ds.dichbChar !== 0) {
		appendTitle += " - <b>" +  postingTool.extension.ds.dichbChar.name +"</b><br>"; 
	}
	else {
		appendTitle += " - DungeonSlayer<br>";
	}
	appendTitle += "<br />";
	$("#title").append( appendTitle);
	
	postingTool.extension.ds.extendRoll();
	postingTool.extension.ds.extendTalk();

});

//overwrite code.char
postingTool.code["char"] = function () {
console.log("ds extension: code.char()");	

	var sChar = $("#text_charactername").val();
	if ( sChar === "") {
		if ( postingTool.extension.ds.dichbChar != 0) {
			sChar = postingTool.extension.ds.dichbChar.name;
		}
	}
	var sCode = postingTool.settings.codeChar;
	sCode = sCode.replace( postingTool.settings.userTextTag, sChar);
	postingTool.code['append']( sCode);
return sCode;
}

//overwrite code.roll
postingTool.code["roll"] = function ( ) {
console.log("ds extension: code.roll()");

	//use namespace 
	var lang = postingTool.multiLanguage.strings.ds;
	
	var sCode = "[roll]";
	sCode += "{";
	
	//add description (if given by user)
	var sDesc = $("#text_roll_desc").val();
	( sDesc != "") ? sCode += sDesc +"; " : sCode += "";

	//add the Proben-Text
	var theProps = $("#selectProbe").val();
	if( theProps != "") {
		theProps = theProps.split(":");
		
		switch ( theProps[ 0]) {
			case lang.melee: sCode += ":kw5: "; break;
			case lang.ranged: sCode += ":kw6: "; break;
			case lang.defense: sCode += ":kw2: "; break;
			case lang.spellcast: sCode += ":kw7: "; break;
			case lang.targetspell: sCode += ":kw8: "; break;
			
			default: sCode += theProps[ 0]; 
		}
	}
	else {
		//sCode += lang.ctn + " ";
	}
	
	
	//calc the values of the Probenwert	
	var theProbenwerte = $( "#text_RollProperties").val( );

	if( theProbenwerte !== "") { 

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
		else sCode += " - " +theProbenwerte +"= " +lang.ctn +" " +nTotal +" | ";
	} //if	
	
	
	sCode += "}";
	sCode += $("#text_roll_dice").val();
	sCode += "x" + $("#text_roll_times").val();
	sCode +="[/roll]\n";
	
	postingTool.code['append']( sCode);
return sCode;
}


postingTool.code["speak"] = function ( ) {
	var sInsert = $('#text_speak').val();
	var sLang = $('#text_dsLanguage').val();
	var sLangText = $('#text_dsLanguageTalk').val();
	var sCode;

	if( sLang !== "" ) {
		//todo: put this into postingTool.extension.ds.settings 
		sCode = postingTool.extension.ds.settings.codeSpeak;
		sCode = sCode.replace( "DS_LANG", sLang);
	}
	else {
		sCode = postingTool.settings.codeSpeak;
	}
	
	if( sLangText !== "") {
		sCode += postingTool.extension.ds.settings.codeSpeakHidden;
		sCode = sCode.replace( "DS_LANGTEXT", sLangText);
	}
	
	sCode = sCode.replace( postingTool.settings.userTextTag, sInsert);
	postingTool.code['append']( sCode);
	return sCode;
}

/*md# NAMESPACE postingTool.extension.ds #####################*/
postingTool.extension.ds = { };

postingTool.extension.ds.version = "1.1";
postingTool.extension.ds.dichbChar = 0;

postingTool.extension.ds.settings = (function ( ) {
	var that = { };
	
	//DS_LANG will be replaced by the language ("elventongue", "dwarven" etc)
	that.codeSpeak	= "[color=blue]>>(DS_LANG) " +postingTool.settings.userTextTag+ "<<[/color]\n";
	
	//DS_LANGTEXT will be replaced by the text in the foreign language (to be hidden)
	that.codeSpeakHidden = "[spoiler][color=blue]>>DS_LANGTEXT<<[/color][/spoiler]\n";
	
	return that;
}());

postingTool.extension.ds.setupMultiLanguage = function ( ) {
	//create new namespace for extentsion-multilanguage
	postingTool.multiLanguage.strings.ds = { };
	
	var lang = postingTool.multiLanguage.strings.ds;
	//
	//add multilanguage-strings
	//
	lang.action = "strings.ds.action";
	lang.ctn = "strings.ds.ctn"; //short: Check Target Number / Probenwert (PW)
	lang.ctn_desc = "strings.ds.ctn_desc"; //Check Target Number / Probenwert (PW)
	lang.language = "string.ds.language"; 
	lang.spoiler = "string.ds.spoiler";
	
		//Attributes
	lang.BOD = "strings.ds.BOD"; //Body
	lang.MOB = "strings.ds.MOB"; //Mobility
	lang.MND = "strings.ds.MND"; //Mind
	
		//Traits
	lang.ST = "strings.ds.ST"; //STRENGTH
	lang.CO = "strings.ds.CO"; //CONSTITUTION
	lang.AG = "strings.ds.AG"; //AGILITY
	lang.DX = "strings.ds.DX"; //DEXTERITY
	lang.IN = "strings.ds.IN"; //INTELLECT
	lang.AU = "strings.ds.AU"; //AURA
	
		//Combat Values
	lang.cv = "strings.ds.cv"; //combat value
	lang.melee = "strings.ds.melee";
	lang.ranged = "strings.ds.ranged";
	lang.defense = "strings.ds.defense";
	lang.spellcast = "strings.ds.spellcast";
	lang.targetspell = "strings.ds.targetspell";
	
		//Checks
	lang.check = "strings.ds.check";
	lang.regainConsciousness_check = "strings.ds.regainConsciousness_check"; //aufwachen (aus Ohmacht)
	lang.regainConsciousness_desc = "strings.ds.regainConsciousness_desc"; 
	lang.perception_check = "strings.ds.perception_check"; //Bemerken
	lang.perception_desc = "strings.ds.perception_desc"; 
	lang.wakeup_check = "strings.ds.wakeup_check"; //Erwachen
	lang.wakeup_desc = "strings.ds.wakeup_desc";
	lang.disableTraps_check = "strings.ds.disableTraps_check"; //Falle entschärfen
	lang.disableTraps_desc = "strings.ds.disableTraps_desc";
	lang.haggle_check = "strings.ds.haggle_check"; //Feilschen
	lang.haggle_desc = "strings.ds.haggle_desc"; 
	lang.startFire_check = "strings.ds.startFire_check"; //Feuer machen
	lang.startFire_desc = "strings.ds.startFire_desc";
	lang.flirt_check = "strings.ds.flirt_check"; //Flirten
	lang.flirt_desc = "strings.ds.flirt_desc";
	lang.defyPoison_check = "strings.ds.defyPoison_check"; //Gift trotzen
	lang.defyPoison_desc = "strings.ds.defyPoison_desc";
	lang.decipherScript_check = "strings.ds."; //Inschrift entziffern
	lang.decipherScript_desc = "strings.ds.";
	lang.climb_check = "strings.ds.climb_check"; //Klettern
	lang.climb_desc = "strings.ds.climb_desc";
	lang.strength_check = "strings.ds.strength_check"; //Feat of Strength / Kraftakt
	lang.strength_desc = "strings.ds.strength_desc";
	lang.resistDisease_check = "strings.ds.resistDisease_check"; //Krankheit trotzen
	lang.resistDisease_desc = "strings.ds.resistDisease_desc";
	lang.senseMagic_check = "strings.ds.senseMagic_check"; //Magie spüren
	lang.senseMagic_desc = "strings.ds.senseMagic_desc";
	lang.identifyMagic_check = "strings.ds.identifyMagic_check"; //Magie begreifen
	lang.identifyMagic_desc = "strings.ds.identifyMagic_desc";
	lang.mechanism_check = "strings.ds.mechanism_check"; //WORK MECHANISM / Mechanismus öffnen
	lang.mechanism_desc = "strings.ds.mechanism_desc";
	lang.navigate_check = "strings.ds.navigate_check"; //Orientieren
	lang.navigate_desc = "strings.ds.navigate_desc";
	lang.ride_check = "strings.ds.ride_check";//Reiten
	lang.ride_desc = "strings.ds.ride_desc";
	lang.appraise_check = "strings.ds.appraise_check"; //APPRAISE TREASURE / Schätzen
	lang.appraise_desc = "strings.ds.appraise_desc";
	lang.sneak_check = "strings.ds.sneak_check"; //Schleichen
	lang.sneak_desc = "strings.ds.sneak_desc";
	lang.openLock_check = "strings.ds.openLock_check"; //Schloss öffnen
	lang.openLock_desc = "strings.ds.openLock_desc";
	lang.swim_check = "strings.ds.swim_check"; //Schwimmen
	lang.swim_desc = "strings.ds.swim_desc";
	lang.jump_check = "strings.ds.jump_check"; //Springen
	lang.jump_desc = "strings.ds.jump_desc";
	lang.readTracks_check = "strings.ds.readTracks_check"; //Spuren lesen
	lang.readTracks_desc = "strings.ds.readTracks_desc";
	lang.search_check = "strings.ds.search_check"; //Suchen
	lang.search_desc = "strings.ds.search_desc";
	lang.pickPocket_check = "strings.ds.pickPocket_check"; //Taschendiebstahl
	lang.pickPocket_desc = "strings.ds.pickPocket_desc";
	lang.hide_check = "strings.ds."; //Verbergen
	lang.hide_desc = "strings.ds.";
	lang.communicate_check = "strings.ds.communicate_check"; //Verständigen
	lang.communicate_desc = "strings.ds.communicate_desc";
	lang.knowledge_check = "strings.ds.knowledge_check"; //Wissen
	lang.knowledge_desc = "strings.ds.knowledge_desc";
	lang.changeSpell_check = "strings.ds.changeSpell_check"; //Zauber wechseln
	lang.changeSpell_desc = "strings.ds.changeSpell_desc";
	
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

	//use namespace 
	var lang = postingTool.multiLanguage.strings.ds;
	
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
			case lang.melee:
				sValue = postingTool.extension.ds.dichbChar.schlagen;	
			break;
			case lang.ranged:
				sValue = postingTool.extension.ds.dichbChar.schiessen;	
			break;
			case lang.defense:
				sValue = postingTool.extension.ds.dichbChar.abwehr;	
			break;
			case lang.spellcast:
				sValue = postingTool.extension.ds.dichbChar.zaubern;	
			break;
			case lang.targetspell:
				sValue = postingTool.extension.ds.dichbChar.zielzaubern;	
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
				case lang.BOD:
					sValue = postingTool.extension.ds.dichbChar.kor;
				  break;
				case lang.ST:
					sValue = postingTool.extension.ds.dichbChar.st;
				  break;
				case lang.CO:
					sValue = postingTool.extension.ds.dichbChar.ha;
				  break;

				case lang.MOB:
					sValue = postingTool.extension.ds.dichbChar.agi;
				  break;
				case lang.AG:
					sValue = postingTool.extension.ds.dichbChar.ge;
				  break;
				case lang.DX:
					sValue = postingTool.extension.ds.dichbChar.be;
				  break;

				case lang.MND:
					sValue = postingTool.extension.ds.dichbChar.gei;
				  break;
				case lang.IN:
					sValue = postingTool.extension.ds.dichbChar.ve;
				  break;
				case lang.AU:
					sValue = postingTool.extension.ds.dichbChar.au;
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

//extend roll-div
postingTool.extension.ds.extendRoll = function ( ) {
	var lang = postingTool.multiLanguage.strings.ds;

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
	$append.width("8em");
	$append.css("font-size", "1em");
	//append content to the "Roll dice"-div
	$rolldiv.append( $append);

	$rolldiv.append( $('<br /><strong>' +lang.ctn_desc +'</strong><br />	<TEXTAREA id="text_RollProperties" class=textarea_entry rows=2 cols=20></TEXTAREA>'));	
}

//extend talk-div
postingTool.extension.ds.extendTalk = function ( ) {
	var lang = postingTool.multiLanguage.strings.ds;
//$("#text_speak")	
	var $div = $("#tabcontent_talk");
	
	var $append;
	$div.append( $('<br /><br /><strong>' +lang.language +'</strong>'));
	$div.append( $('<br /><textarea id="text_dsLanguage" class="textarea_entry" rows=1 cols=20></textarea>'));
	$div.append( $('<br /><strong>' +lang.spoiler +'</strong>'));
	$div.append( $('<br /><textarea id="text_dsLanguageTalk" class="textarea_entry" rows=1 cols=80></textarea><br />'));	
	//$div.append($append);

}

/*md# NAMESPACE postingTool.extension.ds.multiLanguage #####################*/
postingTool.extension.ds.multiLanguage = { };

/*md## de( ) : void
Set strings for German translation.
*/
postingTool.extension.ds.multiLanguage.de = function ( ) {
	
	//use namespace 
	var lang = postingTool.multiLanguage.strings.ds;
	
	//
	//translate multilanguage-strings
	//	
	lang.action = "Aktion";
	lang.ctn = "PW";
	lang.ctn_desc = "Probenwert";
	lang.language = "Sprache"; 
	lang.spoiler = "Spoiler";
	
		//Attributes
	lang.BOD = "KÖR"; //Body
	lang.MOB = "AGI"; //Mobility
	lang.MND = "GEI"; //Mind
	
		//Traits
	lang.ST = "ST"; //STRENGTH
	lang.CO = "HÄ"; //CONSTITUTION
	lang.AG = "BE"; //AGILITY
	lang.DX = "GE"; //DEXTERITY
	lang.IN = "VE"; //INTELLECT
	lang.AU = "AU"; //AURA
	
		//Combat Values	
	lang.cv = "Kampfwert";
	lang.melee = "Schlagen";
	lang.ranged = "Schiessen";
	lang.defense = "Abwehren";
	lang.spellcast = "Zaubern";
	lang.targetspell = "Zielzaubern";

		//Checks
	lang.check = "Probe";
	lang.regainConsciousness_check = "Aufwachen:" +lang.BOD +"," +lang.CO;
	lang.regainConsciousness_desc = "Aufwachen (wenn Bewusstloser geweckt wird)";
	lang.perception_check = "Bemerken:" +lang.MND +"," +lang.IN;
	lang.perception_desc = "Bemerken (min.8, Diebeskunst,Wahrnehmung)";
	lang.wakeup_check = "Erwachen:" +lang.MND +"," +lang.IN;
	lang.wakeup_desc = "Erwachen (Schnelle Reflexe,Wahrnehmung)";
	lang.disableTraps_check = "Falle entschärfen:" +lang.MND +"," +lang.DX;
	lang.disableTraps_desc = "Fallen entschärfen (Diebeskunst)";
	lang.haggle_check = "Feilschen:" +lang.MND +"," +lang.IN +"," +lang.AU;
	lang.haggle_desc = "Feilschen(Charmant,Schlitzohr)";
	lang.startFire_check = "Feuer machen:" +lang.MND +"," +lang.DX;
	lang.startFire_desc = "Feuer machen (Jäger)";
	lang.flirt_check = "Flirten:" +lang.MND +"," +lang.AU;
	lang.flirt_desc = "Flirten (Charmant)";
	lang.defyPoison_check = "Gift trotzen:" +lang.BOD +"," +lang.CO;
	lang.defyPoison_desc = "Gift trotzen (Einstecker)";
	lang.decipherScript_check = "Inschrift entziffern:" +lang.MND +"," +lang.IN;
	lang.decipherScript_desc = "Inschrift entziffern (Wahrnehmung,Bildung)";
	lang.climb_check = "Klettern:" +lang.MOB +"," +lang.ST;
	lang.climb_desc = "Klettern (Akrobat,Kletterass)";
	lang.strength_check = "Kraftakt:" +lang.BOD +"," + lang.ST;
	lang.strength_desc = "Kraftakt (Brutaler Hieb,Vernichtender Schlag)";
	lang.resistDisease_check = "Krankheit trotzen:" +lang.BOD +"," +lang.CO;
	lang.resistDisease_desc = "Krankheit trotzen (Einstecker)";
	lang.senseMagic_check = "Magie spüren:" +lang.MND +"," +lang.AU;
	lang.senseMagic_desc = "Magie spüren (nur Zauberwirker)";
	lang.identifyMagic_check = "Magie begreifen:" +lang.MND +"," +lang.IN;
	lang.identifyMagic_desc = "Magie begreifen (nur Zauberwirker)";
	lang.mechanism_check = "Mechanismus öffnen:" +lang.MND +"," +lang.DX +"," +lang.IN;
	lang.mechanism_desc = "Mechanismus öffnen (Diebeskunst,Handwerk,Schlossknacker)";
	lang.navigate_check = "Orientieren:" +lang.MND +"," +lang.IN +"," +lang.AU;
	lang.navigate_desc = "Orientieren (Jäger)";
	lang.ride_check = "Reiten:" +lang.MOB +"," +lang.AG +"," +lang.AU;
	lang.ride_desc = "Reiten (Reiten, Sattelschütze,Tiermeister)";
	lang.appraise_check = "Schätzen:" +lang.MND +"," +lang.IN;
	lang.appraise_desc = "Schätzen (Beute schätzen)";
	lang.sneak_check = "Schleichen:" +lang.MOB +"," +lang.AG;
	lang.sneak_desc = "Schleichen (Heimlichkeit)";
	lang.openLock_check = "Schloss öffnen:" +lang.MND +"," +lang.AG;
	lang.openLock_desc = "Schlösser öffnen (Diebeskunst,Schlossknacker)";
	lang.swim_check = "Schwimmen:" +lang.MOB +"," +lang.AG;
	lang.swim_desc = "Schwimmen (Schwimmen)";
	lang.jump_check = "Springen:" +lang.MOB +"," +lang.AG;
	lang.jump_desc = "Springen (Akrobat)";
	lang.readTracks_check = "Spuren lesen:" +lang.MND +"," +lang.IN;
	lang.readTracks_desc = "Spuren lesen (Jäger,Wahrnehmung)";
	lang.search_check = "Suchen:" +lang.MND +"," +lang.IN;
	lang.search_desc = "Suchen (min.8, Diebeskunst,Heimlichkeit,Wahrnehmung)";
	lang.pickPocket_check = "Taschendiebstahl:" +lang.MOB +"," +lang.DX;
	lang.pickPocket_desc = "Taschendiebstahl (Diebeskunst,Heimlichkeit)";
	lang.hide_check = "Verbergen:" +lang.MOB +"," +lang.AG;
	lang.hide_desc = "Verbergen (Heimlichkeit)";
	lang.communicate_check = "Verständigen:"  +lang.MND +"," +lang.DX;
	lang.communicate_desc = "Verständigen (Bildung)";
	lang.knowledge_check = "Wissen:" +lang.MND +"," +lang.IN;
	lang.knowledge_desc = "Wissen (Bildung,Wissensgebiet)";
	lang.changeSpell_check = "Zauber wechseln:" +lang.MND +"," +lang.IN;
	lang.changeSpell_desc = "Zauber wechseln (nur Zauberwirker)";
};

/*md## en( ) : void
Set strings for English translation.
*/
postingTool.extension.ds.multiLanguage.en = function ( ) {
	//use namespace 
	var lang = postingTool.multiLanguage.strings.ds;
	
	//
	//translate multilanguage-strings
	//	
	lang.action = "Action";
	lang.ctn = "CTN";
	lang.ctn_desc = "Check Target Number";
	lang.language = "Language"; 
	lang.spoiler = "Spoiler";
	
		//Attributes
	lang.BOD = "BOD"; //Body
	lang.MOB = "MOB"; //Mobility
	lang.MND = "MND"; //Mind
	
		//Traits
	lang.ST = "ST"; //STRENGTH
	lang.CO = "CO"; //CONSTITUTION
	lang.AG = "AG"; //AGILITY
	lang.DX = "DX"; //DEXTERITY
	lang.IN = "IN"; //INTELLECT
	lang.AU = "AU"; //AURA
	
		//Combat Values	
	lang.cv = "Combat Value";
	lang.melee = "Melee";
	lang.ranged = "Ranged Attack";
	lang.defense = "Defense";
	lang.spellcast = "Spellcasting";
	lang.targetspell = "Targeted Spellcasting";

		//Checks
	lang.check = "Check";
	lang.regainConsciousness_check = "Regain Consciousness:" + lang.BOD +"," +lang.CO;
	lang.regainConsciousness_desc = "Regain Consciousness (if another person attempts to wake up the character)";
	lang.perception_check = "Perception:" +lang.MND +"," +lang.IN;
	lang.perception_desc = "Perception (min.8, Thievery,Alertness)";
	lang.wakeup_check = "Wake up:" +lang.MND +"," +lang.IN;
	lang.wakeup_desc = "Wake up (Lightning Reflexes,Alertness)";
	lang.disableTraps_check = "Disable Traps:" +lang.MND +"," +lang.DX;
	lang.disableTraps_desc = "Disable Traps (Thievery)";
	lang.haggle_check = "Haggle:" +lang.MND +"," +lang.IN +"," +lang.AU;
	lang.haggle_desc = "Haggle (Charming,Rascal)";
	lang.startFire_check = "Start Fire:" +lang.MND +"," +lang.DX;
	lang.startFire_desc = "Start Fire (Hunter)";
	lang.flirt_check = "Flirt:" +lang.MND +"," +lang.AU;
	lang.flirt_desc = "Flirt (Charming)";
	lang.defyPoison_check = "Defy Poison:" +lang.BOD +"," +lang.CO;
	lang.defyPoison_desc = "Defy Poison (Endurance)";
	lang.decipherScript_check = "Decipher Script:" +lang.MND +"," +lang.IN;
	lang.decipherScript_desc = "Decipher Script (Alertness,Education)";
	lang.climb_check = "Climb:" +lang.MOB +"," +lang.ST;
	lang.climb_desc = "Climb (Acrobat,Kletterass)";
	lang.strength_check = "Feat of Strength:" +lang.BOD +"," + lang.ST;
	lang.strength_desc = "Feat of Strength (Brutal Blow,Vernichtender Schlag)";
	lang.resistDisease_check = "Resist Disease:" +lang.BOD +"," +lang.CO;
	lang.resistDisease_desc = "Resist Disease (Endurance)";
	lang.senseMagic_check = "Sense Magic:" +lang.MND +"," +lang.AU;
	lang.senseMagic_desc = "Sense Magic (Mages only)";
	lang.identifyMagic_check = "Identify Magic:" +lang.MND +"," +lang.IN;
	lang.identifyMagic_desc = "Identify Magic (Mages only)";
	lang.mechanism_check = "Work Mechanism:" +lang.MND +"," +lang.DX +"," +lang.IN;
	lang.mechanism_desc = "Work Mechanism (Thievery,Artisan,Lockpicking)";
	lang.navigate_check = "Navigate:" +lang.MND +"," +lang.IN +"," +lang.AU;
	lang.navigate_desc = "Navigate (Hunter)";
	lang.ride_check = "Ride:" +lang.MOB +"," +lang.AG +"," +lang.AU;
	lang.ride_desc = "Ride (Riding, Mounted Archer,Beast Master)";
	lang.appraise_check = "Appraise:" +lang.MND +"," +lang.IN;
	lang.appraise_desc = "Appraise (Appraise)";
	lang.sneak_check = "Sneak:" +lang.MOB +"," +lang.AG;
	lang.sneak_desc = "Sneak (Stealth)";
	lang.openLock_check = "Open Lock:" +lang.MND +"," +lang.AG;
	lang.openLock_desc = "Open Lock (Thievery,Lockpicking)";
	lang.swim_check = "Swimming:" +lang.MOB +"," +lang.AG;
	lang.swim_desc = "Swimming (Swim)";
	lang.jump_check = "Springen:" +lang.MOB +"," +lang.AG;
	lang.jump_desc = "Springen (Acrobat)";
	lang.readTracks_check = "Read Tracks:" +lang.MND +"," +lang.IN;
	lang.readTracks_desc = "Read Tracks (Hunter,Alertness)";
	lang.search_check = "Search:" +lang.MND +"," +lang.IN;
	lang.search_desc = "Search (min.8, Thievery,Stealth,Alertness)";
	lang.pickPocket_check = "Pick Pocket:" +lang.MOB +"," +lang.DX;
	lang.pickPocket_desc = "Pick Pocket (Thievery,Stealth)";
	lang.hide_check = "Hide:" +lang.MOB +"," +lang.AG;
	lang.hide_desc = "Hide (Stealth)";
	lang.communicate_check = "Communicate:"  +lang.MND +"," +lang.DX;
	lang.communicate_desc = "Communicate (Education)";
	lang.knowledge_check = "Knowledge:" +lang.MND +"," +lang.IN;
	lang.knowledge_desc = "Knowledge (Education,Expertise)";
	lang.changeSpell_check = "Change Spell:" +lang.MND +"," +lang.IN;
	lang.changeSpell_desc = "Change Spell (Mages Only)";
};

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