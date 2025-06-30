<template>
    <div>
        <UContainer>
            <div class=" w-full mx-auto max-w-4xl text-center lg:py-10 py-3">
                <div class="text-center ">



                    <h1 class="text-vnwa-300 text-center font-black whitespace-pre-line mb-5">
                        {{ title }}
                    </h1>
                    <SubHeding>
                        {{ slogan }}


                    </SubHeding>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
defineProps(
    {
        title: {
            type: String,
            required: true
        },
        slogan: {
            type: String,
            default: ''
        }
    }
)

</script>

<style></style>