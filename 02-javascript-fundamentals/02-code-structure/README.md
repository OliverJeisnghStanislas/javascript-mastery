JavaScript.info: Code Structure — Practice Problems & Answers

Problem 1: Expression continuing on the next line
js
const x = 10
-3
console.log(x)

Answer: 7

Why: No semicolon is inserted after 10, because -3 can continue the expression. The engine reads it as const x = 10 - 3.

Problem 2: Line starting with (
js
let a = 1
let b = a
(function () { console.log('IIFE ran') })()

Answer: TypeError: a is not a function

Why: ASI does not insert a semicolon before (, so the engine reads it as:

js
let b = a(function () { console.log('IIFE ran') })()

It tries to call 1 as a function. This is a TypeError (runtime), not a SyntaxError, because the code is grammatically valid.

Fix: Add a semicolon after let b = a;, or start the IIFE line with ;.

Problem 3: Postfix ++ across a newline
js
let i = 5
i
++
i
console.log(i)

Answer: 6

Why: Postfix ++ is a restricted production: a newline isn’t allowed between a variable and its postfix ++. So ASI inserts a semicolon after the first i, and ++ attaches to the next i as a prefix increment:

js
i;    // useless expression statement (this line does nothing)
++i;  // prefix increment → 6

⚠️ Common mistake: the last i is not ignored. The first i is the one that does nothing.

Problem 4: return followed by a newline
js
function getUser() {
  return
    { name: 'Asha', role: 'admin' }
}

Answer: undefined

Why: return is a restricted production. A newline right after it causes ASI to insert a semicolon, so the function becomes return;. The object below never runs.

Fix: Keep the opening { on the same line as return:

js
function getUser() {
  return { name: 'Asha', role: 'admin' };
}
console.log(getUser()); // { name: 'Asha', role: 'admin' }

This is one reason JS style guides put opening braces on the same line.

Problem 5: Line starting with a template literal
js
const user = 'Ravi'
const msg = 'Hello'
`${user}`.toUpperCase()

Answer: TypeError: "Hello" is not a function

Why: No semicolon is inserted before `. A value placed directly before a template literal is valid syntax, called a tagged template (like styled.div`...`). The engine reads:

js
const msg = 'Hello'`${user}`.toUpperCase()

It tries to call the string 'Hello' as a tag function.

⚠️ Common mistake: this is not a SyntaxError. The syntax is valid; it fails at runtime.

Problem 6: Nested multi-line comments
js
/*
function legacy() {
  /* old implementation */
  return 42;
}
*/

Answer: SyntaxError

Why: Multi-line comments can’t be nested. The first */ (after old implementation) closes the comment, so return 42; } */ is parsed as real code.

Fixes (best first):

Delete the dead code. Git keeps its history, and commented-out code is a code-review smell.
Select the block and press Ctrl+/ (Cmd+/ on Mac) to comment each line with //. Single-line comments nest safely.
Change the inner comment to // old implementation.
Problem 7: Write a function with JSDoc

Task: Write formatPrice(amount, currency) with a proper JSDoc comment (description, @param types, @returns) and one comment that explains why rather than what.

Model answer:

js
/**
 * Formats a numeric amount as a localized currency string.
 *
 * @param {number} amount - The amount to format, e.g. 1499.5
 * @param {string} currency - ISO 4217 currency code, e.g. "USD", "EUR"
 * @returns {string} The formatted price, e.g. "$1,499.50"
 */
function formatPrice(amount, currency) {
  // Using Intl instead of building the string by hand: it handles symbol
  // placement, separators and per-currency decimals (JPY has none).
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

console.log(formatPrice(1499.5, 'USD')); // "$1,499.50"
console.log(formatPrice(1499.5, 'JPY')); // "¥1,500"

Key points:

The JSDoc gives IDEs and TypeScript type information, even in plain JS.
The inline comment explains why Intl was chosen, not what the line does.
Call the function to test it: console.log(formatPrice(100, 'USD')), not console.log(100, $).
Quick reference: error types
Error	When it happens	Example
SyntaxError	At parse time, before any code runs	Nested /* */, a missing }
TypeError	At runtime, when the operation is invalid for that value	1(), 'Hello'()
ReferenceError	At runtime, when the variable doesn’t exist	Using an undefined $

Test: if there’s a SyntaxError, nothing in the file runs, not even earlier lines. With TypeErrors and ReferenceErrors, the earlier lines run first.

Quick reference: when ASI bites
No semicolon inserted before a line starting with (, [, `, +, -, or /. The line gets merged with the previous one.
Semicolon always inserted after return, throw, break, continue, or yield when a newline follows, and before postfix ++/-- on a new line.
Prevention: use semicolons consistently, enforce the style with Prettier, and enable ESLint’s no-unexpected-multiline rule.


At senior level, nobody asks “what is a comment?” They ask questions that test whether you understand the parser, your tooling, and how teams make decisions. Here are realistic ones with what a strong answer covers.

Q1. Explain Automatic Semicolon Insertion. When can it cause bugs?
A strong answer explains the three rules above, gives the return-newline and leading-[ / ( examples, and mentions ESLint’s no-unexpected-multiline rule, which catches exactly these cases.

Q2. Your team is debating semicolons vs no-semicolons. What’s your position, and how do you settle it?
They’re not testing for the “right” answer. They want to see that you’d keep it from becoming a long debate. Pick one, encode it in Prettier, enforce it in CI and pre-commit hooks, and move on. Both styles are safe if a formatter is involved.

Q3. Why do some old libraries start their files with a ;?
It’s defensive. When files were concatenated, a previous file missing its final semicolon followed by (function(){...})() would turn into a function call on the previous file’s last expression. The leading ; guards against that.

Q4. What’s the difference between a statement and an expression? Why does it matter in React?
Expressions produce values; statements perform actions. JSX {} only accepts expressions, which is why you use ternaries, &&, or .map() instead of if and for inside JSX.

Q5. Why does {} + [] give a different result in the console than const r = {} + []?
At the start of a statement, {} is parsed as an empty block, not an object literal, so the console evaluates +[] and gets 0. In an assignment, {} is an object, and the result is "[object Object]". This tests whether you understand parsing context.

Q6. How do comments affect bundle size and tree shaking?
Normal comments are stripped by minifiers. /*! */ and @license comments are preserved. /* @__PURE__ */ tells the bundler a call has no side effects, so unused results can be removed. This matters for library authors and for performance work.

Q7. What makes a good code comment? Give a bad example and a good one.
Bad comments restate the code (i++ // increment i). Good comments explain why: business rules, workarounds (// Safari 16 fires resize twice; debounce to avoid layout thrash), links to tickets, and non-obvious constraints. Bonus points if you mention that outdated comments are worse than no comments, and that types plus good naming reduce the need for them.

Q8. When would you use JSDoc instead of TypeScript?
In a JS codebase migrating gradually, in build-less projects, or in library code where you want type hints without a compile step. Mention // @ts-check plus JSDoc as a zero-build type-safety option.