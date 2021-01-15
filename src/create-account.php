<?php

require_once('DB.php');

?>


<!DOCTYPE html>
<html>

<head>
    <?php include('header.php');?>
    <title>Create an account</title>
</head>

<body>
    <div class="container">

        <h1 class="text-center my-5">Sign up for Tasks</h1>


        <form>
            <!-- email -->
            <div class="form-group">
                <label for="new-email">Email address</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class='bx bx-envelope'></i></span>
                    </div>
                    <input type="email" class="form-control" id="new-email">
                    <div class="invalid-feedback"></div>
                    <div class="valid-feedback"></div>
                </div>
            </div>

            <!-- password 1 -->
            <div class="form-group">
                <label for="new-password-1">Password</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class='bx bxs-lock-alt'></i></span>
                    </div>
                    <input type="password" class="form-control" id="new-password-1">
                    <div class="invalid-feedback"></div>
                    <div class="valid-feedback"></div>
                </div>
            </div>

            <!-- password 2 -->
            <div class="form-group">
                <label for="new-password-2">Re-enter password</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class='bx bxs-lock-alt'></i></span>
                    </div>
                    <input type="password" class="form-control" id="new-password-2">
                    <div class="invalid-feedback"></div>
                    <div class="valid-feedback"></div>
                </div>
            </div>

            <button type="button" class="btn btn-primary" id="btn-create-account">Create account</button>

        </form>







    </div>
    <?php include('footer.php');?>
    <script src="js/create-account.js"></script>
</body>

</html>