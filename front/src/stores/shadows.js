import { defineStore } from 'pinia';
import shadows from '@/api/shadowsApi.js';
import userShadows from '@/api/userShadowApi.js';

const ENTITIES_ON_PAGE = 30;

export const useShadowsStore = defineStore('shadows', {
  state: () => ({
    isOpen: false,
    shadows: [],
    alreadyLoaded: 0,
    toLoad: 0,
    userShadows:[],
    searchStr: '',
    mainFilter: 'all',
    typeFilter: ['rare', 'powder', 'palette', 'coin'],
  }),
  getters: {
    getPage() {
      return this.toLoad / ENTITIES_ON_PAGE;
    },
    getShadowById: (state) => {
      return (shadowId) => state.userShadows.indexOf(shadowId) === -1 ? false : true;
    }
  },
  actions: {
    setSideBarOpen() {
      this.isOpen = !this.isOpen;
    },
    setPage(page) {
    //  console.log("Set page: " + page);
      this.toLoad = page * ENTITIES_ON_PAGE;
      if (this.toLoad < this.alreadyLoaded) {
        this.shadows.splice(this.toLoad, this.alreadyLoaded - this.toLoad);
      //  console.log("Updated shadows: " + this.shadows);
        this.alreadyLoaded = this.toLoad;
      }
      this.getShadows();
    },
    setSearchStr(searchStr) {
    //  console.log("Set search str: " + searchStr);
      this.searchStr = searchStr;
      this.setPage(0);
      this.setPage(1);
    },
    setFilters(mainF, typeF) {
      this.mainFilter = mainF;
      this.typeFilter = typeF;
    },
    getShadows() {
      if (this.alreadyLoaded < this.toLoad) {
      //  console.log("Get shadows: (" + this.searchStr + ", " + this.alreadyLoaded + "," + this.toLoad + ")");
        shadows.getShadows(this.alreadyLoaded, this.toLoad, this.searchStr, this.mainFilter, this.typeFilter, this.userShadows)
          .then((res) => {
          //  console.log("Backend result: " + res);
            this.shadows.push(...res)
          });
          this.alreadyLoaded = this.toLoad;
      }
    },
    getUserShadows() {
      userShadows.getUserShadows()
        .then((res) => {
          const shadowArr = res.map((obj) => {
            return obj.shadow;
          })
          this.userShadows.push(...shadowArr);
        });
    },
    addNewUserShadow(shadowId) {
      this.userShadows.push(shadowId)
    },
    removeUserShadow(shadowId) {
      this.userShadows = this.userShadows.filter((item) => {
        return item !== shadowId;
      });
    }
  },
})