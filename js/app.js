(function(){
	var validate = false;
	var radioButton = document.getElementsByClassName('radio');
	var longitud = radioButton.length;
	var inputCard = document.getElementById('input-card');
	var inputCardCame = document.getElementById('input-card-name');
	var inputCvv = document.getElementById('input-cvv');
	var btnPay = document.getElementById('btn-pay');
	btnPay.addEventListener('click', placeOrder);
	inputCvv.addEventListener('keyup',validateCvv);
	inputCvv.addEventListener('keydown',validateNumber);
	inputCardCame.addEventListener('keydown',validateLetter);
	inputCard.addEventListener('keyup',validateCardNumber);
	inputCard.addEventListener('keydown',validateNumber);

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
	function validateNumber(e) {
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57)){
			e.preventDefault();
		}	
	};
	function validateLetter(e) {
		var regLetter = /^[A-Za-z ]+$/;
		if(!regLetter.test(e.key)){
			e.preventDefault();
		};
	};
	function validateCardNumber(){
		var regCardVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
		var regMasterCard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
		var numberCard = this.value;
		var cardVisa = document.getElementById('card-visa');
		var cardMaster = document.getElementById('master-card');
		if (regCardVisa.test(numberCard)){
			cardVisa.classList.remove('hidden');
			validate = true;
		} else {
			cardVisa.classList.add('hidden');
		}
		if (regMasterCard.test(numberCard)){
			cardMaster.classList.remove('hidden');
			validate = true;
		} else{
			cardMaster.classList.add('hidden');
		}
		// console.log(this.value);
	};
	function validateCvv(e){
		var regCvv = /^[0-9]{3,4}$/;
		if(!regCvv.test(this.value)){
			e.preventDefault();
			validate = true;
		}
	};

	function placeOrder(){
		if(validate){
			swal(
			  'Good job!',
			  'Pedido Finalizado',
			  'success'
			)
		}else{
			swal(
			  'Oops...',
			  'Faltan datos por completar',
			  'error'
			)
		}
	};

})();