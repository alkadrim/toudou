import {Vue, Component, Prop} from 'vue-property-decorator'
import Bouton from "@components/Bouton"
import { TodoModel } from "@models/ToudouModels"

/**
 * App main component
 */
@Component({ components: { Bouton }})
export default class ToudouElement extends Vue {
  @Prop({ default: () => { return { titre: "", description: "", participant: "" }}})
  private todo!: TodoModel

  private edit(): void {
    this.$emit("edit")
  }

  private remove(): void {
    this.$emit("remove")
  }
}
