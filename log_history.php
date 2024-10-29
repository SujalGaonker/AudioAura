<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "music_player";

$conn = new mysqli($servername, $username, $password, $dbname);

if (isset($_SESSION["username"])) {
    $user = $_SESSION["username"];
    $song = $_POST["song_name"];

    $sql = "SELECT id FROM users WHERE username='$user'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $user_id = $row['id'];

    $sql = "INSERT INTO history (user_id, song_name) VALUES ($user_id, '$song')";
    $conn->query($sql);
}
$conn->close();
?>
