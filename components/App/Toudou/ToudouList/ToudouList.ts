import {Vue, Component, Prop} from 'vue-property-decorator'
import ToudouElement from "@components/ToudouElement"
import Bouton from "@components/Bouton"
import { TodoModel } from "@models/ToudouModels"

/**
 * App main component
 */
@Component({ components : { ToudouElement, Bouton }})
export default class ToudouList extends Vue {
  // Note : Dans l'idéal, on aurait voulu passer "todo" directement en tant que collection.
  // Le problème, c'est que les propriété sont "watchée" et transformée pour pouvoir déclencher
  //   d'autres traitements en cas de changement, et cela ne se fait pas correctement avec des
  //   collections. En wrappant la collection dans un objet (" { list: [] }"), la variable est 
  //   correctement intégrée et dynamique.
  @Prop()
  private todos!: {
    list: TodoModel[]
  }

  private add(): void {
    this.$emit("add")
  }

  private edit(id): void {
    this.$emit("edit", id)
  }

  private remove(id): void {
    this.$emit("remove", id)
  }
}
