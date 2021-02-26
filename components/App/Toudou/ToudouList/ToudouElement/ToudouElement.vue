<template>
  <div class="ToudouElement">
    <div class="ToudouElement-Titre">
      <div class="ToudouElement-Label">
        Titre : 
      </div>
      {{todo.titre}}
    </div>
    <div class="ToudouElement-Description">
      <div class="ToudouElement-Label">
        Description : 
      </div>
      {{todo.description}}
    </div>
    <div class="ToudouElement-Participant">
      <div class="ToudouElement-Label">
        Participant : 
      </div>
      ({{todo.participant}})
    </div>
    <Bouton
      label="Modifier"
      :large="true"
      @click="edit"
    />
    <Bouton
      label="Supprimer"
      :large="true"
      :secondary="true"
      @click="remove"
    />
  </div>
</template>

<script src="./ToudouElement.ts"></script>

<style src="./ToudouElement.scss" lang="scss">

</style>
