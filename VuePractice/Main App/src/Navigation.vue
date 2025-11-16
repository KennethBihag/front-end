<template>
<ul>
    <li v-for="(p,i) in Common.gPaths">
        <router-link :to="p">
            {{ Common.gHeaderOpts[i] }}
        </router-link>
    </li>
</ul>
</template>

<script setup>
import * as Common from './common'
</script>

<style scoped>
li {
    margin: auto;
    height: 1.5rem;
    font-size: 1rem;
}

li:hover {
    font-size: 1.5rem;
}
</style>