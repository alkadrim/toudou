<template>
  <div class="Toudou">
    <div class="Toudou-List">
      <ToudouList
        :todos="todos"
        @add="launchAdd"
        @edit="launchEdit"
      />
    </div>
    <div
      v-if="editing"
      class="Toudou-Edit"
    >
      <ToudouEdit
        :todo="editedTodo"
        @exit="exitEdit"
        @submit="submitEdit"
      />
    </div>
  </div>
</template>

<script src="./Toudou.ts"></script>

<style src="./Toudou.scss" lang="scss">

</style>
