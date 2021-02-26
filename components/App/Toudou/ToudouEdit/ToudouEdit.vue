<template>
    <div class="ToudouEdit">
      <TextField
        label="Titre"
        :value="todo.titre"
        @change="(value) => { this.titre = value}"
      />
      <TextField
        label="Description"
        :value="todo.description"
        @change="(value) => { this.description = value}"
      />
      <TextField
        label="Participant"
        :value="todo.participant"
        @change="(value) => { this.participant = value}"
      />
      <Bouton
        label="Ajouter"
        @click="submit"
      />
      <Bouton
        :secondary="true"
        label="Annuler"
        @click="exit"
      />
    </div>
</template>

<script src="./ToudouEdit.ts"></script>

<style src="./ToudouEdit.scss" lang="scss">

</style>
