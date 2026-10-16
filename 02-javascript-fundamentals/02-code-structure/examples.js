// Part 1: The concepts
// 1. Statements

// A statement is one complete instruction that does something, like alert('Hello') or let x = 5. A program is basically a list of statements that run one after another. You can put several on one line separated by semicolons, but by convention each goes on its own line for readability.

// Statement vs expression. The chapter doesn’t cover this, but interviewers ask about it. An expression produces a value (2 + 3, user.name, fn()). A statement performs an action (if, for, let x = ..., return). Most expressions can also stand alone as an expression statement (fn();), but you can’t put a statement where a value is expected:

// js
// const a = if (x) { 1 };   // ❌ SyntaxError — `if` is a statement
// const b = x ? 1 : 2;      // ✅ ternary is an expression

// This is also why JSX allows {cond ? <A/> : <B/>} but not {if (cond) ...}.

// 2. Semicolons and Automatic Semicolon Insertion (ASI)

// JavaScript lets you skip semicolons in most cases because the parser inserts them for you at line breaks. That’s ASI. The catch is that it doesn’t simply put a semicolon at every newline. Roughly, the parser:

// Keeps reading across a newline if the next token can continue the current statement.
// Inserts a semicolon only if the next token can’t legally continue it.
// Always inserts a semicolon after certain keywords when a newline follows them. These are called restricted productions: return, throw, break, continue, yield, and postfix ++ / --.

// Rule 1 is why the chapter’s example breaks:

// js
// alert("Hello")
// [1, 2].forEach(alert)
// // Parsed as: alert("Hello")[1, 2].forEach(alert)  → error

// A [ can continue an expression (as property access), so no semicolon is inserted. The same danger exists when a line starts with (, `, +, -, or /.

// Rule 3 is the most famous bug:

// js
// function getConfig() {
//   return
//   {
//     debug: true
//   }
// }
// getConfig(); // undefined, not the object!

// A newline right after return always ends the statement, so the function returns undefined.

// Takeaway: use semicolons, or if your team prefers no-semicolon style, never start a line with (, [, or ` without a leading ;. In practice, let Prettier and ESLint enforce whichever style you choose.

// 3. Comments

// Comments are ignored by the engine. There are two kinds:

// js
// // single-line comment

// /* multi-line
//    comment */

// You can’t nest /* */ inside another /* */. The first */ closes the outer comment, and whatever follows becomes broken code.

// Comments cost nothing in production because minifiers (Terser, esbuild, SWC) strip them out during the build.

// Senior-level extras the chapter skips: in real projects, comments are often instructions to tools, not just notes for humans:

// Comment	Who reads it	Purpose
// /** @param {string} id */	TypeScript and IDEs	JSDoc type info in plain JS
// // @ts-check, // @ts-expect-error	TypeScript	Type-checking control
// // eslint-disable-next-line no-console	ESLint	Suppress one lint rule
// /* webpackChunkName: "admin" */	Webpack	Name a lazily loaded chunk
// /* @__PURE__ */	Terser and bundlers	Mark a call as side-effect free so it can be tree-shaken
// /*! ... */ or @license	Minifiers	Keep this comment (license text) in the output
// #!/usr/bin/env node	OS and shell	Hashbang for executable Node scripts (line 1 only)