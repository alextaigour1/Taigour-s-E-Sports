const secretKey = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key
    const amountSelect = document.getElementById("amount");
    const totalAmountInput = document.getElementById("total_amount");
    const transactionUuidInput = document.getElementById("transaction_uuid");
    const taxAmount = parseInt(document.getElementById("tax_amount").value);

    // Function to generate a unique transaction UUID
    function generateTransactionUUID() {
        const randomPart = () =>
            Math.random().toString(36).substr(2, 8); // Generate 8-character random string
        return `${randomPart()}-${randomPart()}-${randomPart()}-${randomPart()}`;
    }

    // Generate signature and transaction UUID before form submission
    document.querySelector("form").addEventListener("submit", function (e) {
        // Generate new transaction UUID
        const newTransactionUUID = generateTransactionUUID();
        transactionUuidInput.value = newTransactionUUID;

        const signedFields = document.getElementById("signed_field_names").value;
        const fieldValues = {
            total_amount: document.getElementById("total_amount").value,
            transaction_uuid: newTransactionUUID,
            product_code: document.getElementById("product_code").value,
        };

        const message = signedFields
            .split(",")
            .map(field => `${field}=${fieldValues[field]}`)
            .join(",");
        const hash = CryptoJS.HmacSHA256(message, secretKey);
        const signature = CryptoJS.enc.Base64.stringify(hash);

        document.getElementById("signature").value = signature;
    });

    // Bootstrap form validation
    (() => {
        'use strict';
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();