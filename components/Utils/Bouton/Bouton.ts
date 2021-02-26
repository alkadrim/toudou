import {Vue, Component, Prop} from 'vue-property-decorator'

/**
 * Bouton
 */
@Component
export default class Bouton extends Vue {
    @Prop({default: "Label"})
    private label!: string

    @Prop({ default: false})
    private large!: boolean

    @Prop({ default: false})
    private secondary!: boolean

    private click(): void {
        this.$emit("click")
    }

    private get classNames() {
        return {
            large: this.large,
            secondary: this.secondary
        }
    }
}
