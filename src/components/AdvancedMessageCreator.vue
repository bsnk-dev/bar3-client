<template>
  <div>
    <v-subheader>
      Your HTML
    </v-subheader>
    <prism-editor
      class="editor height-300"
      v-model="html"
      :highlight="highlighterHTML"
      line-numbers
    ></prism-editor>

    <v-subheader>
      Your CSS
    </v-subheader>
    <prism-editor
      class="editor height-300"
      v-model="css"
      :highlight="highlighterCSS"
      line-numbers
    ></prism-editor>

    <v-subheader>
      Your Result
    </v-subheader>
    <div class="ml-4 preview">
      <preview-message :htmlPreview="html"/>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from "vue-class-component";
  import PreviewMessage from '@/components/PreviewMessage.vue';
  import { PrismEditor } from "vue-prism-editor";
  import "vue-prism-editor/dist/prismeditor.min.css";

  import { highlight, languages } from "prismjs/components/prism-core";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-css";
  import "prismjs/components/prism-markup";
  import "prismjs/components/prism-xml-doc";
  import "prismjs/themes/prism-tomorrow.css";

  @Component({
    components: {
      PreviewMessage,
      PrismEditor
    }
  })
  export default class Preview extends Vue {
    html = '<div></div>';
    css = '';

    mounted() {
      console.log(languages);
    }

    highlighterHTML(code: string) {
      return highlight(code, languages.html); //returns html
    }

    highlighterCSS(code: string) {
      return highlight(code, languages.css); //returns html
    }
  }
</script>
<style scoped>
  .preview {
    border: 2px solid black;
    height: 100%;
    width: 300px;
  }

  .editor {
    background: #2d2d2d;
    color: #ccc;

    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    width: 100%;
    border-radius: 5px;
    height: 300px;
    line-height: 1.5;
    padding: 5px;
  }
</style>

<style>
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>