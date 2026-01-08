<?php
session_start();
include 'db_connect.php';  

if (!isset($_SESSION['user_logged_in'])) {
    header("Location: login.php");
    exit;
}
$username = $_SESSION['user_logged_in'];
$result = $conn->query("SELECT * FROM orders WHERE username = '$username'");
echo "<h1>Order History</h1>";
while ($row = $result->fetch_assoc()) {
    echo "<p>Order ID: " . $row['order_id'] . " - Total: $" . $row['total'] . "</p>";
}
?>
