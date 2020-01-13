<template>
<div id="app">
    <div class="header">
        <div class="header-inner">
            <div>Машина, Ноговицын, Р3210</div>
            <a class="header-logo" href="https://se.ifmo.ru/courses/web">
<!--                <img crossorigin="anonymous" src="./assets/itmo_logo.png" alt="itmo logo">-->
            </a>
            <div>Вариант 14891</div>
        </div>
    </div>
    <router-view/>
    <div class="alert"></div>
</div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap&subset=cyrillic');

    :focus {outline: none;}

    * {
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 16px;
    }

    body {
        margin: 0;
        width: 100%;
        height: 100vh;
        color: #fff;
        background: linear-gradient(-45deg, #660bae, #222ee7, #d50c11, #fb175a);
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

    table {
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
    }

    h1 {
        margin-bottom: 6px;
        font-size: 1.6rem;
        font-weight: 500;
    }

    a, router-link {
        color: #2c3e50;
        text-decoration: none;
    }

    h2 {
        margin-bottom: 15px;
        font-weight: 500;
    }

    input {
        font-family: 'Roboto', Arial, sans-serif;
        outline: 0;
    }

    .header {
        width: 100%;
        margin-bottom: 20px;
        background-color: #660bae ;
        font-size: 1rem;
        box-shadow: 0 1px 0 rgba(212, 229, 247, 0.1), 0 1px 6px rgba(59, 64, 69, 0.1);
        color:#fafafb;
        border-top: 3px solid #fafafb;
    }

    .header-inner {
        display: flex;
        max-width: 1264px;
        height: 46px;
        margin: 0 auto;
        padding: 0 15px;
        align-items: center;
        font-size: 15px;
        font-weight: 300;
    }

    .header-inner > * {
        width: calc(100% / 3);
    }

    .header-inner > *:first-child {
        text-align: left;
    }

    .header-inner > *:last-child {
        text-align: right;
    }

    .header-logo {
        padding: 5px 0;
        margin: 0 15px;
        min-width: 204px;
    }

    .header-logo img {
        display: block;
        height: 36px;
        margin: 0 auto;
    }

    .form-wrapper {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        overflow: auto;
    }

    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

    .green {
        color: #14ce81;
    }

    .red {
        color: #E04E15;
    }

    @media (max-width: 500px) {
        .header-inner > * {
            width: calc(100% / 2);
        }

        .header-logo {
            display: none;
        }
    }
</style>
