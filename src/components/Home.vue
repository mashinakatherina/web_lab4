<template>
    <div id="home">

        <link rel="stylesheet" type="text/css" href="/resources/css/background.css">
        <link rel="stylesheet" type="text/css" href="/resources/css/style.css">
        <link rel="stylesheet" type="text/css" href="/resources/sass/header.scss">

        <title>Hello page</title>

        <header class='header' data-animate-header-container>
            <menu class='header-bar' data-animate-header>
                <a class='btn-menu' data-toggle-class='menu-active' href='https://vk.com/mashina.katherina'>Машина Ек.Ал.</a>
                <a class='btn-menu' data-toggle-class='menu-active' href='https://vk.com/id503953071'>Ноговицын М.П.</a>
                <a href='http://www.ifmo.ru/ru/schedule/0/P3210/raspisanie_zanyatiy_P3210.htm' class='btn-search'
                   data-toggle-class='search-active'>Группа P3210</a>
            </menu>
        </header>

        <div id="home-component">
            <h1>Welcome!</h1>
            <p>Click <router-link to="/main">here</router-link> to see a main page.</p>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style>
    a:hover {
        text-decoration: underline;
    }
    #home-component{
        margin: auto
    }
</style>