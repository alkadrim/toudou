import {Vue, Component} from 'vue-property-decorator'
import Toudou from "@components/Toudou"

/**
 * App main component
 */
@Component({ components: { Toudou }})
export default class App extends Vue {
}
