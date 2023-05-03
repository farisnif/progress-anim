import { LitElement, html, css } from 'lit';

import { IntersectionObserverMixin } from "@lrnwebcomponents/intersection-element/lib/IntersectionObserverMixin.js";

export class ProgressAnim extends IntersectionObserverMixin(LitElement) {
  static get properties() {
    let props = {};
    if (super.properties) {
      props = super.properties;
    }
    return {
      ...props,
      barTitle: {
        type: String,
        reflect: true
      },
      numberValue: {
        type: String,
        reflect: true
      },
      introTitle: {
        type: String,
        reflect: true
      },
      description: {
        type: String,
        reflect: true
      },
      timeLength: {
        type: Number,
        reflect: true
      },

      barWidth: {
        type: Number,
        reflect: true
      }
    }
  }

  static get styles() {
    return css`
      #progress {
      background: var(--progress-anim-bar-color, linear-gradient(to right,#d3c357,#f1a76a,#cc6d2e));
      height: var(--progress-anim-bar-height, 50px);
      border-radius: var(--progress-anim-bar-radius, 6px);
      direction: rtl;
      position: absolute;
      z-index: 5;
      transition: width 0.01s ease-in-out;
    }

    #timer {
      font-family: "Lucida Console", "Courier New", monospace;
      padding-right: 10px;
      margin-left: auto;
    }

    .surroundingBar {
      margin-top: 50px;
      padding: 4px;
      border: var(--progress-anim-surrounding-bar-border-color-font, 1px solid #c6c5c9);
      border-radius: 10px;
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }

    .progressArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
    }

    .barTitle {
    font-size: 16px;
    color: grey;
    position: absolute;
    right: calc(80%);
  }


    #greyBar {
      position: relative;
      width: 30%;
      height: 50px;
      background-color: var(--progress-anim-filler-background-color, #ccc);
      border-radius: 6px;
      z-index: 2
    }

    @media (max-width: 700px) {
    #progress {
      height: 20px;
      border-radius: var(--progress-anim-bar-radius, 2px);
      border-radius: 1px;
      z-index: 5;
    }

    .progressArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
    }

    #timer {
      font-size: 8px;
      padding-right: 2px;
    }   

    #greyBar {
      position: relative;
      width: 30%;
      height: 20px;
      background-color: var(--progress-anim-filler-background-color, #ccc);
      border-top-left-radius: 0;
      border-radius: 2px;
      z-index: 2;
    }

    .barTitle {
    font-size: 12px;
    color: grey;
    position: absolute;
    right: calc(80%);
  }
    `;
  }


  constructor() {
    super();
    this.barTitle = "Rspack";
    this.timeLength = 5.79;
    this.maxTime = 60;
    this.barWidth = 0.075;
  }

  progressAnim(timeLength, barWidth, maxTime) {
    var progressBar = this.shadowRoot.querySelector("#progress");
    var timer = this.shadowRoot.querySelector("#timer");
    var greyBar = this.shadowRoot.querySelector("#greyBar");

    function startTimer(timeLength, barWidth, progressBar, timer, maxTime) {
      var surroundingBarWidth = document.documentElement.clientWidth * 0.5;

      var start = Date.now();
      var intervalSetted = null;
      var greyBarWidth = (timeLength / maxTime) * surroundingBarWidth;
      greyBar.style.width = greyBarWidth + "px";

      function updateTimer() {
        var diff = (Date.now() - start) / 1000;
        if (diff >= timeLength) {
          diff = timeLength;
          clearInterval(intervalSetted);
        }

        var seconds = Math.floor(diff) % 60;
        var tenths = Math.floor((diff % 1) * 100);
        var progressBarWidth = (diff / maxTime) * surroundingBarWidth;

        progressBar.style.width = progressBarWidth + "px";

        timer.innerHTML =
          seconds + "." + (tenths < 10 ? "0" + tenths : tenths) + "s";
      }

      // check if the user prefers reduced motion
      var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // update the progress bar every 10 milliseconds for a smoother animation and 2000 ms for reduced motion folks
      intervalSetted = setInterval(updateTimer, prefersReducedMotion ? 2000 : 10);
    }

    startTimer(timeLength, barWidth, progressBar, timer, maxTime);
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (["elementVisible"].includes(propName)) {
        console.log(this.elementVisible);
        clearTimeout(this._debounce);
        this._debounce = setTimeout(() => {
          if (this.elementVisible) {
            this.progressAnim(this.timeLength, this.barWidth, this.maxTime);
          } else {
            this.progressBar.style.width = "0";
          }
        }, 10);
      }
    });
  }

  render() {
    return html`
    <div class="progressArea">
      <div class="barTitle">${this.barTitle}</div>
    <div class="surroundingBar">
      <div id="progress"></div>
      <div id="greyBar"></div>
      <div id="timer"></div>
    </div>
</div>
  `;
  }
}

customElements.define('progress-anim', ProgressAnim);