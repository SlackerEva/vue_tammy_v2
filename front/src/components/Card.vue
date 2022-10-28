<template>
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
    <a :href="eyeShadow.link" target="_blank">
      <img :src="eyeShadow.imgPath" :alt="eyeShadow.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
    </a>
  </div>
  <div class="flex place-content-between p-3">
    <h3 class="text-base font-bold text-black-900 content-center truncate">{{ eyeShadow.name }}</h3>
  </div>
</template>
<script>
export default {
  name: "card_box",
  props: {
    eyeShadow: Object
  },
  setup() {
  }
}

</script>