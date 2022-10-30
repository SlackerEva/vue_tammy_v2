<template>
  <div 
    class="overflow-hidden rounded-lg"
  >
    <a :href="eyeShadow.link" target="_blank">
      <img 
        :src="eyeShadow.imgPath" 
        :alt="eyeShadow.name" 
        class="group-hover:opacity-75" 
      />
    </a>
  </div>
  <div 
    class="flex place-content-between p-3"
  >
    <h3 
      class="font-bold text-black-900 truncate"
    >
      {{ eyeShadow.name }}
    </h3>
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