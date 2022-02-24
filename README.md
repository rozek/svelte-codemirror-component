# svelte-codemirror-component #

a CodeMirror component for Svelte

This module implements a simple Svelte component with a configurable [CodeMirror 5](https://codemirror.net/) instance. It is based on a [simpilar component which is part of the Svelte REPL](https://github.com/sveltejs/svelte-repl/blob/master/src/CodeMirror.svelte) and a [Svelte REPL example](https://svelte.dev/repl/a199ca2d451e4b0b92a8abd2d0e71ec6).

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-codemirror/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Installation ##

```
npm install svelte-codemirror-component
```

## Usage ##

`svelte-codemirror-component` should be imported in a module context and may then be used in your markup:

```
<script context="module">
  import CodeMirror from 'svelte-codemirror-component'
</script>

<CodeMirror/>
```

> **Warning**: as I have not yet been able to bundle [JSHint](https://jshint.com/), [JSONLint](https://github.com/zaach/jsonlint) and [CSSLint](https://github.com/CSSLint/csslint), you will have to import them yourself if you plan to use syntax checking for JavaScript, JSON or CSS files:

```
<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jshint/2.13.4/jshint.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsonlint/1.6.0/jsonlint.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/csslint/1.0.5/csslint.min.js"></script>
</svelte:head>

<script context="module">
  import CodeMirror from 'svelte-codemirror-component'
</script>

<CodeMirror Mode='js'/>
```

If you are sensitive to the GDPR (or similar regulations) you should probably first copy the mentioned JavaScript files to your local server and reference them from there.

## Bindings ##

`svelte-codemirror-component` offers two bindings which give you direct access to the underlying CodeMirror instance and the current value of the edited text:

* **`Editor`**<br>allows to address the CodeMirror instance directly (which might be useful if you plan to react on CodeMirror events)
* **`Value`**<br>"reactively" binds to the currently edited text

```
<script context="module">
  import CodeMirror from 'svelte-codemirror-component'
</script>

<script >
  let Editor, Value = 'initial Value'
  
  $: console.log('new Value',Value)
</script>

<CodeMirror bind:Editor={Editor} bind:Value={Value}/>
```

## Options and Bindings ##

The CodeMirror component already defines a few simple options itself - in addition to an `Options` attribute which may be used to pass any (other) options directly to the CodeMirror instance. Options will only be considered during component instantiation - later changes will be ignored.

* **`Mode`**<br>specifies the language mode CodeMirror is working in. You may specify either `js` (for JavaScript), `svelte`, `json`, `html`, `css` or `yaml` - by default, `Mode` is set to `js`
* **`LintOptions`**<br>by default, texts edited in mode `js`, `json`, `html` or `css` are "linted", i.e., any syntactic errors are indicated as such in the "gutter" area to the left of the incorrect line. You may alternatively specify an object with specific options for the chosen linter - or simply disable linting by setting it to `false`
* **`withLineNumbers`**<br>set this option to `true` (which is also the default) in order to show line numbers in the "gutter area" to the left of the edited text - or to `false` otherwise
* **`withLineWrapping`**<br>set this option to `true` in order to let long lines be wrapped - or to `false` otherwise (`false` is the default)
* **`Indentation`**<br>specifies the number of characters a new line should be indented automatically after the beginning of a new JavaScript or JSON block or list (i.e., after `{` or `[`) or a new HTML tag (i.e., after `<`). By default, it is set to `2`
* **`TabSize`**<br>specifies the number of characters a horizontal tab should proceed (by default, the tab size is set to 2)
* **`indentWithTabs`**<br>set this to `true` if you want tabs to be preserved - or `false` if you prefer spaces instead of tabs (by default, this option is set to `false`, i.e., spaces are preferred)
* **`closeBrackets`**<br>set this to `true` if you want CodeMirror to automatically insert a closing brace for you whenever you enter an opening one - or `false` otherwise (by default, no closing bracket is inserted)
* **`closeTags`**<br>set this to `true` if you want CodeMirror to automatically insert a closing `>` for you whenever you enter a `<` in HTML mode - or `false` otherwise (by default, opened tags are not automatically closed)

## Events ##

Right now, only one type of CodeMirror event is passed through to the user of a CodeMirror component:

* **`change`**<br>this event is fired whenever the edited text changes. You may catch it like any other Svelte event:<br>`<CodeMirror on:change={your-event-handler}></CodeMirror>`

## Styling ##

The visual appearance of CodeMirror components may be adjusted by specifying styles for the CSS classes which have been assigned to the various parts of a CodeMirror instance. You should, however, take care to use rather specific CSS selectors in order to override thje internal default. In the easiest case, you may just assign your own CSS class to a CodeMirror component and mention that in your stylesheet:

```
<style>
  :global(.my .CodeMirror) {
    height:100%; /* to overwrite internal default settings */
    background:white;
    font-family:Courier,"Lucida Console",Monaco,monospace;
    font-size:14px; font-weight:normal;
    color:black;
  }
</style>

<script context="module" lang="ts">
  import CodeMirror from 'svelte-codemirror-component'
</script>

<CodeMirror class="my" style="width:480px; height:300px; border:solid 1px gray"
  Value='console.log("Hello, World!")' Mode='js'></CodeMirror>
```

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/svelte-codemirror-component/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
