import {Vue, Component, Prop} from 'vue-property-decorator'
import Bouton from "@components/Bouton"
import TextField from "@components/TextField"

/**
 * App main component
 */
@Component({ components : { Bouton, TextField }})
export default class ToudouEdit extends Vue {
  @Prop()
  private todo

  private titre
  private description
  private participant

  private submit() {
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
