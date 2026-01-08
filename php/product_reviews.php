<?php
include 'db_connect.php';  

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $productId = $_POST['product_id'];
    $review = $_POST['review'];
    $rating = $_POST['rating'];
    $sql = "INSERT INTO reviews (product_id, review, rating) VALUES ('$productId', '$review', '$rating')";
    $conn->query($sql);
}
$productId = 1;
$result = $conn->query("SELECT * FROM reviews WHERE product_id = '$productId'");
while ($row = $result->fetch_assoc()) {
    echo "<p>" . $row['review'] . " - Rating: " . $row['rating'] . "</p>";
}
?>
