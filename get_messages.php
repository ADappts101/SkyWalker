<!-- get_messages.php -->
<?php
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM messages ORDER BY timestamp DESC";
$result = $conn->query($sql);

$messages = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = array(
            'username' => $row['username'],
            'message' => $row['message'],
        );
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($messages);
?>
