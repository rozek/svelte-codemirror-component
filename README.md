# svelte-codemirror #

a CodeMirror component for Svelte

This module implements a simple Svelte component with a configurable [CodeMirror 5](https://codemirror.net/) instance. It is based on a [simpilar component which is part of the Svelte REPL](https://github.com/sveltejs/svelte-repl/blob/master/src/CodeMirror.svelte) and a [Svelte REPL example](https://svelte.dev/repl/a199ca2d451e4b0b92a8abd2d0e71ec6).

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-codemirror/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Installation ##

```
npm install svelte-codemirror
```

## Usage ##

`svelte-codemirror` should be imported in a module context and may then be used in your markup:

```
<script context="module">
  import CodeMirror from 'svelte-codemirror'
</script>

<CodeMirror/>
```

> Warning: as I have not yet been able to bundle [JSHint](https://jshint.com/), [JSONLint](https://github.com/zaach/jsonlint) and [CSSLint](https://github.com/CSSLint/csslint), you will have to import them yourself if you plan to use syntax checking for JavaScript, JSON or CSS files:

```
<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jshint/2.13.4/jshint.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsonlint/1.6.0/jsonlint.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/csslint/1.0.5/csslint.min.js"></script>
</svelte:head>

<script context="module">
  import CodeMirror from 'svelte-codemirror'
</script>

<CodeMirror Mode='js'/>
```

If you are sensitive to the GDPR (or similar regulations) you should probably first copy the mentioned JavaScript files to your local server and reference them from there.

## Options and Bindings ##

The CodeMirror component already defines a few simple options itself - in addition to an `Options` attribute which may be used to pass any options directly to the CodeMirror instance.

The available Bindings are

* **`Editor`**<br>
* **`Value`**<br>

The predefined options are

* **`Mode`**<br>
* **`LintOptions`**<br>
* **`withLineNumbers`**<br>
* **`withLineWrapping`**<br>
* **`Indentation`**<br>
* **`TabSize`**<br>
* **`indentWithTabs`**<br>
* **`closeBrackets`**<br>
* **`closeTags`**<br>

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
  import CodeMirror from './CodeMirror.svelte'
</script>

<CodeMirror class="my" style="width:480px; height:300px; border:solid 1px gray"
  Value='console.log("Hello, World!")' Mode='js'></CodeMirror>
```

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/svelte-codemirror/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
