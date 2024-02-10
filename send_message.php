<!-- send_message.php -->
<?php
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = json_decode(file_get_contents('php://input'), true)['username'];
$message = json_decode(file_get_contents('php://input'), true)['message'];

$sql = "INSERT INTO messages (username, message) VALUES ('$username', '$message')";
$conn->query($sql);

$conn->close();

header('Content-Type: application/json');
echo json_encode(array('status' => 'success'));
?>
