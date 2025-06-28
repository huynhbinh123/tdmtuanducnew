<template>
  <div>
    <TiptapEditorContent :editor="editor" />

  </div>
</template>

<script setup>
import '~/assets/css/editor.scss'
import VueComponent from '~/helpers/TipTapExtension'
import { VnwaMediaModalPanel } from '#components'
import Image from '@tiptap/extension-image'
const { $storage } = useNuxtApp()
const editorContent = defineModel('modelValue');


const editor = useEditor({
  content: editorContent.value,
  extensions: [TiptapStarterKit, VueComponent, Image, ImageResize],
  editable: false,

  onUpdate({ editor }) {
    editorContent.value = editor.getHTML();
  },
});



</script>
<style></style>