<template>
    <div class="selection">
        <form>
            <div class="form-select x-select">
                <label class="selection-label">Выберите X
                    <span class="warning" data-validate="Выберите X"></span>
                </label>
                <div class="select-buttons">
                    <button type="button">-3</button>
                    <button type="button">-2</button>
                    <button type="button">-1</button>
                    <button type="button">0</button>
                    <button type="button">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                </div>
            </div>
            <div class="form-select y-select">
                <label class="selection-label" for="Y-select">Выберите Y
                    <span class="warning" data-validate="Y - значение в диапазоне [-3; 3]"></span>
                </label>
                <input id="Y-select" type="text" placeholder="-5...3" name="y" autocomplete="off">
            </div>
            <div class="form-select r-select">
                <label class="selection-label">Выберите R
                    <span class="warning" data-validate="Выберите R"></span>
                </label>
                <div class="select-buttons">
                    <button type="button">-3</button>
                    <button type="button">-2</button>
                    <button type="button">-1</button>
                    <button type="button">0</button>
                    <button type="button">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                </div>
            </div>
            <div class="form-buttons">
                <input class="form-btn btn-submit" type="submit" value="Отправить">
                <input class="form-btn clear-cookie" type="button" value="Стереть куки">
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Form"
    }
</script>

<style scoped>
    .selection {
        background-color: #fff;
        margin-right: 20px;
        border-radius: 5px;
        padding: 10px;
    }

    .form-select {
        margin-bottom: 10px;
    }

    .selection-label {
        display: block;
        margin-bottom: 4px;
        position: relative;
    }

    .selection-label:hover .icon-visible::after {
        visibility: visible;
        opacity: 1;
    }

    .select-buttons {
        display: flex;
        justify-content: space-between;
    }

    .select-buttons > button {
        display: inline-block;
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 4px;
        padding: 3px 0;
        width: 1.5rem;
        text-align: center;
        outline: none;
        cursor: pointer;
        margin: 0 2px;
    }

    .select-buttons > button:hover {
        background-color: #eee;
    }

    .btn-hold {
        background-color: #4F93E8 !important;
        color: #fff;
    }

    #Y-select {
        display: block;
        width: 2rem;
        padding: 3px 5px 2px 5px;
        border: solid 1px #c8c8c8;
        border-radius: 4px;
        outline: 0;
    }

    #Y-select:focus {
        border-color: #2086d2;
    }

    .form-btn {
        padding: 10px 22px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        outline: 0;
    }

    .btn-submit {
        background-color: #14ce81;
        margin-right: 5px;
    }

    .submit-form:hover {
        background-color: hsla(155, 82%, 40%, 1);
    }

    .clear-cookie {
        background-color: hsla(17, 83%, 48%, 1);
    }

    .clear-cookie:hover {
        background-color: hsl(17, 83%, 44%);
    }

    .icon-visible {
        visibility: visible;
        opacity: 1;
    }

    .warning {
        content: attr(data-validate);
        display: inline-block;
        visibility: hidden;
        position: relative;
        background-size: 15px;
        width: 15px;
        height: 15px;
        background-image: url("/assets/warning.svg");
        vertical-align: top;
        margin: 2px 0 0 6px;
        transition: opacity 0.5s ease;
        transform-style: preserve-3d;
    }

    .warning::after {
        content: attr(data-validate);
        position: absolute;
        visibility: hidden;
        opacity: 0;
        width: max-content;
        left: -5px;
        top: 50%;
        padding: 4px 4px 3px 23px;
        font-size: 0.8rem;
        font-weight: 500;
        background-color: #fff;
        color: #c80000;
        border: 1px solid #c80000;
        border-radius: 3px;
        transform: translateY(-50%) translateZ(-1px);
        transition: opacity .2s;
    }
</style>