<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "music_player";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username='$user'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row["password"])) {
            $_SESSION["username"] = $user;
            header("Location: player.html");
        } else {
            echo "<script>alert('Invalid password');window.location.href='indx.html';</script>";
        }
    } else {
        echo "No user found";
    }
}
$conn->close();
?>
