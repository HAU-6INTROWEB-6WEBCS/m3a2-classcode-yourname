# M3A2: Sip Trail: Drink Profile

**Kind:** take-home practice. Do it on your own time before the next meeting. Searching, AI and helping each other are allowed, because this is practice; record what you used in `SOURCES-AND-ASSISTANCE.md`. The lab exam is closed book, so make sure you understand every line you submit.

**Sip Trail** now profiles one signature drink. A recipe tells you which lists to use; a drink profile does not, so you decide which element fits each kind of information.

## Before you start

Start the activity with the shared-lab launcher, exactly as in M1A0: follow the [setup guide](SETUP.md) to run the Mac launcher in Terminal or the Windows launcher in PowerShell, then clone your private repository `m3a2-CLASSCODE-USERNAME` in VS Code. Check the branch, remote and author before you start. Then install the test tools once:

```sh
npm ci
```

## What to build

A profile of one signature drink from a Pampanga café, milk tea shop or matcha bar, in `src/index.html`:

- the full skeleton and head, with a title and a meta description that name the drink;
- one `h1` with the drink's name;
- a photo of the drink in `src/images/`, with alt text and a caption that stay together;
- at least **four details** about the drink (for example the shop, the base, the sweetness and the price), each a term with its value;
- a list of the drink's variants or add-ons in which at least one item has its own list inside it;
- a quote about the drink, a review or the shop's own description, that names and links its source;
- the price written with the peso sign, as a character reference.

Real drinks are welcome. Visiting the shop is not required.

## Concepts to research

- When `<dl>`, `<dt>` and `<dd>` are better than a bulleted list.
- How `figure` and `figcaption` attach a caption to an image.
- How `cite` (the attribute) and `<cite>` (the element) differ.
- The character reference for the peso sign.

## How it is graded

6 test points for structure: skeleton and head, the captioned figure, the description list, the nested list, the quote with its source, and the peso reference. 4 rubric points for choosing the right element for each part.

Every activity also checks `student.json`: fill in your full name, student number, school email, class code **2006**, GitHub username, `room` and `pcNumber`, all as text.

## Check and save your work

Open your page in the browser and look at it in the developer tools' device toolbar at phone size. Then run the checks:

```sh
npm test
```

The tests in your repository are a guide. The instructor grades from the course's own copy of the tests, so do not edit the tests to make them pass. In VS Code, open **Source Control**, commit your files with a short message, choose **Push**, and check that the commit appears on GitHub.

## Submit the exact commit link in Canvas

Open your repository's commit history on GitHub, open the commit with your finished work, copy its full URL (it contains **/commit/**), and submit it in the Canvas assignment for M3A2 using the Website URL option. Submit the commit page, not the repository home page or a screenshot.
