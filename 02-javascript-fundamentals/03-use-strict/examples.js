// Part 1: The concepts
// 1. Why strict mode exists

// For its first ~15 years, JavaScript never removed or changed anything, so old websites would never break. The downside was that every early design mistake (silently creating globals, silently ignoring failed assignments, and so on) stayed in the language permanently.

// In 2009, ES5 fixed many of these mistakes. But changing the default behavior would have broken millions of existing sites, so the fixes are opt-in through the directive "use strict". Code without it is informally called “sloppy mode.”

// 2. How to enable it
// js
// "use strict";   // or 'use strict' — both work

// // everything below runs in strict mode

// Rules to remember:

// It must be at the very top of a script or function. Only comments (and technically other directive strings) may come before it. Anywhere else, it’s just an ordinary unused string, ignored without any error.
// Function-level: putting it as the first line inside a function makes only that function strict.
// There’s no way to turn it off. There’s no "no use strict".
// It must be written exactly. 'use\x20strict' (with an escape) doesn’t count.
// 3. The browser console isn’t strict

// DevTools runs code in sloppy mode by default. To test strict behavior, put 'use strict'; on the first line (use Shift+Enter for new lines), or wrap your code in an IIFE:

// js
// (function () {
//   'use strict';
//   // your code
// })();
// 4. Modern code is often strict automatically

// You don’t need to write the directive in:

// ES modules: any file using import or export, or loaded with <script type="module">.
// Class bodies: all code inside class { ... }.

// In practice, a React, Vue, or Angular codebase written with import/export is already strict everywhere.

// Exceptions to watch for: Node.js CommonJS files (using require) are not strict unless you add the directive or switch to ESM (.mjs or "type": "module" in package.json). TypeScript’s alwaysStrict option (enabled by strict: true) adds "use strict" to the compiled output for you.

// 5. What strict mode actually changes (not in this chapter, but frequently asked)
// Behavior	Sloppy mode	Strict mode
// Assigning to an undeclared variable (x = 5)	Silently creates a global	ReferenceError
// this in a plain function call	window / globalThis	undefined
// Assigning to a read-only property (frozen object, getter-only, NaN = 1)	Silently fails	TypeError
// delete on a non-deletable property	Returns false	TypeError
// Duplicate parameter names function f(a, a)	Allowed	SyntaxError
// Legacy octal literals 010	Means 8	SyntaxError (use 0o10)
// with statement	Allowed	SyntaxError
// eval declaring variables	Leak into the surrounding scope	Stay inside the eval
// arguments and parameters	Linked (changing one changes the other)	Independent
// Future reserved words (let, static, public, private, interface, ...) as variable names	Allowed	SyntaxError

// The common theme: silent failures become loud errors, and ambiguous features are removed. That’s why strict mode is a good thing.