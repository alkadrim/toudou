<template>
  <div class="ToudouElement">
    <div class="ToudouElement-Titre">
      {{todo.titre}}
    </div>
    <div class="ToudouElement-Description">
      {{todo.description}}
    </div>
    <div class="ToudouElement-Participant">
      ({{todo.participant}})
    </div>
    <Bouton
      label="Modifier"
      :large="true"
      @click="edit"
    />
  </div>
</template>

<script src="./ToudouElement.ts"></script>

<style src="./ToudouElement.scss" lang="scss">

</style>
