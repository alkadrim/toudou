<template>
  <div class="TextField">
    <div class="TextField-Label">
      {{label}}
    </div>
    <div class="TextField-Field">
      <input
        type="text"
        :value="value"
        @change="change"
      />
    </div>
  </div>
</template>

<script src="./TextField.ts"></script>

<style src="./TextField.scss" lang="scss">

</style>
