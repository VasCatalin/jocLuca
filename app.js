// resize START
const container = document.querySelector('.container-box');
document.addEventListener('DOMContentLoaded', function () {
  function adjustZoom() {
    var zoomCountOne = window.innerWidth / 1920;
    var zoomCountTwo = window.innerHeight / 1080;

    if (zoomCountOne < zoomCountTwo) {
      container.style.zoom = zoomCountOne;
    } else {
      container.style.zoom = zoomCountTwo;
    }
  }
  adjustZoom();
  window.addEventListener('resize', adjustZoom);
});
// resize END

const app = Vue.createApp({
  data() {
    return {
      color: '',
      count: 0,

      number: null,

      numberNeeded: this.generateRandomNumber().number,
      colorNeeded: this.generateRandomNumber().color,

      intervalId: null,

      colors: ['red', 'green', 'blue', 'yellow', 'magenta', 'purple', 'orange'],
    };
  },

  methods: {
    generateRandomNumber() {
      const colors = [
        'red',
        'green',
        'blue',
        'yellow',
        'magenta',
        'purple',
        'orange',
      ];
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return { number: randomNumber, color: randomColor };
    },

    getNumber(i) {
      this.number = i;
      console.log(this.number, this.numberNeeded, this.color, this.colorNeeded);
    },
    getColor(color) {
      this.color = color;
    },

    runConfetti() {
      this.generateRandomNumber();
      clearInterval(this.intervalId); // Resetăm intervalul
      this.intervalId = setInterval(() => {
        if (
          this.colorNeeded === this.color &&
          this.numberNeeded === this.number
        ) {
          confetti();
          this.count++;
          if (this.count === 3) {
            clearInterval(this.intervalId);
            this.number = null;
            this.color = 'black';
            this.numberNeeded = this.generateRandomNumber().number;
            this.colorNeeded = this.generateRandomNumber().color;
            this.count = 0;
          }
        }
      }, 200);
    },
  },

  created() {
    this.intervalId = this.runConfetti();
  },
});

app.mount('#app');
