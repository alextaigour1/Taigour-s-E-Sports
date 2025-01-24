document.addEventListener('DOMContentLoaded', function () {
    const amountSelect = document.getElementById('amount');
    const totalAmountField = document.getElementById('total_amount');

    amountSelect.addEventListener('change', function () {
        totalAmountField.value = amountSelect.value;
    });
});
