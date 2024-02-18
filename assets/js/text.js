async function init() {
  const node = document.querySelector("#type-text")

  await sleep(1000)
  node.innerText = ""
  await node.type('')

  const words = [' creatives.', ' designers.', ' optimists.', ' nice.', ' agency.']
  let currentIndex = 0;

  while (true) {
      const currentWord = words[currentIndex];
      const nextWord = words[(currentIndex + 1) % words.length];

      await node.fadeIn(currentWord);
      await sleep(2000);
      await node.fadeOut(currentWord);
      await node.type(nextWord);
      currentIndex = (currentIndex + 1) % words.length;
  }
}

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
  get typeInterval() {
      const randomMs = 100 * Math.random()
      return randomMs < 50 ? 10 : randomMs
  }

  async type(text) {
      for (let character of text) {
          this.innerText += character
          await sleep(this.typeInterval)
      }
  }

  async delete(text) {
      for (let character of text) {
          this.innerText = this.innerText.slice(0, this.innerText.length - 1)
          await sleep(this.typeInterval)
      }
  }

  async fadeIn(text) {
      this.style.opacity = '0';
      this.innerText = text;
      await sleep(50);
      this.style.transition = 'opacity 0.5s, top 0.5s';
      this.style.opacity = '1';
      this.style.top = '0px';
      await sleep(500);
  }

  async fadeOut(text) {
      this.style.transition = 'opacity 0.5s, top 0.5s';
      this.style.opacity = '0';
      this.style.top = '-30px';
      await sleep(500);
  }
}

customElements.define('type-async', TypeAsync, { extends: 'span' })

init()
