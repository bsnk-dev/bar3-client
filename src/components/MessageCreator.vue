<template>
  <div>
    <link href="quill.snow.css" rel="stylesheet">
    
    <div id="toolbar">
    </div>
    
    <!-- Create the editor container -->
    <div id="editor" class="editor" ref="editor">
      <p>Hello World!</p>
    </div>

    <a @click="digestQuill()">Show code</a>
    
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from "vue-class-component";
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  import juice from 'juice';
  import quillStyles from '!!raw-loader!quill/dist/quill.snow.css';

  @Component
  export default class MessageCreator extends Vue {
    subjectLine = '';
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

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    beforeDestroy() {
      this.editor?.disable();
    }

    mounted() {
      this.editor = new Quill('#editor', {
        modules: { toolbar: this.toolbarOptions },
        theme: 'snow'
      });
    }

    digestQuill() {
      const digested = juice((this.$refs.editor as Element).children[0].innerHTML, {
        extraCss: `<style>${quillStyles}</style>`,
        preserveMediaQueries: false,
        preserveFontFaces: false,
        preserveKeyFrames: false
      });

      return digested;
    }
  }
</script>

<style scoped>
  .editor {
    min-height: 30vh;
  }
</style>