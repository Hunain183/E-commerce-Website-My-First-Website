<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit;
}
echo "<h1>Admin Panel</h1>";
echo "<a href='manage_products.php'>Manage Products</a><br>";
echo "<a href='manage_orders.php'>Manage Orders</a><br>";
?>
