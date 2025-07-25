import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import BlockTest from '~/components/block/Test.vue'

export default Node.create({
    name: 'vueComponent',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            count: {
                default: 0,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'vue-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['vue-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(BlockTest)
    },
})