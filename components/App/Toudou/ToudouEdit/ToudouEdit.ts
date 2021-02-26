import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import Bouton from "@components/Bouton"
import TextField from "@components/TextField"
import { TodoModel } from '@models/ToudouModels'

/**
 * App main component
 */
@Component({ components : { Bouton, TextField }})
export default class ToudouEdit extends Vue {
  @Prop()
  private todo!: TodoModel

  private titre = ""
  private description = ""
  private participant = ""

  private mounted(): void {
    this.syncFields()
  }

  // Note : Watch("XXX") => La fonction se lance automatiquement si la propriété "XXX" change
  // Ici, si le parent modifie la propriété "todo", la fonction se relance.
  @Watch("todo")
  private syncFields(): void {
    this.titre = this.todo.titre
    this.description = this.todo.description
    this.participant = this.todo.participant
  }

  private submit() {
    console.log("emitting")
    console.log(
      {
        id: this.todo.id,
        titre: this.titre,
        description: this.description,
        participant: this.participant
      }
    )
    this.$emit(
      "submit",
      {
        id: this.todo.id,
        titre: this.titre,
        description: this.description,
        participant: this.participant
      }
    )
  }

  private exit() {
    this.$emit("exit")
  }
}
