import {Vue, Component, Prop} from 'vue-property-decorator'
import Bouton from "@components/Bouton"

/**
 * App main component
 */
@Component({ components: { Bouton }})
export default class ToudouElement extends Vue {
  @Prop()
  private todo

  private edit(): void {
    this.$emit("edit")
  }
}
