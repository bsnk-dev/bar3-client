<template>
  <div>
    <div id="toolbar">
    </div>
    
    <div id="editor" class="editor" ref="editor">
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop, Watch } from 'vue-property-decorator';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  import juice from 'juice';
  import quillStyles from '!!raw-loader!quill/dist/quill.snow.css';
  import { debounce } from 'debounce';
  
  @Component
  export default class MessageCreator extends Vue {
    messageQuill = '';
    editor: Quill | undefined;
    toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [ 'link', 'image', 'video', 'formula' ],          // add's image support

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    @Prop(String) inputHTML!: string;

    @Watch('inputHTML')
    onInputHTMLChanged(value: string) {
      this.messageQuill = value;
      this.editor?.setText(this.messageQuill);
    }

    beforeDestroy() {
      this.editor?.disable();
      this.digestQuill((this.$refs.editor as Element).children[0].innerHTML);
    }

    mounted() {
      this.editor = new Quill('#editor', {
        modules: { toolbar: this.toolbarOptions },
        theme: 'snow'
      });

      this.editor.on('text-change', debounce(() => {
        this.digestQuill((this.$refs.editor as Element).children[0].innerHTML);
      }, 1000));
    }

    digestQuill(html: string) {
      const digested = juice(html, {
        extraCss: quillStyles,
        preserveMediaQueries: false,
        preserveFontFaces: false,
        preserveKeyFrames: false
      });

      this.$emit('change', digested);
    }
  }
</script>

<style scoped>
  .editor {
    min-height: 30vh;
    color: black;
  }
</style>