// Concept 1: Writing JavaScript inside HTML: The <script> tag.
// It allows you to write JavaScript directly inside an HTML document. The browser executes the JavaScript when it processes the script.


// <!DOCTYPE html>
// <html>
//   <body>
//     <p>Before the script</p>

//     <script>
//       alert("Hello, world!");
//     </script>

//     <p>After the script</p>
//   </body>
// </html>

// Let's understand the important parts:
// - <!DOCTYPE html> tells the browser to use modern HTML standards mode.
// - <html> contains the document.
// - <body> contains the page's visible content.
// - <script> contains JavaScript code.
// - alert("Hello, world!") opens a browser dialog displaying the message.

// What happens when the browser loads this page?
// 1. Browser reads HTML
// 2. Browser reaches <script>
// 3. JavaScript executes
// 4. Browser continues reading HTML

// **The alert() dialog is synchronous, so the user must dismiss it before interacting with the page normally again.

// **Senior interview takeaway: JavaScript in a classic script can affect HTML parsing and page loading. Later, you'll learn how defer, async, and modules change script loading and execution.


// Concept 2: Inline JavaScript vs external JavaScript
// Approach A — Inline JavaScript
// Advantages
// - Simple for tiny demonstrations.
// - Easy to understand when starting out.
// Disadvantages
// - HTML becomes harder to maintain when scripts grow.
// - Reusing the same code across multiple pages becomes less convenient.

// Approach B — External JavaScript
// Keep HTML and JavaScript in separate files.

// index.html

// <!DOCTYPE html>
// <html>
//   <body>
//     <h1>My Profile</h1>

//     <script src="./script.js"></script>
//   </body>
// </html>

// script.js
// console.log("Oliver is learning JavaScript");
// console.log("I am practising for senior frontend interviews");

// Here, src tells the browser where to find the JavaScript file. The ./ means the file is in the current directory relative to the HTML document's URL.

// Why do senior developers prefer external files for most application code?
// - Better separation of concerns.
// - Easier maintenance, debugging and testing.
// - Shared scripts can be reused across pages.
// - Browsers can cache external scripts, potentially reducing repeat downloads.

// Important rule: src takes precedence over inline content

//<script src="./script.js">
  //console.log("Will this run?");
//</script>

// Concept 3: Do we need type and language?
// Older examples often contain:

// <script type="text/javascript">
//   console.log("Hello");
// </script>

// Modern HTML does not require type="text/javascript" for a classic JavaScript script. JavaScript is the default.
// This is sufficient:

// <script>
//   console.log("Hello");
// </script>


// Likewise, don't use the outdated language attribute:

// <script language="javascript">
//   console.log("Hello");
// </script>

// You may see type="module" in modern applications. That is different: it tells the browser to treat the script as a JavaScript module, which supports features such as import and export. You'll study modules in a later lesson

// Concept 4: Browser JavaScript vs Node.js

// Browser	Node.js
// Runs JavaScript in a webpage.	Runs JavaScript outside a browser.
// Provides browser APIs such as document, window and alert.	Provides APIs such as process and filesystem access.
// Can manipulate the webpage DOM.	Doesn't provide a webpage DOM by default.
// Commonly runs scripts loaded by HTML.	Can execute a file using node filename.js.

// For example, this works in both environments:
// console.log("Hello, Oliver!");


// In your terminal, save it as hello.js and run:
// node hello.js


// But this browser-specific code:
// alert("Hello!");


// won't work in a standard Node.js environment because alert is a browser API, not a built-in Node.js global.
// Remember: JavaScript is the language; the browser and Node.js are different environments that provide different APIs.

