import {Vue, Component, Prop} from 'vue-property-decorator'
import ToudouElement from "@components/ToudouElement"
import Bouton from "@components/Bouton"

/**
 * App main component
 */
@Component({ components : { ToudouElement, Bouton }})
export default class ToudouList extends Vue {
  @Prop({ default: () => { return []}})
  private todos

  private add(): void {
    this.$emit("add")
  }

  private edit(id): void {
    this.$emit("edit", id)
  }
}
