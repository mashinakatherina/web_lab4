<template>
    <tr>
        <td>{{cPoint.x}}</td>
        <td>{{cPoint.y}}</td>
        <td>{{cPoint.r}}</td>
        <td v-if="cPoint.result" class="green">Попадает</td>
        <td v-else class="red">Не попадает</td>
    </tr>
</template>

<script>
    export default {
        name: "TableRow",
        props: {
            cPoint: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>