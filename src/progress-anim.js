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
      background: var(--progress-anim-bar-color, linear-gradient(to right, #9dad6b, #ffa500));
      height: var(--progress-anim-bar-height, 50px);
      border-radius: var(--progress-anim-bar-radius, 6px);
      direction: rtl;
      position: absolute;
      z-index: 5;
    }

    /* #progress:focus {
      outline: 2px solid black;
    } */

    #timer {
      font-family: "Lucida Console", "Courier New", monospace;
      padding-right: 10px;
      margin-left: auto;
    }

    #bruh {
      margin: 0 auto;
      padding: 20px;
      padding-bottom: 400px;
      margin-bottom: 20px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh1-color, #687dcb);
      width: 80%;
    }

    #bruh:hover {
      outline: 2px solid black;
    }
    
    .speedText {
      margin-top: var(--progress-anim-header-padding-top, 20px);
      font-size: var(--progress-anim-header-size, 40px);
      font-weight: bold;
      text-align: center;
    }

    .textDescription {
      margin-top: var(--progress-anim-description-margin-top, 20px);
      margin-bottom: var(--progress-anim-description-margin-bottom, 20px);
      font-size: var(--progress-anim-description-font-size, 18px);
      text-align: center;
    }

    .surroundingBar {
      margin-top: 50px;
      padding: 4px;
      border: 1px solid #c6c5c9;
      border-radius: 10px;
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }

    .moduleCount {
      font-size: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .moduleCountDefn {
      margin-right: 2px;
      font-weight: var(--progress-anim-module-defn-boldness, lighter);
      color: var(--progress-anim-module-count-defn-font-color, grey);
    }

    .moduleCountNumber {
      font-weight: var(--progress-anim-module-count-number-boldness, bold);
      color: var(--progress-anim-module-count-number-font-color, #535353);
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
    right: calc(100% - 10%);
  }


    #greyBar {
      position: relative;
      width: 30%;
      height: 50px;
      background-color: #ccc;
      border-radius: 6px;
      z-index: 2
    }

    @media (max-width: 700px) {
    #progress {
      height: 20px; //was 28 tsting
      border-radius: var(--progress-anim-bar-radius, 2px);
      border-radius: 1px;
      transition-width: 1s;
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

    .surroundingBar {
      border-radius: 4px;
      padding: 2px;
      height: 20px;
    }

    .moduleCount {
      font-size: 10px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .barTitle {
      font-size: 12px;
      color: grey;
      position: absolute;
      right: calc(77%);
    }

    #greyBar {
      position: relative;
      width: 30%;
      height: 20px;
      background-color: #ccc;
      border-top-left-radius: 0;
      border-radius: 2px;
      z-index: 2;
    }

    .moduleCount {
      font-size: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .moduleCountDefn {
      margin-right: 2px;
      font-weight: var(--progress-anim-module-defn-boldness, lighter);
      color: var(--progress-anim-module-count-defn-font-color, grey);
    }

    .moduleCountNumber {
      font-weight: var(--progress-anim-module-count-number-boldness, bold);
      color: var(--progress-anim-module-count-number-font-color, #535353);
    }
    `;
  }


  constructor() {
    super();
    this.barTitle = "Rspack";
    /* this.numberValue = "50000";
    this.introTitle = "Blazing fast build speed";
    this.description = "Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience."; */
    this.timeLength = 5.79;
    this.maxTime = 60;
    this.barWidth = 0.075;
  }

  progressAnim(timeLength, barWidth, maxTime) {
    var progressBar = this.shadowRoot.querySelector("#progress");
    var timer = this.shadowRoot.querySelector("#timer");
    var greyBar = this.shadowRoot.querySelector("#greyBar");

    function startTimer(timeLength, barWidth, progressBar, timer, maxTime) {
      var totalSeconds = timeLength;
      var documentWidth = document.documentElement.clientWidth * barWidth;
      var surroundingBarWidth = document.documentElement.clientWidth * 0.5;

      var start = Date.now();
      var intervalSetted = null;
      const progressBarWidth = progressBar.offsetWidth;
      var greyBarWidth = (timeLength / maxTime) * surroundingBarWidth;
      greyBar.style.width = greyBarWidth + "px";

      // set the transition property of the progress bar to create a smooth animation
      progressBar.style.transition = "width 0.2s ease-in-out";

      function updateTimer() {
        var diff = (Date.now() - start) / 1000;
        if (diff >= timeLength) {
          diff = timeLength;
          clearInterval(intervalSetted);
        }

        var seconds = Math.floor(diff) % 60;
        var tenths = Math.floor((diff % 1) * 100);
        var progressBarWidth = (diff / maxTime) * surroundingBarWidth;

        // update the width of the progress bar using the style property
        progressBar.style.width = progressBarWidth + "px";

        timer.innerHTML =
          seconds + "." + (tenths < 10 ? "0" + tenths : tenths) + "s";
      }

      // check if the user prefers reduced motion
      var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // update the progress bar every 100 milliseconds for a smoother animation
      intervalSetted = setInterval(updateTimer, prefersReducedMotion ? 2000 : 100);
    }

    startTimer(timeLength, barWidth, progressBar, timer, maxTime);
  }



  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (
        ["elementVisible"].includes(
          propName
        )
      ) {
        console.log(this.elementVisible);
        clearTimeout(this._debounce);
        this._debounce = setTimeout(() => {
          this.progressAnim(this.timeLength, this.barWidth, this.maxTime);
        }, 10);
      }
    });
  }

  render() {
    return html`
    
    <!-- FILLER TEXT TO TEST SCROLL FUNCTION -->
    <!-- <div id="bruh">Joel Hans Embiid</div>
    <div id="bruh">Joel Hans Embiid</div>
    <div id="bruh">Joel Hans Embiid</div>


    <div class="subfiller">
      <div class="speedText">${this.introTitle}</div>
      <div class="textDescription">${this.description}</div>
    </div> -->

    <div class="progressArea">
      <div class="barTitle">${this.barTitle}</div>
    <div class="surroundingBar">
      <div id="progress"></div>
      <div id="greyBar"></div>
      <div id="timer"></div>
    </div>
</div>

    <!-- <div class="moduleCount">
      <div class="moduleCountDefn">Module Count: </div>
      <div class="moduleCountNumber">${this.numberValue}</div>
    </div> -->
  `;
  }
}

customElements.define('progress-anim', ProgressAnim);