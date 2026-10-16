# JavaScript Interview Notes — Lesson 1: Hello, World!

## 1. JavaScript Fundamentals

**1. What is JavaScript?**

JavaScript is a programming language used to build interactive web applications and other software.

**2. What is the difference between JavaScript and HTML?**

HTML defines webpage structure; JavaScript adds logic and interactivity.

**3. What is the difference between JavaScript and Node.js?**

JavaScript is a language; Node.js is a runtime that executes JavaScript outside the browser.

**4. What is a JavaScript runtime environment?**

An environment that executes JavaScript and provides APIs and services.

**5. Where can JavaScript execute?**

In browsers, Node.js, and other compatible JavaScript runtimes.

**6. What is a JavaScript engine?**

Software that parses and executes JavaScript, such as Google's V8.

**7. What happens when a browser encounters JavaScript in HTML?**

The browser processes the script according to its loading mode and executes it.

## 2. The HTML `<script>` Tag

**8. What is the purpose of the `<script>` tag?**

It embeds JavaScript in HTML or loads an external JavaScript file.

**9. How can you include JavaScript in HTML?**

Using inline code inside `<script>` or an external file using `src`.

**10. What is inline vs external JavaScript?**

Inline code is written in HTML; external code is stored in a separate `.js` file.

**11. How do you include an external JavaScript file?**

```html
<script src="./app.js"></script>
```

**12. What is the purpose of `src`?**

It specifies the URL of an external script.

**13. What happens when `src` and inline code are used together?**

The inline content inside that script element is ignored.

**14. Can HTML contain multiple script elements?**

Yes, a document can contain multiple script elements.

**15. In what order do classic scripts execute?**

Normally in document order, subject to loading attributes such as `async` and `defer`.

**16. What happens when a classic script is encountered during HTML parsing?**

The browser normally pauses parsing, executes the script, and then continues.

**17. What is the difference between a script element and a JavaScript file?**

The script element is HTML markup; the JavaScript file contains the code.

## 3. Script Attributes and Modern HTML

**18. Is `type="text/javascript"` required?**

No. JavaScript is the default for classic scripts in modern HTML.

**19. Is the `language` attribute required?**

No. The old `language` attribute is obsolete and unnecessary.

**20. What is `type="module"`?**

It tells the browser to treat the script as an ES module.

**21. Classic script vs module?**

Modules support `import` and `export` and have module scope and strict mode by default.

**22. What is the difference between `src` and `type`?**

`src` specifies the script location; `type` specifies the script's type or mode.

**23. What is the difference between `async` and `defer`?**

Both allow external scripts to download without blocking HTML parsing. `async` executes when ready; `defer` executes after parsing, in document order.

**24. When should you use `defer`?**

For classic external scripts that should execute after HTML parsing, preserving document order.

**25. Why does script loading strategy matter?**

It affects execution order, HTML parsing, page responsiveness, and performance.

## 4. Inline vs External JavaScript

**26. What are the advantages of external JavaScript?**

Better organization, maintainability, reuse, and browser caching.

**27. Why separate HTML and JavaScript?**

It separates structure from behaviour, making code easier to maintain.

**28. Can an external JavaScript file be reused across pages?**

Yes. Multiple pages can reference the same script file.

**29. What is browser caching?**

The browser stores reusable resources to reduce repeated network downloads.

**30. What are the disadvantages of inline JavaScript?**

Large amounts of inline code make HTML harder to maintain and reuse.

**31. How would you organize JavaScript in a large project?**

Use logical modules and files organised by feature or responsibility.

**32. When is inline JavaScript appropriate?**

For small demonstrations or limited cases where inline code is justified.

**33. What is wrong with this code?**

```html
<script src="./app.js">
  console.log("Hello");
</script>
```

The inline message is ignored because `src` is present.

**34. How do you fix it using an external file?**

Put `console.log("Hello")` inside `app.js` and keep the script element.

**35. How do you fix it using inline JavaScript?**

Remove `src` and place the JavaScript inside the script element.

## 5. Browser vs Node.js

**36. What is the difference between browser JavaScript and Node.js?**

They execute JavaScript in different environments and provide different APIs.

**37. What is the DOM?**

The Document Object Model represents an HTML document as objects that JavaScript can access and modify.

**38. Why can browser JavaScript access `window` and `document`?**

The browser provides these APIs.

**39. Why is `document` unavailable in standard Node.js?**

Node.js does not provide a webpage DOM by default.

**40. Why does `alert()` work in a browser but not standard Node.js?**

`alert()` is a browser API, not a built-in Node.js global.

**41. Does `console.log()` work in both environments?**

Yes, it is available in browsers and Node.js.

**42. How do you execute a JavaScript file with Node.js?**

```bash
node app.js
```

**43. What is a browser API?**

A feature exposed by the browser, such as the DOM, `alert()`, or `fetch()`.

**44. Does JavaScript itself provide every browser API?**

No. Browser APIs are provided by the host environment.

**45. What happens if you use an unsupported browser API?**

It may produce an error, such as a `ReferenceError` when the identifier is unavailable.

## 6. Code Execution and Debugging

**46. What happens when a browser loads HTML containing a script?**

It parses HTML and processes the script according to its loading and execution rules.

**47. Does a classic inline script execute when encountered?**

Normally, yes, when the browser reaches it during HTML parsing.

**48. HTML parsing vs JavaScript execution?**

HTML parsing builds the document structure; JavaScript execution runs program instructions.

**49. How can you see JavaScript output in a browser?**

Open Developer Tools and inspect the Console.

**50. How do you open Developer Tools?**

Usually press `F12` or `Ctrl + Shift + I` on Linux/Windows browsers.

**51. `console.log()` vs `alert()`?**

`console.log()` writes to the Console; `alert()` displays a blocking dialog.

**52. Why can `alert()` interrupt interaction?**

It is synchronous and requires the dialog to be dismissed before normal interaction resumes.

**53. How do you debug an external script that does not run?**

Check the Console, Network tab, file path, HTTP status, and JavaScript errors.

**54. What if the browser cannot find a JavaScript file?**

Check the URL, relative path, filename, server response, and case sensitivity.

**55. Syntax error vs runtime error?**

A syntax error prevents code from being parsed correctly; a runtime error occurs while code executes.

## 7. Practical Coding Questions

**56. Write HTML that displays an alert.**

```html
<script>
  alert("Hello, world!");
</script>
```

**57. How do you move the alert into an external file?**

```html
<script src="./alert.js"></script>
```

In `alert.js`:

```javascript
alert("Hello, world!");
```

**58. Print your name using JavaScript.**

```javascript
console.log("Oliver");
```

**59. Print a message in the browser Console.**

```html
<script>
  console.log("Hello from the browser");
</script>
```

**60. How do you include two external scripts?**

```html
<script src="./first.js"></script>
<script src="./second.js"></script>
```

**61. What is the output order of two ordinary classic scripts?**

Normally, the first script executes before the second.

**62. What is wrong with `src` plus inline code?**

The inline code inside that same script element is ignored.

**63. Why won't `alert()` work in standard Node.js?**

Node.js does not provide the browser's `alert()` API by default.

**64. How do you identify HTML and JavaScript in a document?**

HTML uses markup elements; JavaScript contains executable statements inside script elements or external files.

**65. How would you debug an external script that fails to load?**

Inspect the browser Console and Network tab, then verify the script URL and server response.

## 8. Senior Frontend Engineer Questions

**66. Why separate application logic from HTML?**

It improves maintainability, readability, reuse, and testing.

**67. How does script loading affect performance?**

Blocking scripts can delay HTML parsing; appropriate loading strategies reduce that impact.

**68. Classic scripts vs modules: what are the trade-offs?**

Modules provide imports, exports, and module scope; classic scripts support traditional global-script patterns.

**69. Why might JavaScript work locally but fail in production?**

Possible causes include incorrect paths, deployment issues, caching, environment differences, or runtime errors.

**70. How does browser caching affect JavaScript delivery?**

Cached resources can avoid repeat downloads, improving subsequent page loads.

**71. Why should frontend engineers understand runtime environments?**

APIs, execution behaviour, debugging tools, and supported features vary by environment.

**72. What are the risks of using browser APIs in shared code?**

Code may fail in Node.js, server-side rendering, or other environments where those APIs are unavailable.

**73. Language feature vs host API: what is the difference?**

A language feature belongs to JavaScript itself; a host API is provided by the runtime environment.

**74. What should you consider when loading third-party scripts?**

Security, privacy, performance, reliability, permissions, and the effect on page rendering.

**75. How would you structure scripts for a large multi-page application?**

Use modular, feature-oriented code, shared dependencies, appropriate loading strategies, and a build system where suitable.

## 9. Self-Assessment Checklist

- [x] I can explain what JavaScript is and where it runs.
- [x] I can write inline JavaScript.
- [x] I can load an external JavaScript file.
- [x] I understand `src`, `type`, and `type="module"`.
- [x] I understand why inline content is ignored when `src` is present.
- [x] I can explain browser JavaScript vs Node.js.
- [x] I can use `console.log()` and browser Developer Tools.
- [x] I can debug basic script-loading issues.
- [x] I can explain the key concepts without memorising the answers.
- [x] I can answer the senior-level discussion questions with practical examples.

**Goal:** Build a clear understanding of how JavaScript enters and executes in a webpage. Revisit advanced loading questions when studying `async`, `defer`, and modules.
