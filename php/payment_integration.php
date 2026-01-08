<?php
include 'db_connect.php'; 

function processPayment($amount, $paymentMethod) {
    if ($paymentMethod == "credit_card") {
        echo "Processing credit card payment of $" . $amount;
    } elseif ($paymentMethod == "paypal") {
        echo "Processing PayPal payment of $" . $amount;
    }
}
$amount = 120;
$paymentMethod = "credit_card";
processPayment($amount, $paymentMethod);
?>
