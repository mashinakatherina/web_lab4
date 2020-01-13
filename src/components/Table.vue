<template>
    <table class="results">
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Попадание</th>
            <th>Текущее время</th>
            <th>Время работы, мкс</th>
        </tr>
        <tr>
            <td>0.38</td>
            <td>-0.37</td>
            <td>1</td>
            <td class="green-color">Входит</td>
            <td>07:33:43</td>
            <td>22.3289</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "Table"
    }
</script>

<style scoped>
    .results {
        flex-grow: 1;
    }

    .results tr:nth-child(odd) {
        background-color: #f5f5f5;
    }

    .results th {
        background-color: #d157dd;
        font-weight: 500;
    }

    .results td, th{
        border: solid 1px #747474;
        /* width: 14%; */
        padding: 5px 4px;
        text-align: center;
    }
</style>