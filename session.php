<?php
session_start();

header('Content-Type: application/json');

// Check if a user is logged in by checking the session
if (isset($_SESSION['username'])) {
    echo json_encode(['loggedIn' => true, 'username' => $_SESSION['username']]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
