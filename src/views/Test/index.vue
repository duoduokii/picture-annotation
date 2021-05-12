<template>
  <div class="test">
    <header></header>
    <div class="wrapper">
      <aside class="tools-left"></aside>
      <div class="content" id="content"></div>
      <aside class="tools-right"></aside>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import DataAnnotation from "../../../package/core/index";
import { AnnotationType } from "../../../package/core/DataAnnotation";
import LOGO from "@/assets/konva-test.jpg";
export default defineComponent({
  name: "Test",
  setup() {
    const DA = ref();
    onMounted(() => {
      DA.value = DataAnnotation.init("content", { type: AnnotationType.Image, url: LOGO });
    });
  },
});
</script>

<style scoped lang="scss">
.test {
  position: relative;
  // height: 100vh;
}
header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #333;
  z-index: 1;
}
.wrapper {
  display: flex;
  height: 100vh;
  padding-top: 80px;
  position: relative;
  box-sizing: border-box;
  .content {
    flex: 1;
  }
  aside {
    background: #333;
  }
  .tools-left {
    width: 60px;
  }
  .tools-right {
    width: 120px;
  }
}
</style>
