<template>
    <div id="login">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="">
            <meta name="author" content="">
            <!--<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>-->
            <title>Please sign in</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
            <link href="https://getbootstrap.com/docs/4.0/examples/signin/signin.css" rel="stylesheet" crossorigin="anonymous"/>
        </head>
        <body>
        <div class="container">
            <form class="form-signin" method="post" action="/login">
                <h2 class="form-signin-heading" style="text-align: center">SING IN</h2>
                <div v-if="error != null" class="alert alert-danger">{{err_msg}}</div>
                <div v-if="logout != null" class="alert alert-success">{{logout_msg}}</div>
                <p>
                    <label for="username" class="sr-only">Username</label>
                    <input type="text" id="username" name="username" class="form-control" placeholder="Username" required
                           autofocus>
                </p>
                <p>
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>
                </p>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

            </form>
            <form class="form-signin">
                <a href="reg">
                    <button class="btn btn-outline-dark btn-block" type="button">Sign up</button>
                </a>
            </form>
        </div>
        </body>
    </div>
</template>

<script>
    let urlP = new URLSearchParams(window.location.search);

    export default {
        name: 'login',
        data: function() {
            return {
                error: urlP.get('error'),
                logout: urlP.get('logout'),
                err_msg: 'Invalid username and password.',
                logout_msg: 'You have been logged out.'
            }
    }
    }

</script>

<style>
    body {
        margin: 0;
        width: 100%;
        height: 100vh;
        font-family: "Exo", sans-serif;
        color: #fff;
        background: linear-gradient(-45deg, #ee7752, #e74131, #d5b75d, #d5a68b);
        background-size: 400% 400%;
        animation: gradientBG 15s ease infinite;
    }

    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>