document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const totalAmountField = document.getElementById('total_amount');

    amountInput.addEventListener('input', function () {
        totalAmountField.value = amountInput.value;
    });
});
