(function(){
	var radioButton = document.getElementsByClassName('radio');
	var longitud = radioButton.length;

	for (var i = 0; i < longitud; i++) {
		radioButton[i].addEventListener('change', getFormCard);
	};
	
	function getFormCard() {
		var formCard = document.getElementById('form-card');

		if (this.id === 'card' && this.checked) {
			formCard.classList.remove('hidden');  
		} else {
			formCard.classList.add('hidden');  
		}
	};
	

})();