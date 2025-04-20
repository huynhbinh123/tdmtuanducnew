<template>
  <div>

    <VnwaCard :isLoading="status !== 'success'">
      <div id="media-panel">
        <div
          class="flex flex-wrap items-center justify-between gap-4 mb-5 border border-black/10 dark:border-white/10 bg-gray-100 dark:bg-gray-800  text-gray-500 dark:text-white p-2 rounded">
          <div>
            <VnwaMediaBreadcrumb :path="basePath" @navigateTo="(p) => basePath = p" />
          </div>
          <div class=" flex items-center gap-5 justify-end">
            <UPopover class="notOutSide">
              <UButton :disabled="keySelected.length <= 0" color="vnwa" :label="$t('vnwa.vmedia.selected_action')"
                icon="i-fa6-solid:hand-pointer" />

              <template #content>
                <ul class="min-w-40  text-black dark:text-white">
                  <li>
                    <button
                      class="flex items-center justify-start gap-2 px-2 py-1 text-xs hover:bg-purple-500 hover:text-white w-full">
                      <UIcon name="heroicons:eye-16-solid" class="w-4 h-4" />
                      <span>
                        {{ $t('vnwa.vmedia.preview') }}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="flex items-center justify-start gap-2 px-2 py-1 text-xs hover:bg-purple-500 hover:text-white w-full">
                      <UIcon name="material-symbols:crop" class="w-4 h-4" />
                      <span>
                        {{ $t('vnwa.vmedia.crop') }}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="flex items-center justify-start gap-2 px-2 py-1 text-xs hover:bg-purple-500 hover:text-white w-full">
                      <UIcon name="heroicons:pencil-square-16-solid" class="w-4 h-4" />
                      <span>
                        {{ $t('vnwa.vmedia.rename') }}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button @click="handleRemoveMedia"
                      class="flex items-center justify-start gap-2 px-2 py-1 text-xs hover:bg-purple-500 hover:text-white w-full">
                      <UIcon name="heroicons:trash" class="w-4 h-4" />
                      <span>
                        {{ $t('vnwa.vmedia.move_to_trash') }}
                      </span>
                    </button>
                  </li>
                </ul>
              </template>
            </UPopover>

            <UTooltip @click="openCreateFolderModal" :text="$t('vnwa.vmedia.create_folder')" :popper="{ arrow: true }">
              <UButton icon="i-fa6-solid:folder-plus" color="warning" variant="outline" />
            </UTooltip>


            <VnwaMediaInputUploadFile :onSuccess="refresh" :basePath="basePath" />

            <UTooltip text="Refresh" :loading="status !== 'success'" :popper="{ arrow: true }">
              <UButton @click="refresh()" icon="fa6-solid:arrows-rotate" color="primary" variant="outline" />
            </UTooltip>
            <UTooltip text="Toggle Detail Media" :popper="{ arrow: true }" class="notOutSide">
              <UButton @click="() => { isMediaDetail = !isMediaDetail }"
                icon="material-symbols:align-horizontal-right-rounded" color="neutral" variant="outline" />
            </UTooltip>
          </div>
        </div>
        <div class="flex items-center justify-start gap-4 overflow-hidden">

          <div class="media-panel-content w-full">

            <ul class="grid grid-cols-10 gap-4">
              <li v-for="(item, index) in data?.data" :key="index" class="notOutSide">
                <div @click="oneClick(index, item, $event)" @dblclick="view(item)" :class="[
                  'py-3 border-2 px-1 text-black dark:text-white transition-all rounded-md relative', // Lớp cố định
                  {
                    'bg-black/10 dark:bg-gray-100/10 border-blue-300': keySelected.includes(index), // Điều kiện
                    'border-black/10 dark:border-white/10 hover:border-blue-300 dark:hover:bg-gray-100/10': !keySelected.includes(index) // Mặc định
                  }
                ]">
                  <UContextMenu :items="contextMenuActions" :popper="{ offset: 0 }">
                    <div class=" cursor-pointer">

                      <div class="item-avatar flex items-center justify-center relative h-20 overflow-hidden">

                        <div class="absolute top-0 right-0" v-show="keySelected.includes(index)">
                          <UIcon name="fa6-solid:circle-check" class="text-blue-400 w-6 h-6" />
                        </div>
                        <!-- Hiển thị icon nếu không phải là ảnh -->
                        <div v-if="item.type != 'image'">
                          <UIcon v-if="item.type === 'dir'" name="i-fa6-solid:folder" class="w-20 h-20 text-blue-500" />
                          <UIcon v-else-if="item.type === 'document'" name="fa6-solid:file-lines"
                            class="w-20 h-20 text-green-500" />
                          <UIcon v-else-if="item.type === 'video'" name="i-fa6-solid:film"
                            class="w-20 h-20 text-yellow-500" />
                          <UIcon v-else name="i-fa6-solid:file-circle-question" class="w-20 h-20 text-gray-500" />
                        </div>

                        <!-- Hiển thị ảnh nếu là ảnh -->
                        <div v-else>
                          <img :src="$storage(item.path)" :alt="item.name" width="50"
                            class="max-w-full max-h-full w-auto h-auto" />

                        </div>
                      </div>

                      <!-- Tên tệp tin/thư mục -->
                      <div class="px-2 line-clamp-1 text-xs mt-2 text-center ">
                        {{ item.name }}
                      </div>
                    </div>
                    <template #view>
                      <UButton @click="view(item)" icon="i-lucide-eye" color="neutral" variant="ghost"  size="sm" class="w-full  ">
                        {{$t('vnwa.vmedia.view')}}
                      </Ubutton>
                    </template>
                    <template #rename>
                      <UButton @click="handleRenameMedia(item)" icon="i-lucide-pen" color="neutral" size="sm"  variant="ghost"
                        class="w-full ">
                        {{$t('vnwa.vmedia.rename')}}
                      </Ubutton>
                    </template>
                    <template #delete>
                      <UButton @click="handleRemoveOneMedia(item)" icon="i-lucide-trash" color="error" size="sm"  variant="subtle"
                        class="w-full ">
                        {{$t('vnwa.vmedia.delete')}}
                      </Ubutton>
                    </template>
                  </UContextMenu>



                </div>






              </li>
            </ul>
          </div>
          <div class="media-panel-content w-[250px] h-full notOutSide" v-show="isMediaDetail">
            <UCard class="min-h-full">
              <template #header>
                <div>
                  <div class="flex items-center justify-center relative ">

                    <UIcon v-if="mediaDetail?.type === 'dir'" name="i-fa6-solid:folder"
                      class="w-20 h-20 text-blue-500" />
                    <UIcon v-else-if="mediaDetail?.type === 'document'" name="fa6-solid:file-lines"
                      class="w-20 h-20 text-green-500" />
                    <UIcon v-else-if="mediaDetail?.type === 'video'" name="i-fa6-solid:film"
                      class="w-20 h-20 text-yellow-500" />
                    <div v-else-if="mediaDetail?.type === 'image'">
                      <img :src="$storage(mediaDetail?.path)" :alt="mediaDetail?.name" width="50"
                        class="max-w-full max-h-full w-auto h-auto" />

                    </div>
                    <UIcon v-else name="i-fa6-solid:file-circle-question" class="w-20 h-20 text-gray-500" />

                    <!-- Hiển thị ảnh nếu là ảnh -->

                  </div>
                </div>
              </template>
              <div>
                <ul v-if="mediaDetail.name" class="text-gray-700 dark:text-gray-300">
                  <li class="mb-3">
                    <label class="font-semibold text-base">Name</label>
                    <h5 class="text-xs break-words">{{ mediaDetail.name }}</h5>
                  </li>
                  <li class="mb-3" v-if="mediaDetail.type === 'image'">
                    <label class="font-semibold text-base">Full Url</label>
                    <VnwaInputCopy :text="$storage(mediaDetail.path)" />
                  </li>
                  <li class="mb-3" v-if="mediaDetail.size">
                    <label class="font-semibold text-base">Size</label>
                    <h5 class="text-xs">{{ mediaDetail.size }} KB</h5>
                  </li>
                </ul>
              </div>

            </UCard>
          </div>
        </div>

      </div>
    </VnwaCard>
  </div>
</template>

<script lang="ts" setup>
import { VnwaMediaModalCreateFolder, VnwaMediaModalDeleteSelected, VnwaMediaModalRename } from '#components'
type MediaDetail = {
  name?: string;
  type?: string;
  size?: string;
  path?: string;
};
const props = defineProps({
  isSelect: {
    type: Boolean,
    default: false
  }
})
const contextMenuActions = [
  {
    slot: 'view'

  },
  {
    slot: 'rename'

  },
  {
    slot: 'delete'
  }
]
const emit = defineEmits(['onMediaSelected'])

const { $storage } = useNuxtApp();
const overlay = useOverlay()
const isMediaDetail = useCookie('mediaIsDetailPanel', { default: () => false });

const mediaDetail = ref<MediaDetail>({});
const keySelected = ref([]);
const basePath = useCookie('mediaBasePath');

basePath.value = String(basePath.value) ? String(basePath.value) : "";


const { data, refresh, status } = useHttp<any>("vnwa/media/load-data", {
  query: {
    basePath: basePath,
  },
  async onResponse() {
    keySelected.value = [];

  }
});
const emitSelectedToParent = () => {
  if (props.isSelect) {
    if (keySelected.value.length > 0) {
      const dataSelected = keySelected.value
        .map((key) => {
          const file = data.value?.data?.[key]; // Kiểm tra an toàn khi truy cập
          if (file?.type === 'image') { // Đảm bảo file không undefined
            return { name: file.name, type: file.type, path: file.path };
          }
          return null; // Loại bỏ phần tử không hợp lệ
        })
        .filter(Boolean); // Loại bỏ giá trị null/undefined

      if (dataSelected.length > 0) {
        emit('onMediaSelected', dataSelected);
      }
    }
  }
};


const oneClick = (key: any, item: any, event: { ctrlKey: any; }) => {
  mediaDetail.value = item;

  if (event.ctrlKey) {
    if (keySelected.value.includes(key)) {
      // Nếu key đã tồn tại trong keySelected, loại bỏ nó
      keySelected.value = keySelected.value.filter((k) => k !== key);
    } else {
      // Nếu key chưa tồn tại trong keySelected, thêm vào
      keySelected.value.push(key);
    }
  } else {
    keySelected.value = [];
    keySelected.value.push(key);
  }
  emitSelectedToParent();

};
const view = (item: { type: string; path: string; }) => {
  if (item.type && item.type == "dir") {
    basePath.value = item.path;
    keySelected.value = [];
    mediaDetail.value = {
      name: '',
      type: '',
      size: '',
      path: '',
    };

  } else {
    window.open($storage(item.path), "_blank");

  };


};
const modal1 = overlay.create(VnwaMediaModalCreateFolder)


const openCreateFolderModal = () => {
  modal1.open({
    path: basePath.value,
    onSuccess() {
      refresh();
      modal1.close()
    }
  })
}
const modal2 = overlay.create(VnwaMediaModalDeleteSelected)

const handleRemoveOneMedia = (item: { name: any; type: any; path: any; }) => {
  modal2.open({
    items: [item],
    onSuccess() {
      refresh(); // Làm mới dữ liệu sau khi xóa thành công
      modal2.close(); // Đóng modal
    },
  });
}

const handleRemoveMedia = () => {
  if (keySelected.value.length > 0) {
    const dataSelected = keySelected.value.map((key) => {
      const file = data.value.data[key]; // Truy cập `data.value` nếu `data` là ref
      return { name: file.name, type: file.type, path: file.path };
    });

    // Mở modal sau khi chuẩn bị dữ liệu
    modal2.open({
      items: dataSelected,
      onSuccess() {
        refresh(); // Làm mới dữ liệu sau khi xóa thành công
        modal2.close(); // Đóng modal
      },
    });
  } else {
    // Hiển thị thông báo nếu không có mục nào được chọn
    useToast().add({
      icon: "i-heroicons-exclamation-circle-solid",
      title: "Please select at least one item.",
      color: "error",
    });
  }
};


const modalRename = overlay.create(VnwaMediaModalRename);
const handleRenameMedia = (item: { name: any; type: any; path: any; }) => {
  modalRename.open({
    path: basePath.value,
    item: item,
    onSuccess() {
      refresh(); // Làm mới dữ liệu sau khi xóa thành công
      modalRename.close(); // Đóng modal
    },
  });
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const isClickInside = target.closest('.notOutSide'); // `.item` là class của các item
  if (!isClickInside) {
    keySelected.value = [];
    mediaDetail.value = {};
    emit('onMediaSelected', []);


  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "a" && event.ctrlKey) {
    event.preventDefault();

    // Kiểm tra xem có dữ liệu không
    if (data.value?.data) {
      keySelected.value = Object.keys(data.value.data).map(Number); // Chuyển key thành số
    } else {
      keySelected.value = [];
    }

    emitSelectedToParent();
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);

});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);

});
</script>

<style>
#media-panel .media-panel-content {
  height: calc(100vh - 20rem);
  min-height: 100%;
  overflow-y: auto;
}

#media-panel .media-panel-content::-webkit-scrollbar {
  width: 10px;
}

/* Track */
#media-panel .media-panel-content::-webkit-scrollbar-track {
  background: #e7e5e7;
}

/* Handle */
#media-panel .media-panel-content::-webkit-scrollbar-thumb {
  background: #a537c7;
  border-radius: 8px;
}

/* Handle on hover */
#media-panel .media-panel-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>