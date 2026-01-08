<?php
include 'db_connect.php'; 
function calculateShipping($totalAmount) {
    if ($totalAmount > 100) {
        return 0;
    } else {
        return 10;
    }
}
$cartTotal = 80; 
$shippingCost = calculateShipping($cartTotal);
echo "Shipping Cost: $" . $shippingCost;
?>
