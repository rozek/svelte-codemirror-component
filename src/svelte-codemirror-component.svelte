<!------------------------------------------------------------------------------
--                        Svelte CodeMirror Component                         --
------------------------------------------------------------------------------->

<style>
  :global(.my .CodeMirror) {
    height:100%; /* to overwrite internal default settings */
  }
</style>

<script lang="ts">
  import 'codemirror/lib/codemirror.css'
  import CodeMirror from 'codemirror/lib/codemirror.js'

  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/handlebars/handlebars.js'
  import 'codemirror/mode/htmlmixed/htmlmixed.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/yaml/yaml.js'

  import 'codemirror/addon/edit/closebrackets.js'
  import 'codemirror/addon/edit/closetag.js'
  import 'codemirror/addon/edit/continuelist.js'
  import 'codemirror/addon/comment/comment.js'

  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/addon/lint/lint.js'
  import 'codemirror/addon/lint/javascript-lint.js'; //import 'jshint'   // Missing shims for Node.js built-ins
  import 'codemirror/addon/lint/json-lint.js';       //import 'jsonlint' // Missing shims for Node.js built-ins
  import 'codemirror/addon/lint/html-lint.js';       import 'htmlhint'
  import 'codemirror/addon/lint/css-lint.js';        // import 'csslint' // circular dependencies

  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/foldcode.js'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/xml-fold.js'
  import 'codemirror/addon/fold/indent-fold.js'
  import 'codemirror/addon/fold/markdown-fold.js'
  import 'codemirror/addon/fold/comment-fold.js'

  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let Editor = null      // provides direct access to CodeMirror instance
  export let Value  = ''                                      // may be bound to

  export let Options          = {}
  export let readonly         = false
  export let Mode             = 'js'
  export let LintOptions      = null
  export let withLineNumbers  = true
  export let withLineWrapping = false
  export let Indentation      = 2
  export let TabSize          = 2
  export let indentWithTabs   = false
  export let closeBrackets    = false
  export let closeTags        = false

  const ModeForSuffix = {             // maps file name suffixes to editor modes
    js:     { name:'javascript', json:false },
    json:   { name:'javascript', json:true },
    svelte: { name:'handlebars', base:'text/html' },
    html:   { name:'htmlmixed' },
    css:    { name:'css' },
    md:     { name:'markdown' },
    yaml:   { name:'yaml' }
  };

  let EditorElement

  onMount(() => {
    const actualOptions = Object.assign({
      lineNumbers: withLineNumbers,
      lineWrapping:withLineWrapping,

      indentWithTabs,
      indentUnit:Indentation,
      tabSize:TabSize,

      value:Value,
      readonly,
      mode:ModeForSuffix[Mode] || { name:'javascript', json:false },

      autoCloseBrackets:closeBrackets,
      autoCloseTags:closeTags,

      foldGutter:true,
      gutters: (
        withLineNumbers
        ? ['CodeMirror-linenumbers', 'CodeMirror-lint-markers', 'CodeMirror-foldgutter']
        : ['CodeMirror-lint-markers', 'CodeMirror-foldgutter']
      ),

      lint: (
        LintOptions == null
        ? (
          (Mode === 'js') || (Mode === 'svelte')
          ? { options:{ esversion:5 } }
          : true
        )
        : LintOptions
      ),

      extraKeys: Object.assign({
        'Enter': 'newlineAndIndentContinueMarkdownList',
      },(
        (Mode === 'js') || (Mode === 'svelte')
        ? { 'Ctrl-/':'toggleComment', 'Cmd-/': 'toggleComment' }
        : {}
      ))
    }, Options || {})

    createEditor(actualOptions)
  })

  function createEditor (Options) {
    if (Editor != null) { EditorElement.innerHTML = '' }

    Editor = CodeMirror(EditorElement,Options)
    Editor.on('change', (Event) => {
      Value = Editor.getValue()
      dispatch('change',Event)
    })
  }
</script>

<div bind:this={EditorElement} {...$$restProps}></div>
