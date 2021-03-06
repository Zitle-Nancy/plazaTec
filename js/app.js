(function(){
	var isValidate = false;
	var isValidateCvv = false;
	var isValidateNameCard = false;
	var isValidateDate = false;
	var radioButton = document.getElementsByClassName('radio');
	var longitud = radioButton.length;
	var inputCard = document.getElementById('input-card');
	var inputCardName = document.getElementById('input-card-name');
	var inputCvv = document.getElementById('input-cvv');
	var month = document.getElementById('month');
	var year = document.getElementById('year');
	var cardVisa = document.getElementById('card-visa');
	var cardMaster = document.getElementById('master-card');
	var cardAmerica = document.getElementById('america-card');
	var btnPay = document.getElementById('btn-pay');
	var sumAllPrice = document.getElementById('sum-all-price');
	var inputQuantity = document.getElementsByClassName('input-quantity');
	var productPrice = document.getElementsByClassName('product-price');
	month.addEventListener('change',validateDate);
	year.addEventListener('change',validateDate);
	btnPay.addEventListener('click', placeOrder);
	inputCvv.addEventListener('keyup',validateCvv);
	inputCvv.addEventListener('keydown',validateNumber);
	inputCardName.addEventListener('keydown',validateLetter);
	inputCard.addEventListener('keyup',validateCardNumber);
	inputCard.addEventListener('keydown',validateNumber);

	for (var i = 0; i < longitud; i++) {
		radioButton[i].addEventListener('change', getFormCard);
	};
	for (var element = 0; element < inputQuantity.length; element ++) {
		inputQuantity[element].addEventListener('keydown', validateNumber);
		inputQuantity[element].addEventListener('keyup', showTotalPrice);
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
		};
	};
	function validateLetter(e) {
		var validateName = e.key;
		var regLetter = /^[A-Za-z ]+$/;

		if(validateName.trim().length > 0){
			isValidateNameCard = true;
		};
		if(!regLetter.test(validateName)){
			e.preventDefault();
		};
	};
	function validateDate() {
		if((month.value && year.value) > 0){
			isValidateDate = true;
		}
	};
	function validateCardNumber() {
		var regCardVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
		var regMasterCard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
		var regAmericaCard = /^3[47][0-9]{13}$/;
		var numberCard = this.value;
		if (regCardVisa.test(numberCard)){
			cardVisa.classList.remove('hidden');
			isValidate = true;
		} else {
			cardVisa.classList.add('hidden');
		}
		if (regMasterCard.test(numberCard)){
			cardMaster.classList.remove('hidden');
			isValidate = true;
		} else{
			cardMaster.classList.add('hidden');
		}
		if (regAmericaCard.test(numberCard)){
			cardAmerica.classList.remove('hidden');
			isValidate = true;
		} else{
			cardAmerica.classList.add('hidden');
		}
	};
	function validateCvv(e) {
		var regCvv = /^[0-9]{3,4}$/;
		if(!regCvv.test(this.value)){
			e.preventDefault();
			isValidateCvv = false;
		}else{
			isValidateCvv = true;
		}
	};

	function showTotalPrice(e) {
		var numberQuantity =  this.value;
		var defaultPrice = this.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText;
		var priceProduct = this.parentElement.nextElementSibling;
		var total = 0;
		if(numberQuantity.trim().length > 0 && numberQuantity !== " ") {
			var numberProduct = defaultPrice.replace(/\$?[\$\,|C]/g, '');
			total = (parseFloat(numberQuantity) * parseFloat(numberProduct)).toFixed(2);
			priceProduct.innerText = '$' + total.toString();
		}else{
			priceProduct.innerText = "$0";
		}
		calculateTotalPrice();
	};
	
	function calculateTotalPrice() {
		var totalPrice = 0;
		var price;
		for (var i = 0 ; i < productPrice.length; i++){
			price = productPrice[i].innerText.replace(/\$?[\$\,|C]/g, '');
			totalPrice += Number(price);
		}
		sumAllPrice.innerText = '$' + totalPrice.toFixed(2).toString();

	};

	function placeOrder() {
		var validate = isValidate && isValidateCvv && isValidateNameCard && isValidateDate
		if(validate){
			swal(
			  'Good job!',
			  'Pedido Finalizado',
			  'success'
			)
			inputCard.value = " ";
			inputCardName.value = " ";
			inputCvv.value = " ";
			month.value = 0;
			year.value = 0;
			isValidate = false;
		 	isValidateCvv = false;
			isValidateNameCard = false;
			isValidateDate = false;
			cardAmerica.classList.add('hidden');
			cardMaster.classList.add('hidden');
			cardVisa.classList.add('hidden');
		}else{
			swal(
			  'Oops...',
			  'Faltan datos por completar o los datos son incorrectos',
			  'error'
			)
		}
	};
})();