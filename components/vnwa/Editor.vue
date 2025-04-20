<template>
  <div>
    <div class="border-2 border-sky-700 dark:border-sky-500 rounded-md divide-y">
      <div v-if="editor" class="p-2  flex  flex-wrap divide-x-2 ">
        <div class="flex items-center justify-center px-2 gap-2 ">
          <UTooltip text="Font Bold">
            <UButton variant="soft" @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()" color="white"
              :class="{ 'text-purple-500': editor.isActive('bold') }" icon="fa6-solid:bold" size="xs" />
          </UTooltip>
          <UTooltip text="Font Italic">
            <UButton variant="soft" @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()" color="white"
              :class="{ 'text-purple-500': editor.isActive('italic') }" icon="fa6-solid:italic" size="xs" />
          </UTooltip>
          <UTooltip text="Font Strike">
            <UButton variant="soft" @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()" color="white"
              :class="{ 'text-purple-500': editor.isActive('strike') }" icon="fa6-solid:strikethrough" size="xs" />
          </UTooltip>


        </div>
        <div class="flex items-center justify-center px-2 gap-2 ">
          <UButton variant="soft" @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('code') }" icon="fa6-solid:code" size="xs" />
        </div>

        <div class="flex items-center justify-center px-2 gap-2 ">
          <UTooltip text="H1 Main Title">
            <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" color="white"
              :class="{ 'text-purple-500': editor.isActive('heading', { level: 1 }) }" icon="material-symbols:format-h1"
              size="xs" />
          </UTooltip>
          <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('heading', { level: 2 }) }" icon="material-symbols:format-h2"
            size="xs" />

          <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('heading', { level: 3 }) }" icon="material-symbols:format-h3"
            size="xs" />

          <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('heading', { level: 4 }) }" icon="material-symbols:format-h4"
            size="xs" />

          <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('heading', { level: 5 }) }" icon="material-symbols:format-h5"
            size="xs" />

          <UButton variant="soft" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" color="white"
            :class="{ 'text-purple-500': editor.isActive('heading', { level: 6 }) }" icon="material-symbols:format-h6"
            size="xs" />


        </div>
        <div class="flex items-center justify-center px-2 gap-2 ">
          <!-- <UButton @click="addUiBlock(editor)" color="white" label="UI Block" icon="material-symbols:box-outline-sharp"
            size="md" /> -->
          <UButton @click="addImages(editor)" color="white" icon="material-symbols:folder-managed"
            label="VMedia Manager" size="md" />
        </div>



      </div>
      <div class="px-3 py-4">
        <TiptapEditorContent :editor="editor" />

      </div>
      <div>
      </div>
    </div>

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
  extensions: [TiptapStarterKit, VueComponent, Image],
  // editable: false,

  onUpdate({ editor }) {
    editorContent.value = editor.getHTML();
  },
});
watch(() => editorContent.value, (newContent) => {
  if (!!unref(editor)) {
    unref(editor).commands.setContent(newContent);
  }



});
const addUiBlock = (vnwaEditor) => {
  vnwaEditor.commands.insertContent('<vue-component count="235"></vue-component>')
}

const overlay = useOverlay()
const modal = overlay.create(VnwaMediaModalPanel)


const addImages = (vnwaEditor) => {

  modal.open({
    isSelect: true,
    onSuccess(data) {
      data.forEach(element => {
        vnwaEditor.commands.setImage({
          src: $storage(element.path),
          alt: 'VnwaMedia image',
          title: element.name,
        })
        modal.close()
      });
    }
  })
}

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>
<style></style>