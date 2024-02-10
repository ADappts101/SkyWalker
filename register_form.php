<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="form-container">
        <form action="" method="post">
            <h3>Register now!</h3>
            <input type="text" name="name" required placeholder="Enter Your Name...">
            <input type="email" name="email" required placeholder="Enter Your Email...">
            <input type="password" name="password" required placeholder="Enter Your Password...">
            <input type="password" name="cpassword" required placeholder="Confirm Your Password...">
            <select name="user_type">
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
            <input type="submit" name="submit" value="register now" class="form-btn">
            <p>Already have an account? <a href="login_form">Login Now!</a></p>
        </form>
    </div>
</body>
</html>
