<template>
  <div>
    <div class="border-2 border-sky-700 dark:border-sky-900 rounded-md divide-y">
      <UModal title="Add Image From URL" v-model:open="isModalInsertImage">
        <template #body>
          <div class="grid max-w-lg w-full gap-8 b b-gray/30 rounded-2 px-2 py-5 sm:p-6">

            <UFormField label="Image Source" name="image-source" required hint="Url or Base64">
              <UInput v-model="imageFormState.source" variant="outline" color="neutral" size="md"
                placeholder="https://imagesource.com/image.png" type="text" required />
            </UFormField>

            <UFormField label="Alternative Text" name="alternative-text" required>
              <UInput v-model="imageFormState.alt" variant="outline" color="neutral" size="md" required />
            </UFormField>

            <UFormField label="Image Title" name="image-title" required>
              <UInput v-model="imageFormState.title" variant="outline" color="neutral" size="md" required />
            </UFormField>

            <div class="text-center">
              <UButton type="button" @click="insertImageFromUrl()" label="Add Image"
                :ui="{ label: 'text-center w-full' }" size="md" color="vnwa" variant="solid" />
            </div>
          </div>
        </template>
      </UModal>

      <UModal title="Add Link" v-model:open="isModalInsertLink">
        <template #body>
          <div class="grid max-w-lg w-full gap-8 b b-gray/30 rounded-2 px-2 py-5 sm:p-6">

            <UFormField label="URL" required>
              <UInput v-model="linkState.url" placeholder="https://vinawebapp.com" type="text" required />
            </UFormField>
            <UFormField label="Target" required>
              <USelect v-model="linkState.target" :items="[
                { label: 'Mở trong tab mới (_blank)', value: '_blank' },
                { label: 'Mở trong cùng tab (_self)', value: '_self' },
                { label: 'Mở trong frame cha (_parent)', value: '_parent' },
                { label: 'Mở trong top-level window (_top)', value: '_top' }
              ]" option-attribute="label" value-attribute="value" class="w-full" placeholder="Chọn target" />
            </UFormField>

            <div class="text-center">
              <UButton type="button" @click="insertLink()" label="Add Image" :ui="{ label: 'text-center w-full' }"
                size="md" color="vnwa" variant="solid" />
            </div>
          </div>
        </template>
      </UModal>

      <div v-if="editor" class="p-2  flex  items-center justify-start flex-wrap   divide-x ">
        <div class="flex items-center justify-center gap-2 px-2 py-1 ">
          <UTooltip text="Font Bold">
            <UButton variant="outline" @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              :color="editor.isActive('bold') ? 'vnwa' : 'neutral'" icon="fa6-solid:bold" size="xs" />
          </UTooltip>
          <UTooltip text="Font Italic">
            <UButton variant="outline" @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()" color="neutral"
              :color="editor.isActive('italic') ? 'vnwa' : 'neutral'" icon="fa6-solid:italic" size="xs" />
          </UTooltip>
          <UTooltip text="Font Strike">
            <UButton variant="outline" @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :color="editor.isActive('strike') ? 'vnwa' : 'neutral'" icon="fa6-solid:strikethrough" size="xs" />
          </UTooltip>


        </div>
        <div class="flex items-center justify-center gap-2 px-2 py-1 ">
          <UButton variant="outline" @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()" color="neutral"
            :class="{ 'text-purple-500': editor.isActive('code') }" icon="fa6-solid:code" size="xs" />
        </div>

        <div class="flex items-center justify-center gap-2 px-2 py-1">
          <div class="flex items-center gap-2">
            <UTooltip text="H1 - Tiêu đề lớn nhất">
              <UButton icon="material-symbols:format-h1" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 1 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" />
            </UTooltip>
            <UTooltip text="H2 - Mục lớn">
              <UButton icon="material-symbols:format-h2" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 2 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" />
            </UTooltip>
            <UTooltip text="H3 - Mục phụ">
              <UButton icon="material-symbols:format-h3" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 3 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" />
            </UTooltip>
            <UTooltip text="H4 - Mục nhỏ hơn">
              <UButton icon="material-symbols:format-h4" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 4 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" />
            </UTooltip>
            <UTooltip text="H5 - Mục nhỏ hơn nữa">
              <UButton icon="material-symbols:format-h5" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 5 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" />
            </UTooltip>
            <UTooltip text="H6 - Mục nhỏ nhất">
              <UButton icon="material-symbols:format-h6" size="xs" variant="outline"
                :color="editor.isActive('heading', { level: 6 }) ? 'vnwa' : 'neutral'"
                @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" />
            </UTooltip>
          </div>

        </div>
        <div class="flex items-center justify-center gap-2 px-2 py-1">
          <UTooltip text="Căn trái văn bản">
            <UButton icon="i-lucide-align-left" variant="outline" size="xs"
              :color="editor.isActive({ textAlign: 'left' }) ? 'vnwa' : 'neutral'"
              @click="editor.chain().focus().setTextAlign('left').run()" />
          </UTooltip>

          <UTooltip text="Căn giữa văn bản">
            <UButton icon="i-lucide-align-center" variant="outline" size="xs"
              :color="editor.isActive({ textAlign: 'center' }) ? 'vnwa' : 'neutral'"
              @click="editor.chain().focus().setTextAlign('center').run()" />
          </UTooltip>

          <UTooltip text="Căn phải văn bản">
            <UButton icon="i-lucide-align-right" variant="outline" size="xs"
              :color="editor.isActive({ textAlign: 'right' }) ? 'vnwa' : 'neutral'"
              @click="editor.chain().focus().setTextAlign('right').run()" />
          </UTooltip>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 px-2 py-1">
          <div>
            <input class='w-5' type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
              :value="editor.getAttributes('textStyle').color">
          </div>

          <UButton v-for="(item, index) in colors" :key="index" variant="solid"  size="xs"
            :color="editor.isActive('textStyle', { color: item.value }) ? 'vnwa' : 'secondary'"
            @click="editor.chain().focus().setColor(item.value).run()">
            <div class="w-3 h-3 rounded " :style="{ backgroundColor: item.value }" />
          </UButton>


          <UTooltip text="Xóa màu ">
            <UButton icon="material-symbols:invert-colors-off" @click="editor.chain().focus().unsetColor().run()"
              color="error" size="xs" />

          </UTooltip>


        </div>

        <div class="flex items-center justify-center gap-2 px-2 py-1">
          <UTooltip text="Toggle bullet list" placement="top">
            <UButton icon="i-heroicons-list-bullet" :color="editor.isActive('bulletList') ? 'vnwa' : 'neutral'"
              variant="outline" size="xs" @click="editor.chain().focus().toggleBulletList().run()" />
          </UTooltip>

          <UTooltip text="Toggle ordered list" placement="top">
            <UButton icon="heroicons:numbered-list-16-solid"
              :color="editor.isActive('orderedList') ? 'vnwa' : 'neutral'" variant="outline" size="xs"
              @click="editor.chain().focus().toggleOrderedList().run()" />
          </UTooltip>
        </div>
        <div class="flex items-center justify-center gap-2 px-2 py-1">
          <UTooltip text="Add New Link">
            <UButton @click="() => isModalInsertLink = !isModalInsertLink" color="info" icon="heroicons:link"
              size="xs" />
          </UTooltip>
        </div>
        <div class="flex items-center justify-center gap-2 px-2 py-1 ">

          <UTooltip text="Add Image From URL">
            <UButton @click="() => isModalInsertImage = !isModalInsertImage" color="vnwa"
              icon="fluent:image-add-20-regular" size="xs" />
          </UTooltip>

          <UTooltip text="Add Image From VMedia Manager">
            <UButton @click="addImages(editor)" color="vnwa" icon="material-symbols:folder-managed" label="VMedia"
              size="xs" />
          </UTooltip>
        </div>



      </div>
      <div class="px-3 py-4">
        <TiptapEditorContent  class="editor"  :editor="editor" />

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
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'

const { $storage } = useNuxtApp()
const editorContent = defineModel('modelValue');
const colors = [
  { label: 'Purple', value: '#958DF1' },
  { label: 'Red', value: '#F98181' },
  { label: 'Orange', value: '#FBBC88' },
  { label: 'Yellow', value: '#FAF594' },
  { label: 'Blue', value: '#70CFF8' },
  { label: 'Teal', value: '#94FADB' },
  { label: 'Green', value: '#B9F18D' },
]
const editor = useEditor({
  content: editorContent.value,
  extensions: [TiptapStarterKit, VueComponent, Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'max-w-full',
    },
  }),
    Link.configure({
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        title: 'Vnwa Link',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Color,
    TextStyle,
    ImageResize
  ],
  // editable: false,

  onUpdate({ editor }) {
    editorContent.value = editor.getHTML();
  },
});
watch(() => editorContent.value, (newContent) => {
  // if (!!unref(editor)) {
  //   unref(editor).commands.setContent(newContent);
  // }



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
const imageFormState = reactive({
  source: '',
  alt: '',
  title: '',
})
const linkState = reactive({
  url: '',
  target: '_blank'
});
const isModalInsertLink = ref(false)
const isModalInsertImage = ref(false)
const insertImageFromUrl = () => {
  console.log(imageFormState)
  if (!imageFormState.source && !imageFormState.alt) return
  editor.value?.chain().focus().setImage({ src: imageFormState.source, alt: imageFormState.alt, title: imageFormState.title }).run()

  imageFormState.alt = ''
  imageFormState.source = ''
  imageFormState.title = ''
  isModalInsertImage.value = false
}

const insertLink = () => {
  if (!linkState.url) return
  editor.value
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: linkState.url, target: linkState.target, class: 'vnwa-editor-link underline text-primary-500' })
    .run()
  linkState.url = ''
  isModalInsertLink.value = false
}




</script>
<style></style>