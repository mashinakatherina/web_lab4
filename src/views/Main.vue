<template>
    <div class="wrapper">
        <div class="content">
            <div class="links">
                <h2>Укажите параметры X, Y и R</h2>
                <a href="/" v-on:click.prevent="logoutRequest" class="logout">Выйти</a>
            </div>
            <div class="content-wrapper">
                <div v-on:click="addPointFromCanvas" class="graph">
                    <canvas id="plot" width="300" height="300"></canvas>
                </div>

                <div class="selection">
                    <form v-on:submit.prevent="addPoint">
                        <div class="form-select x-select">
                            <label class="selection-label">Выберите X
                                <span :class="{'icon-visible':!xValid}" class="warning" data-validate="Выберите X"></span>
                            </label>
                            <div class="select-buttons">
                                <button v-for="num in buttons" v-bind:key="num" v-model="x" @click="changeButton" class="changeX" type="button">{{num}}</button>
                            </div>
                        </div>
                        <div class="form-select y-select">
                            <!--suppress XmlInvalidId -->
                            <label class="selection-label" for="Y-select">Введите Y
                                <span :class="{'icon-visible':!yValid}" class="warning" data-validate="Y - значение в диапазоне [-3; 3]"></span>
                            </label>
                            <number-input v-model="y" @change="validateY" :step="0.001" :attrs="{id: 'Y-select'}" type="text" placeholder="-3...3" name="y" size="small" autocomplete="off"></number-input>
                        </div>
                        <div class="form-select r-select">
                            <label class="selection-label">Выберите R
                                <span :class="{'icon-visible':!rValid}" class="warning" data-validate="R - положительное число"></span>
                            </label>
                            <div class="select-buttons">
                                <button v-for="num in buttons" v-bind:key="num" v-bind:class="{'btn-hold':(num === 1)}" v-model="r" @click="changeButton($event); reDrawGraph()" class="changeR" type="button">{{num}}</button>
                            </div>
                        </div>
                        <div class="form-buttons">
                            <input class="form-btn btn-submit" type="submit" value="Отправить">
                        </div>
                    </form>
                </div>

                <table class="results">
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Попадание</th>
                        </tr>
                    </thead>
                    <tbody v-if="listOfPoints.length">
                        <tr v-for="cPoint in listOfPoints">
                            <td>{{cPoint.x}}</td>
                            <td>{{cPoint.y}}</td>
                            <td>{{cPoint.r}}</td>
                            <td v-if="cPoint.result" class="green">Входит</td>
                            <td v-else class="red">Не входит</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4">Нет данных</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                response: null,
                listOfPoints: [],
                buttons: [-3, -2, -1, 0, 1, 2, 3],
                x: null,
                y: null,
                r: 1,
                xValid: true,
                yValid: true,
                rValid: true
            }
        },
        methods: {
            logoutRequest: function () {
                this.$axios({
                    method: 'post',
                    url: this.$BaseURL + 'logout',
                }).then(response => {
                    this.response = response;
                    localStorage.removeItem('currentUser');
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error);
                });
            },
            getPointsRequest: function () {
                let base64Credential = localStorage.getItem('currentUser');
                return this.$axios({
                    method: 'get',
                    url: this.$BaseURL + 'points',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': base64Credential
                    }
                }).then(response => {
                    if (response.data.length){
                        this.listOfPoints.splice(0, this.listOfPoints.length, ...response.data);
                    }
                }).catch(error => {
                    console.log(error.response.data);
                });
            },
            addPointRequest: function (x, y, r) {
                let base64Credential = localStorage.getItem('currentUser');
                return this.$axios({
                    method: 'post',
                    url: this.$BaseURL + 'points',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': base64Credential
                    },
                    data: {x: x, y: y, r: r}
                }).then(response => {
                    let result = response.data.result;
                    this.drawDefinedPoint(x, y, result);
                    this.listOfPoints.unshift({x: x, y: y, r: r, result: result});
                    this.response = response;
                }).catch(error => {
                    console.log(error.response.data);
                    return false;
                });
            },
            addPointFromCanvas: function (e) {
                const point = this.getPointCoordinates(e);
                this.addPointRequest(point.x, point.y, this.r);
            },
            addPoint: function () {
                if (this.x == null) {this.xValid = false}
                if (this.y == null) {this.yValid = false}
                if (this.r == null) {this.rValid = false}

                if (this.xValid && this.yValid && this.rValid) {
                    this.addPointRequest(this.x, this.y, this.r);
                }
            },
            drawDefinedPoint: function (x , y, result) {
                const plot_canvas = document.querySelector("#plot");
                const context = plot_canvas.getContext("2d");
                context.beginPath();
                context.arc(x*28 + 150, 150 - 28*y, 2, 0, 2 * Math.PI);
                context.fillStyle = (result) ? 'rgba(255,240,245,0.98)' : '#d50c11';
                context.fill();
            },
            // Возвращает реальную координату точки
            getPointCoordinates: function (e) {
                return {
                    x: ((e.offsetX - 150) / 28).toFixed(2),
                    y: ((-e.offsetY + 150) / 28).toFixed(2)
                }
            },
            checkArea: function (x, y, r) {
                return (((x <= r && x >= 0 && y >= -r/2 && y <= 0)
                    || ((y <= -x*2 + r) && y >= 0 && x >= 0)
                    || ((x*x + y*y) <= r*r && x <=0 && y <= 0)));
            },
            drawGraph: function () {
                const plot_canvas = document.querySelector("#plot");
                const context = plot_canvas.getContext("2d");
                let canvLength = plot_canvas.width;

                if (this.rValid) {
                    this.drawArea(context, canvLength);
                }

                context.beginPath();
                //Ox
                context.moveTo(10, canvLength / 2);
                context.lineTo(canvLength - 10, canvLength / 2);
                context.lineTo(canvLength - 20, canvLength / 2 - 7);
                context.moveTo(canvLength - 10, canvLength / 2);
                context.lineTo(canvLength - 20, canvLength / 2 + 7);
                //Oy
                context.moveTo(canvLength / 2, canvLength - 10);
                context.lineTo(canvLength / 2, 10);
                context.lineTo(canvLength / 2 - 7, 20);
                context.moveTo(canvLength / 2, 10);
                context.lineTo(canvLength / 2 + 7, 20);
                //Dashes
                for (let i = 10 + 28; i < canvLength * 291 / 300 - 28; i += 28) {
                    context.moveTo(canvLength / 2, canvLength * (i) / 300);
                    context.lineTo(canvLength * 146 / 300, canvLength * (i) / 300);
                    context.lineTo(canvLength * 154 / 300, canvLength * (i) / 300);
                    context.moveTo(canvLength * (i) / 300, canvLength / 2);
                    context.lineTo(canvLength * (i) / 300, canvLength * 146 / 300);
                    context.lineTo(canvLength * (i) / 300, canvLength * 154 / 300);
                }
                context.closePath();
                context.stroke();

                //Names of dashes
                context.fillStyle = '#000000';
                context.font = '14px Arial';
                context.fillText("X", canvLength - 20, canvLength / 2 - 13);
                context.fillText("Y", canvLength / 2 - 20, 20);
                context.fillText("1", canvLength * 173 / 300, canvLength / 2 - canvLength * 10 / 300);
                context.fillText("1", canvLength / 2 - canvLength * 17 / 300, canvLength * 127 / 300);

                //Already drawn points
                for (let point of this.listOfPoints) {
                    let result = this.checkArea(point.x, point.y, this.r);
                    this.drawDefinedPoint(point.x, point.y, result);
                }
            },
            drawArea: function (context, canvLength) {
                context.beginPath();
                context.arc(canvLength / 2, canvLength / 2, canvLength * 28 * (this.r / 2) / 150,  Math.PI / 2, 1*Math.PI);
                context.lineTo(canvLength / 2, canvLength / 2);
                context.closePath();
                context.rect(canvLength / 2, canvLength / 2 ,  canvLength * 28 * this.r / 300, canvLength * 28 * (this.r / 2) / 300);
                context.fillStyle = '#660bae';
                context.fill();
                context.beginPath();
                context.moveTo(canvLength / 2, canvLength / 2);
                context.lineTo(canvLength / 2, canvLength / 2 - canvLength * 28 * this.r / 300);
                context.lineTo(canvLength / 2 + canvLength * 28 * (this.r/2) / 300, canvLength / 2);
                context.lineTo(canvLength / 2, canvLength / 2);
                context.closePath();
                context.fillStyle = '#660bae';
                context.fill();
            },
            reDrawGraph: function () {
                const plot_canvas = document.getElementById("plot");
                const context = plot_canvas.getContext('2d');
                context.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
                this.drawGraph();
            },
            changeButton: function (event) {
                Array.from(event.target.parentElement.children).forEach(el => el.classList.remove('btn-hold'));
                switch (event.target.className) {
                    case 'changeX':
                        this.x = parseInt(event.target.innerText);
                        this.xValid = true;
                        break;
                    case 'changeR':
                        this.r = parseInt(event.target.innerText);
                        this.rValid = this.r > 0;
                        break;
                }
                event.target.classList.add('btn-hold');
            },
            validateY: function () {
                this.yValid = this.y >= -3 && this.y <= 3;
            }
        },
        mounted() {
            // При загрузке страницы получаем от сервера массив точек и добавляем его в data
            this.getPointsRequest().then(() => {
                this.$nextTick(() => {
                    this.drawGraph();
                });
            });
        }
    }
</script>

<style scoped>
    .content {
        max-width: 1264px;
        margin: 0 auto;
        padding: 0 15px;
    }

    .content-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .content-wrapper > * {
        margin-bottom: 15px;
        box-shadow: 0 2px 10px rgba(59, 64, 69, 0.08);
    }

    .links {
        display: flex;
        justify-content: space-between;
    }

    header {
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

    /* ====== Graph ====== */

    .graph {
        height: 300px;
        width: 300px;
        margin-right: 20px;
        background-color: #fff;
        border-radius: 5px;
    }

    #plot {
        cursor: pointer;
    }

    /* ====== Form ====== */

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
    }

    .select-buttons > button {
        display: inline-block;
        width: 1.7rem;
        padding: 4px 0;
        background-color: transparent;
        border: 1px solid #c8c8c8;
        border-right: 0;
        text-align: center;
        outline: none;
        cursor: pointer;
        transition: background-color, color .15s, .15s ease, ease;
    }

    .select-buttons > button:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .select-buttons > button:last-child {
        border-right: 1px solid #c8c8c8;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .select-buttons > button:hover {
        background-color: #eee;
    }


    .form-btn {
        width: 100%;
        padding: 10px 22px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        outline: 0;
    }

    .btn-submit {
        background-color: #660bae;
        margin-right: 5px;
    }

    .btn-submit:hover {
        background-color: #660bae;
    }

    .clear-cookie {
        display: none;
        background-color: hsla(17, 83%, 48%, 1);
    }

    .clear-cookie:hover {
        background-color: hsl(17, 83%, 44%);
    }

    .warning {
        content: attr(data-validate);
        display: inline-block;
        visibility: hidden;
        position: relative;
        background-size: 15px;
        width: 15px;
        height: 15px;
        background-image: url("../assets/warning.svg");
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

    /* ====== Table ====== */

    .results {
        border-radius: 4px;
        flex-grow: 1;
    }

    .results tr:nth-child(odd) {
        background-color: #660bae;
    }

    .results tr:nth-child(even) {
        background-color: #660bae;
    }

    .results th {
        background-color: #660bae;
        font-weight: 500;
    }

    .results td, .results th {
        border-right: solid 2px #d157dd;
        /* width: 14%; */
        padding: 5px 4px;
        text-align: center;
    }

    .results tr td:last-child, .results tr th:last-child {
        border-right: 0;
    }

    .results tr:first-child th:first-child {
        border-top-left-radius: 5px;
    }
    .results tr:first-child th:last-child {
        border-top-right-radius: 5px;
    }
    .results tr:last-child td:first-child {
        border-bottom-left-radius: 5px;
    }
    .results tr:last-child td:last-child {
        border-bottom-right-radius: 5px;
    }
</style>

<style>
    #Y-select {
        display: block;
        width: 2rem;
        min-width: 1rem;
        padding: 0 0.5rem;
        border: solid 1px #c8c8c8;
        border-radius: 4px;
    }

    #Y-select:focus {
        border-color: #2086d2;
    }
</style>