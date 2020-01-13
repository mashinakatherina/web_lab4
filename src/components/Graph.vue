<template>
    <div class="graph">
        <canvas id="plot" width="300" height="300"></canvas>
    </div>
</template>

<script>
export default {
    name: "Graph"
}
const $ = require('jquery');
window.$ = $;

$(function () {
    let canv = document.getElementById("plot");
    let ctx = canv.getContext("2d");
    let canvWidth = canv.width;

    drawGraph();

    function drawGraph() {
        ctx.fillStyle = '#660bae';
        ctx.beginPath();
        ctx.arc(canvWidth/2, canvWidth/2, canvWidth*13/30, -Math.PI/2 ,-1*Math.PI );
        ctx.lineTo(canvWidth/2, canvWidth/2);
        ctx.rect(canvWidth/2, canvWidth/2, canvWidth*2/5, canvWidth*2/10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(canvWidth/2, canvWidth/2);
        ctx.lineTo(canvWidth/2, canvWidth/10);
        ctx.lineTo(canvWidth*7/10, canvWidth/2);
        ctx.closePath();
        ctx.fill();
        //Ox arrow
        ctx.beginPath();
        ctx.moveTo(10, canvWidth / 2);
        ctx.lineTo(canvWidth - 10, canvWidth / 2);
        ctx.lineTo(canvWidth - 20, canvWidth / 2 - 5);
        ctx.moveTo(canvWidth - 10, canvWidth / 2);
        ctx.lineTo(canvWidth - 20, canvWidth / 2 + 5);
        //Oy arrow
        ctx.moveTo(canvWidth / 2, canvWidth - 10);
        ctx.lineTo(canvWidth / 2, 10);
        ctx.lineTo(canvWidth / 2 - 5, 20);
        ctx.moveTo(canvWidth / 2, 10);
        ctx.lineTo(canvWidth / 2 + 5, 20);
        //Dashes
        ctx.moveTo(canvWidth / 6, canvWidth / 2 - 4);
        ctx.lineTo(canvWidth / 6, canvWidth / 2 + 4);
        ctx.moveTo(canvWidth / 2 - 4, canvWidth / 6);
        ctx.lineTo(canvWidth / 2 + 4, canvWidth / 6);
        ctx.moveTo(canvWidth * 5 / 6, canvWidth / 2 - 4);
        ctx.lineTo(canvWidth * 5 / 6, canvWidth / 2 + 4);
        ctx.moveTo(canvWidth / 2 - 4, canvWidth * 5 / 6);
        ctx.lineTo(canvWidth / 2 + 4, canvWidth * 5 / 6);

        ctx.moveTo(canvWidth / 3, canvWidth / 2 - 4);
        ctx.lineTo(canvWidth / 3, canvWidth / 2 + 4);
        ctx.moveTo(canvWidth / 2 - 4, canvWidth / 3);
        ctx.lineTo(canvWidth / 2 + 4, canvWidth / 3);
        ctx.moveTo(canvWidth * 4 / 6, canvWidth / 2 - 4);
        ctx.lineTo(canvWidth * 4 / 6, canvWidth / 2 + 4);
        ctx.moveTo(canvWidth / 2 - 4, canvWidth * 4 / 6);
        ctx.lineTo(canvWidth / 2 + 4, canvWidth * 4 / 6);

        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText("X", canvWidth - 20, canvWidth / 2 - 10);
        ctx.fillText("Y", canvWidth / 2 - 16, 20);
        ctx.fillText("-R", canvWidth / 6 - 9, canvWidth / 2 - 5);
        ctx.fillText("-R/2", canvWidth / 3 - 12, canvWidth / 2 - 6);
        ctx.fillText("R", canvWidth / 2 - 17, canvWidth / 6 + 4);
        ctx.fillText("R/2", canvWidth / 2 - 29, canvWidth / 3 + 4);
        ctx.fillText("R", canvWidth * 5 / 6 - 5, canvWidth / 2 - 5);
        ctx.fillText("R/2", canvWidth * 4 / 6 - 10, canvWidth / 2 - 6);
        ctx.fillText("-R", canvWidth / 2 - 22, canvWidth * 5 / 6 + 4);
        ctx.fillText("-R/2", canvWidth / 2 - 34, canvWidth * 4 / 6 + 4);
    }

    $('#plot').on('click', (e) => {
        let r = $('.r-select button.btn-hold').text();
        if (r === '') {
            $('.r-select .warning').addClass('icon-visible');
        } else {
            let dot = getCursorPosition(e);
            let x = (dot.x - canv.width / 2) * r / 100;
            let y = -(dot.y - canv.height / 2) * r / 100;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
            $.ajax({
                type: 'POST',
                url: 'controller',
                data: {'x_value': x, 'y_value': y, 'r_value': r},
                success: function (data) {
                    // $('.results > tbody').append(data);
                    $('.results > tbody:first-child').after(data);
                },
                error: function (jqXHR) {
                    $('.alert').text("Ошибка " + jqXHR.status + ": " + jqXHR.statusText).slideDown().delay(2000).slideUp();
                }
            });
            // console.log(x + " " + y);
            ctx.fillStyle = 'green';
            ctx.fill();
        }
    });

    function getCursorPosition(e) {
        let x, y;
        if (e.offsetX !== undefined && e.offsetY !== undefined) {
            x = e.offsetX;
            y = e.offsetY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {x: x, y: y};
    }
})
</script>

<style scoped>
    .graph {
        margin-right: 20px;
        height: 300px;
        width: 300px;
        background-color: aliceblue;
        border-radius: 6px;
    }

    #plot {
        cursor: pointer;
    }
</style>