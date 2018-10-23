<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
.loadingmask{position:absolute; width:100%; top:0; bottom:0; left:0; right:0; z-index:10000; background:#fff;}
</style>
