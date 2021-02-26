import {Vue, Component} from 'vue-property-decorator'
import ToudouList from "@components/ToudouList"
import ToudouEdit from "@components/ToudouEdit"
import ToudouMockApi from "@api/ToudouMockApi"
import { TodoModel } from "@models/ToudouModels"

/**
 * App main component
 */
@Component({ components : { ToudouList, ToudouEdit }})
export default class Toudou extends Vue {
  private todos: TodoModel[] = []

  private editedTodo = {}
  private editing = false

  private mounted(): void {
    this.todos = ToudouMockApi.getSomeToudous()
  }

  private addTodo(todo): void {
    this.todos.push(todo)
    this.exitEdit()
  }

  private editTodo(todo, id): void {
    console.log(todo)
    console.log(id)
    console.log(this.todos[id])
    if (!this.todos[id]) {
      return
    }
    this.todos[id] = todo
    this.exitEdit()
  }

  private launchAdd(): void {
    this.editedTodo = {
      id: null,
      titre: "",
      description: "",
      participant: ""
    }
    this.editing = true
  }

  private launchEdit(id): void {
    if (!this.todos[id]) {
      return
    }
    this.editedTodo = {
      id: id,
      titre:  this.todos[id].titre,
      description:  this.todos[id].description,
      participant:  this.todos[id].participant
    }
    this.editing = true
  }

  private exitEdit(): void {
    this.editedTodo = {}
    this.editing = false
  }

  private submitEdit(todo): void {
    if (todo.id !== null) {
      const id = todo.id
      delete todo.id
      this.editTodo(todo, id)
    }
    else {
      delete todo.id
      this.addTodo(todo)
    }
  }

  private removeTodo(id): void {
    this.exitEdit()
    if (!this.todos[id]) {
      return;
    }
    this.todos.splice(id, 1)
  }
}
