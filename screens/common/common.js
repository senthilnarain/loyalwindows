
function hideAllProductContents(){
	$('#riceContent').hide();
	$('#spicesContent').hide();
	$('#vegetablesContent').hide();
	$('#freshFruitsContent').hide();
	$('#wheatFlourContent').hide();
	$('#essentialOilContent').hide();
	$('#herbalTeaContent').hide();
	$('#sugarContent').hide();
}
function openProductModal(products){
	selectedProduct = products;
	
	if(selectedProduct == 'rice'){
		hideAllProductContents();
		$('#riceContent').show();
	}else if(selectedProduct == 'spices'){
		hideAllProductContents();
		$('#spicesContent').show();
	}else if(selectedProduct == 'vegetables'){
		hideAllProductContents();
		$('#vegetablesContent').show();
	}else if(selectedProduct == 'freshFruits'){
		hideAllProductContents();
		$('#freshFruitsContent').show();
	}else if(selectedProduct == 'wheatFlour'){
		hideAllProductContents();
		$('#wheatFlourContent').show();
	}else if(selectedProduct == 'essentialOil'){
		hideAllProductContents();
		$('#essentialOilContent').show();
	}else if(selectedProduct == 'herbalTea'){
		hideAllProductContents();
		$('#herbalTeaContent').show();
	}else if(selectedProduct == 'sugar'){
		hideAllProductContents();
		$('#sugarContent').show();
	}
	$("#productScrollTopPosition").animate({ scrollTop: 0 }, "slow");
	$('#product').modal({backdrop: 'static', keyboard: false});
}

function hideAllPages(){
	$('#homePage').hide();
	$('#aboutUs').hide();
	$('#contact').hide();
}

function openMenu(page){
	if(page == 'home'){
		hideAllPages();
		$('#homePage').show();
	} else if(page == 'aboutUs'){
		hideAllPages();
		$('#aboutUs').show();
	}
}