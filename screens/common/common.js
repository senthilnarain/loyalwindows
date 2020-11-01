
function hideAllServiceContents(){
	$('#riceContent').hide();
	$('#spicesContent').hide();
	$('#vegetablesContent').hide();
	$('#freshFruitsContent').hide();
	$('#wheatFlourContent').hide();
}
function openServicesModal(services){
	selectedService = services;
	
	if(selectedService == 'processHazardAnalysis'){
		hideAllServiceContents();
		$('#riceContent').show();
	}else if(selectedService == 'lossPrevention'){
		hideAllServiceContents();
		$('#spicesContent').show();
	}else if(selectedService == 'inspection'){
		hideAllServiceContents();
		$('#vegetablesContent').show();
	}else if(selectedService == 'procedures'){
		hideAllServiceContents();
		$('#freshFruitsContent').show();
	}else if(selectedService == 'training'){
		hideAllServiceContents();
		$('#wheatFlourContent').show();
	}
	$("#productScrollTopPosition").animate({ scrollTop: 0 }, "slow");
	$('#serviceModal').modal({backdrop: 'static', keyboard: false});
}

function hideAllPages(){
	$('#homePage').hide();
	$('#aboutUs').hide();
	$('#services').hide();
	$('#contact').hide();
}

function openMenu(page){
	if(page == 'home'){
		hideAllPages();
		$('#homePage').show();
	}else if(page == 'aboutUs'){
		hideAllPages();
		$('#aboutUs').show();
	}else if(page == 'services'){
		hideAllPages();
		$('#services').show();
	}
}