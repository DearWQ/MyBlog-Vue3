<template>
  <div class="home-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside/>
        </div>
      </template>
      <template #default>
        <router-view/>
      </template>
    </Layout>
    <ToTop/>
  </div>
</template>

<script>
import Layout from "../../components/Layout/index.vue";
import ToTop from "../../components/ToTop/index.vue"
import SiteAside from "../../components/SiteAside/index.vue";

export default {
  name: 'home',
  components: {
    Layout,
    SiteAside,
    ToTop
  },
  setup() {
  }
}
</script>
<style lang="less">
@import "public/style/mixin";
.home-container {
  .self-fill(fixed);
}
.aside{
  width: 250px;
  height: 100%;
}
</style>
