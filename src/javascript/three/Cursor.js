export class Cursor {
  constructor() {
    this.cursorPosition = { x: 0, y: 0 }

    this.getCursorContainer()
    this.getPositionOfCursor()
  }

  getCursorContainer() {
    this.cursor = document.querySelector(".cursor")
  }

  getPositionOfCursor() {
    window.addEventListener("mousemove", (ev) => {
      this.cursorPosition.x = ev.clientX
      this.cursorPosition.y = ev.clientY

      this.cursor.style.left = `${
        this.cursorPosition.x - this.cursor.offsetWidth / 2
      }px`
      this.cursor.style.top = `${
        this.cursorPosition.y - this.cursor.offsetHeight / 2
      }px`
    })
  }
}
