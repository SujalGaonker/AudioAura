<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "music_player";

$conn = new mysqli($servername, $username, $password, $dbname);

if (isset($_SESSION["username"])) {
    $user = $_SESSION["username"];

    $sql = "SELECT id FROM users WHERE username='$user'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $user_id = $row['id'];

    $sql = "SELECT song_name, played_at FROM history WHERE user_id=$user_id ORDER BY played_at DESC";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        echo "<li>{$row['song_name']} - {$row['played_at']}</li>";
    }
}
$conn->close();
?>
