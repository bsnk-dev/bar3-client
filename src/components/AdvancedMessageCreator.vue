<template>
  <div>
    <v-subheader>
      Your HTML
    </v-subheader>
    <prism-editor
      class="editor height-300"
      v-model="html"
      @input="debouncedDigest()"
      :highlight="highlighterHTML"
      line-numbers
    ></prism-editor>

    <v-subheader>
      Your CSS
    </v-subheader>
    <prism-editor
      class="editor height-300"
      v-model="css"
      @input="debouncedDigest()"
      :highlight="highlighterCSS"
      line-numbers
    ></prism-editor>

    <v-subheader>
      Preview
    </v-subheader>
    <div>
      <preview-message :htmlPreview="digested" class="preview"/>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop, Watch } from 'vue-property-decorator';
  import PreviewMessage from '@/components/PreviewMessage.vue';
  import { PrismEditor } from "vue-prism-editor";
  import "vue-prism-editor/dist/prismeditor.min.css";

  import { highlight, languages } from "prismjs/components/prism-core";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-css";
  import "prismjs/components/prism-markup";
  import "prismjs/components/prism-xml-doc";
  import "prismjs/themes/prism-tomorrow.css";
  import juice from 'juice';
  import { debounce } from 'debounce';

  @Component({
    components: {
      PreviewMessage,
      PrismEditor
    }
  })
  export default class AdvancedMessageCreator extends Vue {
    html = '<div></div>';
    css = '';
    digested = '';
    
    @Prop(String) inputHTML!: string;
    @Prop(String) inputCSS!: string;

    mounted() {
      this.html = this.inputHTML;
      this.css = this.inputCSS;
    }

    @Watch('inputHTML')
    onInputHTMLChanged(value: string) {
      this.html = value;
    }

    @Watch('inputCSS')
    onInputCSSChanged(value: string) {
      this.css = value;
    }

    highlighterHTML(code: string) {
      return highlight(code, languages.html); //returns html
    }

    highlighterCSS(code: string) {
      return highlight(code, languages.css); //returns html
    }

    digest() {
      const digested = juice(this.html, {
        extraCss: this.css.replace(/\n/g, ''),
        preserveMediaQueries: false,
        preserveFontFaces: false,
        preserveKeyFrames: false
      });

      this.digested = digested;
      this.$emit('change', digested);
    }

    debouncedDigest: Function = debounce(this.digest, 500);
  }
</script>
<style scoped>
  .preview {
    border-radius: 5px;
    padding: 10px;
    min-height: 200px;
    width: 100%;
    font-family: "Roboto",Arial;
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