<template>
  <div
    class="Bouton"
    :class="classNames"
    @click="click"
  >
    <div class="Bouton-Text">
      {{label}}
    </div>
  </div>
</template>

<script src="./Bouton.ts"></script>

<style src="./Bouton.scss" lang="scss">

</style>
