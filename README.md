# svelte-codemirror #

a CodeMirror component for Svelte

This module implements a simple Svelte component with a configurable [CodeMirror 5](https://codemirror.net/) instance. It is based on a [simpilar component which is part of the Svelte REPL](https://github.com/sveltejs/svelte-repl/blob/master/src/CodeMirror.svelte) and a [Svelte REPL example](https://svelte.dev/repl/a199ca2d451e4b0b92a8abd2d0e71ec6)

## Usage ##

### Options ###

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
