// Adapted from the course engine's INTROWEB m1a1 Vitest/jsdom checks.
// See NOTICE for source attribution and license information.
import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { JSDOM } from "jsdom"

const src = new URL("../src/", import.meta.url)
const html = existsSync(new URL("index.html", src)) ? readFileSync(new URL("index.html", src), "utf8") : ""
const page = new JSDOM(html).window.document
const identity = JSON.parse(readFileSync(new URL("../student.json", import.meta.url), "utf8"))
const meta = (name) => page.querySelector(`head meta[name="${name}"]`)?.getAttribute("content")?.trim() ?? ""
const sheet = () => [...page.querySelectorAll("head link[rel~=stylesheet]")].map((l) => l.getAttribute("href") ?? "")
const comments = () => {
  const w = page.createTreeWalker(page, 128); let n = 0
  while (w.nextNode()) n++
  return n
}

const skeleton = () => {
  it("declares the HTML5 doctype, English and UTF-8", () => {
    expect(page.doctype?.name.toLowerCase(), "Start with <!DOCTYPE html>.").toBe("html")
    expect(page.documentElement.getAttribute("lang"), "Set lang=\"en\".").toBe("en")
    expect(page.querySelector("head meta[charset]")?.getAttribute("charset")?.toLowerCase()).toBe("utf-8")
  })
  it("has a viewport meta element and a meta description", () => {
    expect(meta("viewport"), "Add the viewport meta element.").toMatch(/width=device-width/)
    expect(meta("description").length, "Write a meta description.").toBeGreaterThan(10)
  })
}
const DATETIME = /^(\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?|\d{2}:\d{2}(:\d{2}(\.\d+)?)?|\d{4}-\d{2}|P.+)$/

describe("M3A2: Sip Trail Drink Profile", () => {
  skeleton()
  it("has a title and one h1", () => {
    expect(page.title.trim().length, "Name the drink in the title.").toBeGreaterThan(3)
    expect(page.querySelectorAll("h1").length, "Use exactly one h1.").toBe(1)
  })
  it("shows a captioned image in a figure", () => {
    const fig = page.querySelector("figure")
    expect(fig?.querySelector("img")?.getAttribute("alt")?.trim().length ?? 0, "Put an img with alt text inside a figure.").toBeGreaterThan(5)
    expect(fig?.querySelector("figcaption")?.textContent.trim().length ?? 0, "Caption the image with figcaption.").toBeGreaterThan(3)
    const file = fig?.querySelector("img")?.getAttribute("src") ?? ""
    expect(/^https?:/.test(file) || (file !== "" && existsSync(new URL(file, src))), `Put the photo in src/images/ and point src at it (found "${file}").`).toBe(true)
  })
  it("gives the drink's details in a description list", () => {
    const dl = page.querySelector("dl")
    expect(dl?.querySelectorAll("dt").length ?? 0, "Use a dl with at least four dt terms.").toBeGreaterThanOrEqual(4)
    expect(dl?.querySelectorAll("dd").length ?? 0, "Give every term a dd.").toBeGreaterThanOrEqual(4)
  })
  it("nests a list inside a list item", () => {
    expect(page.querySelector("li ul, li ol"), "Put a list inside a list item.").not.toBeNull()
  })
  it("quotes a source with cite", () => {
    const q = page.querySelector("blockquote[cite]")
    expect(q?.getAttribute("cite") ?? "", "Give the blockquote a cite URL.").toMatch(/^https?:\/\//)
    expect(page.querySelector("cite")?.textContent.trim().length ?? 0, "Name the source in a cite element.").toBeGreaterThan(2)
  })
  it("writes the price with the peso sign reference", () => {
    expect(html, "Write the peso sign as a character reference, not a typed ₱.").toMatch(/&#8369;|&#x20b1;|&#x20B1;|&peso;/)
  })
})

describe("Student identity in your private copy", () => {
  it("contains the required details as non-empty text", () => {
    for (const field of ["fullName", "studentNumber", "studentEmail", "classCode", "githubAccount", "room", "pcNumber"]) {
      expect(typeof identity[field], `Keep ${field} as text.`).toBe("string")
      expect(identity[field]?.trim(), `Fill in ${field} in student.json.`).toBeTruthy()
    }
  })

  it("uses class code 2006", () => {
    expect(identity.classCode).toBe("2006")
  })
})
