var nlp = nlp_compromise,
	output = $(".output"),
	textFromBox = $("#final_span");

var str1 = "Hi, I'd like a computer for my grandchild",
	str2 = "Can you tell me where the gaming laptops are?",
	str3 = "I need desktop computers for my employees",
	str4 = "I want some headphones for my laptop",
	str5 = "Show me Alienware laptops";

var topics = nlp.text(str5).topics();
console.log("topics", topics);

var sentences = nlp.text(str5).sentences;
console.log("sentences", sentences);

var arr = [str1, str2, str3, str4, str5];
// var arr = [str1];
function sayMyNouns(){
	for (var i = 0; i < arr.length; i++) {
		var output = nlp.text(arr[i]).sentences;
		var terms = output[0].terms;
		console.log(terms);
		for (var j = 0; j < terms.length; j++) {
			if(terms[j].tag == "Noun"){
				console.log(terms[j].text);
				responsiveVoice.speak(terms[j].text);
			}
		}
	}
}
function printSentence(){
	var nlpOutput = nlp.text(textFromBox.text()).sentences,
		terms = nlpOutput[0].terms;
	console.log("terms",terms);
}
function sayNouns(){
	var output = nlp.text(textFromBox.text()).sentences;
	var terms = output[0].terms;
	console.log("terms",terms);
	for (var j = 0; j < terms.length; j++) {
		if(terms[j].tag == "Noun"){
			console.log(terms[j].text);
			responsiveVoice.speak(terms[j].text);
		}
	}
}
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
	//setTimeout(function(){sayNouns();}, 1000);