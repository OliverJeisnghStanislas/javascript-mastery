JavaScript.info: Strict Mode — Practice Problems & Answers
Problem 1: Assigning to an undeclared variable
js
'use strict';
counter = 10;
console.log(counter);

Answer:

Strict mode: ReferenceError: counter is not defined
Sloppy mode: logs 10, because counter silently becomes a global variable

Why: Strict mode turns accidental globals (often typos) into errors.

Problem 2: 'use strict' not at the top
js
console.log('start');
'use strict';
total = 5;
console.log(total);

Answer: Logs start, then 5.

Why: The directive only works at the very top of a script or function (only comments may come before it). Here it’s just an ignored string, so the code runs in sloppy mode and total becomes a global.

Problem 3: this in a plain function call
js
'use strict';
function show() {
  return this;
}
console.log(show());

Answer:

Strict mode: undefined
Sloppy mode (browser): the window object

Why: In sloppy mode, a plain function call gets the global object as this. Strict mode sets it to undefined, which prevents accidentally reading or writing globals through this.

Problem 4: Assigning to a frozen object
js
'use strict';
const config = Object.freeze({ env: 'prod' });
config.env = 'dev';
console.log(config.env);

Answer:

Strict mode: TypeError: Cannot assign to read only property 'env' of object
Sloppy mode: no error; the assignment silently fails and it logs 'prod'

Why: Strict mode turns silent failures into visible errors.

Bonus: const vs Object.freeze

js
const a = { env: 'prod' };
a.env = 'dev';   // ✅ allowed — const only blocks reassigning the variable
a = {};          // ❌ TypeError

const b = Object.freeze({ env: 'prod' });
b.env = 'dev';   // ❌ TypeError (strict) — the object itself is locked

Note: Object.freeze is shallow. Nested objects can still be changed unless they are frozen too.

Problem 5: Duplicate parameter names
js
'use strict';
function sum(a, a) {
  return a + a;
}

Answer: SyntaxError: Duplicate parameter name not allowed in this context

Why:

A file-level 'use strict' applies to every function inside the file.
Duplicate parameter names are banned in strict mode.
It fails at parse time, even though sum is never called, so no code in the file runs.

⚠️ Common mistake: thinking the directive outside the function doesn’t affect it. It does.

Problem 6: ASI with 'use strict'
js
'use strict'
[1, 2].forEach(n => console.log(n))

Answer: Strict mode is not enabled, and the code throws a TypeError: ... is not a function.

Why: No semicolon is inserted before [, so the engine reads:

js
'use strict'[1, 2].forEach(...)
// [1, 2] → comma operator → 2
// 'use strict'[2] → 'e'
// 'e'.forEach → undefined → TypeError

The string is no longer a standalone directive, so strict mode silently doesn’t apply.

Fix: 'use strict'; with a semicolon.

Problem 7: 'use strict' with default parameters
js
function greet(name = 'Guest') {
  'use strict';
  return 'Hi ' + name;
}

Answer: SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

Why: Since ES2016, functions with non-simple parameters (default values, rest ...args, or destructuring) can’t contain 'use strict'. Parameters are parsed before the engine sees the directive in the body, so it can’t apply strict rules to them in time.

Fix: Put 'use strict' at the top of the file, or use an ES module (strict automatically).

Problem 8: Code inside an ES module
html
<script type="module">
  console.log(this);
  x = 1;
</script>

Answer:

console.log(this) → logs undefined (no error)
x = 1 → ReferenceError: x is not defined

Why: ES modules are strict automatically. Module top-level this is undefined, and assigning to undeclared variables throws.

⚠️ Common mistake: reading this never throws; it just has a different value.

Quick reference: strict vs sloppy mode
Behavior	Sloppy mode	Strict mode
x = 5 (undeclared)	Creates a global	ReferenceError
this in a plain function call	window / globalThis	undefined
Assigning to a read-only property	Silently fails	TypeError
delete on a non-deletable property	Returns false	TypeError
Duplicate parameters f(a, a)	Allowed	SyntaxError
Legacy octal 010	Means 8	SyntaxError (use 0o10)
with statement	Allowed	SyntaxError
eval declaring variables	Leak into outer scope	Stay inside eval
arguments and parameters	Linked	Independent
Reserved words as variable names (let, static, private, ...)	Allowed	SyntaxError
Quick reference: where code is strict automatically
Context	Strict?
ES modules (import/export, <script type="module">)	✅ Yes
Code inside class { ... }	✅ Yes
TypeScript with strict / alwaysStrict	✅ Yes (directive added in output)
Plain <script> tags	❌ No
Node.js CommonJS (require)	❌ No (unless .mjs or "type": "module")
Browser DevTools console	❌ No
Key rules
'use strict' must be the first statement in a script or function. Only comments can come before it.
A file-level directive applies to all functions inside the file.
There’s no way to turn it off once enabled.
Always put a semicolon after it, or ASI can break it.
It can’t be used inside functions with default, rest, or destructured parameters.
React’s <StrictMode> is a different thing: it’s a React development tool, not the JS language feature.


Part 3: Interview questions (9+ years frontend level)

Q1. What is strict mode, and why was it introduced as opt-in rather than made the default?
It fixes ES3-era design flaws (silent globals, silent failures, with, eval scope leaks). It’s opt-in because JS has a “don’t break the web” rule: changing defaults would have broken existing sites.

Q2. Name concrete behavioral differences strict mode introduces.
Strong candidates name at least 4 or 5 from the table above, especially undeclared assignment, this being undefined, read-only assignments throwing, and duplicate parameters. Bonus: arguments no longer being linked to parameters.

Q3. Do you add "use strict" in your current codebase? Why or why not?
Usually not. ES modules and classes are strict automatically, and TypeScript’s alwaysStrict emits it for you. The real gap is legacy CommonJS in Node and plain <script> files without type="module". A senior answer shows you know where code isn’t strict, not just that modules are.

Q4. Why is this undefined at the top level of an ES module? Have you seen this cause bugs?
Modules are strict, and module top-level this is defined as undefined. A classic bug: old code (UMD wrappers, jQuery plugins) used top-level this to mean window, and it broke after being converted to ESM or processed by Babel. The fix is to use globalThis.

Q5. What can go wrong when you concatenate a strict script with a non-strict one?
If the strict file comes first, its file-level "use strict" can make the whole combined bundle strict, breaking sloppy code that relied on silent globals. If the strict file comes second, its directive is no longer at the top, so it’s silently ignored. This is why libraries used to put "use strict" inside an IIFE (function-level) rather than at the file level.

Q6. Why is "use strict" inside a function with default, rest, or destructured parameters a SyntaxError?
Since ES2016, functions with “non-simple” parameters can’t contain a strict directive, because the parameters are parsed before the engine reads the directive, and strict rules might have applied to them differently. The fix is to make the whole file or module strict.

Q7. Does strict mode help performance?
Modestly, and indirectly. Removing with, eval scope leaks, and the link between arguments and parameters makes scopes predictable, which helps engine optimizations. But don’t oversell it: the main benefits are correctness and catching bugs early.

Q8. Give a real-world case where strict mode turns a silent bug into a visible error.
Immer (used inside Redux Toolkit) freezes the state objects it produces. If a component accidentally mutates that state, strict-mode code (which all ES modules are) throws a TypeError instead of failing silently, so you find the bug immediately.

Q9 (trick question). Is React’s <StrictMode> the same thing as "use strict"?
No. They’re unrelated. "use strict" is a JavaScript language feature. React’s <StrictMode> is a development-only React tool that double-invokes renders and effects to expose impure code and side effects. Interviewers like this question because many candidates mix them up.