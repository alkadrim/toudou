<template>
    <div class="ToudouList">
      <Bouton
          :large="true"
          label="Ajouter"
          @click="add"
      />
      <div class="ToudouList-List">
        <ToudouElement
            v-for="(todo, todoIndex) in todos"
            :todo="todo"
            @edit="edit(todoIndex)"
        />
      </div>
    </div>
</template>

<script src="./ToudouList.ts"></script>

<style src="./ToudouList.scss" lang="scss">

</style>
