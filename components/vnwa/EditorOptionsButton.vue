<template>
    <UTooltip :text="tooltip" :popper="{ placement: 'bottom-start' }" :ui="{
        content: 'text-3 px-1 py-1'
    }">
        <UButton  aria-label="Vinawebapp Button"  :icon="icon" :class="classBinding" :disabled="disabledBinding" style="outline: none" size="sm"
            color="neutral" variant="ghost" square padded trailing />
    </UTooltip>
</template>

<script setup lang="ts">
defineProps({
    disabledBinding: Boolean,
    tooltip: String,
    icon: String,
    classBinding: Object,
})
</script>