<template>
  <div v-if='isOpen' 
    id="drawer-navigation" 
    class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80"
    tabindex="-1" 
    aria-labelledby="drawer-navigation-label"
  >
      <h5 class="text-base font-semibold uppercase text-gray-800">
        Фильтры
      </h5>
      <div class="py-4 overflow-y-auto">
        <div class="form-control space-y-2">
          <select 
            class="bg-gray-50 border border-gray-900 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5" 
            v-model="radioChk"
          >
            <option value="all">Показать всё</option>
            <option value="marked">Показать отмеченные</option>
            <option value="unmarked">Показать не отмеченные</option>
          </select>
          <div class="form-control space-y-2">
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-900 sm:flex">
              <li class="w-full border-b border-gray-900 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input 
                    id="powder" 
                    type="checkbox" 
                    value="powder"
                    v-model="chkbxChk"
                    class="w-4 h-4"
                  >
                  <label 
                    for="powder" 
                    class="py-3 ml-2 w-full text-base font-medium text-gray-900"
                  >
                    Рассыпчатые
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-900 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input 
                    id="rare" 
                    type="checkbox" 
                    value="rare"
                    v-model="chkbxChk"
                    class="w-4 h-4"
                  >
                  <label 
                    for="rare" 
                    class="py-3 ml-2 w-full text-base font-medium text-gray-900"
                  >
                    Лимитки
                  </label>
                </div>
              </li>
            </ul>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-900 sm:flex">
              <li class="w-full border-b border-gray-900 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input 
                    id="palette" 
                    type="checkbox" 
                    value="palette"
                    v-model="chkbxChk"
                    class="w-4 h-4"
                  >
                  <label 
                    for="palette" 
                    class="py-3 ml-2 w-full text-base font-medium text-gray-900"
                  >
                    Палетки
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div class="flex items-center pl-3">
                  <input 
                    id="coin" 
                    type="checkbox" 
                    value="coin"
                    v-model="chkbxChk"
                    class="w-4 h-4" 
                  >
                  <label 
                    for="coin" 
                    class="py-3 ml-2 w-full text-base font-medium text-gray-900"
                  >
                    Монетки
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <button 
            @click="onClick" 
            class="bg-teal-500 border rounded border-white w-full leading-none
            px-4 py-3 mt-4
            text-white text-base
            hover:border-transparent hover:text-teal-500 
            hover:bg-white hover:border-teal-500" 
          >
            Применить
          </button>
          <button 
            @click="onClickRandom" 
            class="bg-teal-500 border rounded border-white w-full leading-none
            px-4 py-3 mt-4
            text-white text-base
            hover:border-transparent hover:text-teal-500 
            hover:bg-white hover:border-teal-500" 
          >
            Показать рандомный цвет
          </button>
        </div>
     </div>
  </div>
  </template>
  <script>
    import { useShadowsStore } from "@/stores/shadows.js";
    import { storeToRefs } from 'pinia';
    import { ref } from "vue";
    export default {
      name: "side-bar",
      setup()  {
        const radioChk = ref('all');
        const chkbxChk = ref(['rare', 'powder', 'palette', 'coin']);
        const store = useShadowsStore();
        const { isOpen } = storeToRefs(store);
        
        const onClick = () => {
          store.setFilters(radioChk.value, chkbxChk.value);
          store.setSearchStr('');
        }

        const onClickRandom = () => {
          store.setFilters('random');
          store.setSearchStr('');
        }

        return {isOpen, onClick, radioChk, chkbxChk, onClickRandom}
      },
    }
  </script>