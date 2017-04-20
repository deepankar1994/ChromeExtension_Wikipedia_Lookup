// Allows links on popUp Page to link to webpage

$(document).ready(function(){
			
   			$('body').on('click', 'a', function(){
     		chrome.tabs.create({url: $(this).attr('href')});
    		 return false;
   			});
		});