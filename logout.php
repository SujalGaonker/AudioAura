<?php
session_start();
session_unset();  // Clear all session variables
session_destroy();  // Destroy the session

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');  // Expire in the past

echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
?>
