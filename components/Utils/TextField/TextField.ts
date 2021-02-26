import {Vue, Component, Prop} from 'vue-property-decorator'

/**
 * Bouton
 */
@Component
export default class TextField extends Vue {
    @Prop({default: "Label"})
    private label!: string

    @Prop({default: ""})
    private value!: string

    private change(event): void {
        this.$emit("change", event.target.value)
    }
}
