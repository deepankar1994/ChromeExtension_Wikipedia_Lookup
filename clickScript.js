function toTitleCase(str)
{
   
    return str.replace(/\b./g, function(m){ return m.toUpperCase(); });
}

function stringStartsWith (str, prefix) {
    return str.slice(0, prefix.length) == prefix;
}

function isErrorCase(resp)
{
	var redirectText='This is a redirect';
  var multMatches='may refer to';

	if((resp.indexOf(redirectText)>-1)||(resp.indexOf(multMatches)>-1)||resp.trim()==''||resp.trim()=='<p></p>')
	{
		return true;
	}
	else
	{
		return false;
	}

}


		var ambg='The text is ambiguous. Please see the full article.';

		

            var insPop="<div id='DAonTop'><div style='position:relative'><div id='DAWikiTitle'><strong>Wikipedia Lookup</strong></div><input id='DACustomWiki' placeholder='Custom Search'><button id='DAWikiSearchBtn'>Search</button><button id='DAFull' style='position:relative;left:5%'>Full Article</button><button id='DAClosebttn' style='position:relative;left:10%'>Close</button></div> <p id='DAWikiText'></p>  </div>";
          $("body").append(insPop); 
          $("#DAWikiText").html('Searching...');
          	$( "#DAClosebttn" ).click(function() {
           // console.log($("#DACustomWiki").val());
  				$("#DAonTop").remove();
				}); 

          selectedText=toTitleCase(selectedText);



          $( "#DAFull" ).click(function() {
           // console.log($("#DACustomWiki").val());

           var win = window.open('https://en.wikipedia.org/wiki/'+selectedText.replace(/ /g,"_"), '_blank');
          if(win){
            //Browser has allowed it to be opened
            win.focus();
                }else{
              //Broswer has blocked it
          alert('Please allow popups for this site');
                }


          
        });

            var add="https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="+selectedText+"&redirects";
            //console.log(add);
           var popUpSearchObj= $.getJSON(add, function(jd) {



            try
            {

               	var wikiObj=jd.query.pages;
               	var pageId=Object.keys(wikiObj)[0];
               //	console.log(JSON.stringify(jd));


                 // $("#mydialog").html(JSON.stringify(wikiObj[pageId].extract));



                 

          var WikiData=JSON.stringify(wikiObj[pageId].extract);
          //console.log(WikiData);
          WikiData=WikiData.replace(/\\n/g, "<br/>"); // Remove \n characters
          WikiData=WikiData.substr(1); // Remove leading " character
          WikiData=WikiData.substr(0,WikiData.length-1);  // Remove " character

    			 if(isErrorCase(WikiData))
                {
                	$("#DAWikiText").html(ambg); 

                }
                else
                {

                	$("#DAWikiText").html(WikiData); 

                }	


              }

              catch(error)
              {
                $("#DAWikiText").html(ambg);

              }

    		



          $( "#DAWikiSearchBtn" ).click(function() {

               $( "#DAFull" ).unbind('click');
             $( "#DAFull" ).click(function() {
           // console.log($("#DACustomWiki").val());

           var win = window.open('https://en.wikipedia.org/wiki/'+(toTitleCase($("#DACustomWiki").val())).replace(/ /g,"_"), '_blank');
          if(win){
            //Browser has allowed it to be opened
            win.focus();
                }else{
              //Broswer has blocked it
          alert('Please allow popups for this site');
                }


          
        });


            var customSearch="https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="+toTitleCase($("#DACustomWiki").val())+"&redirects";
              $("#DAWikiText").html('Searching...'); 
             var customSearchObj=$.getJSON(customSearch, function(jd) {

              try{

              var wikiObj=jd.query.pages;
                var pageId=Object.keys(wikiObj)[0];

                var WikiData=JSON.stringify(wikiObj[pageId].extract);
         
                WikiData=WikiData.replace(/\\n/g, "<br/>"); // Remove \n characters
                WikiData=WikiData.substr(1); // Remove leading " character
                WikiData=WikiData.substr(0,WikiData.length-1); // Remove last " character

                

                if(isErrorCase(WikiData))
                {
                	$("#DAWikiText").html(ambg); 

                }
                else
                {

                	$("#DAWikiText").html(WikiData); 

                }	

              }

              catch(error)
              {
                $("#DAWikiText").html(ambg);
              }
             });

           //  setTimeout(function(){ customSearchObj.abort();$("#DAWikiText").html(ambg); }, 3000);


           
        });

          


		});


 //setTimeout(function(){ popUpSearchObj.abort();$("#DAWikiText").html(ambg); }, 3000);




