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
      z-index: 1;
    }

    /* #progress:focus {
      outline: 2px solid black;
    } */

    #timer {
      font-family: "Lucida Console", "Courier New", monospace;
      padding-right: 10px;
      margin-left: auto;
    }

    /* #timer:focus {
      outline: 2px solid black;
    } */

    .bruh1 {
      margin: 0 auto;
      padding: 20px;
      padding-bottom: 400px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh1-color, #687dcb);
      width: 80%;
    }

    .bruh1:hover {
      outline: 2px solid black;
    }
    
    .bruh2 {
      margin: 0 auto;
      margin-top: 30px;
      padding: 20px;
      padding-top: 30px;
      padding-bottom: 400px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh2-color, orange);
      width: 80%;
    }

    .bruh2:hover {
      outline: 2px solid black;
    }

    .bruh3 {
      margin: 0 auto;
      margin-top: 30px;
      padding: 20px;
      padding-top: 30px;
      padding-bottom: 400px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh2-color, violet);
      width: 80%;
    }

    .bruh3:hover {
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
    }
    .barTitle {
      font-size: 16px;
      color: grey;
    }

    .greyBar {
      position: relative;
      width: 30%;
      height: 50px;
      background-color: #ccc; /* Grey color */
      border-radius: 6px;
    }

    @media (max-width: 700px) {
    #progress {
      height: 16px;
      border-radius: 2px;
    }

    #timer {
      font-size: 8px;
      padding-right: 2px;
    }

    .surroundingBar {
      border-radius: 4px;
      padding: 2px;
    }

    .moduleCount {
      font-size: 10px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .barTitle {
      font-size: 10px;
      color: grey;
      position: relative;
      text-align: center;
    }

    .greyBar {
      position: relative;
      width: 30%;
      height: 16px;
      background-color: #ccc; /* Grey color */
      border-top-left-radius: 0;
      border-radius: 2px;
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
    this.numberValue = "50000";
    this.introTitle = "Blazing fast build speed";
    this.description = "Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience.";
    this.timeLength = 5.79;
    this.barWidth = 0.075;
  }

  progressAnim(timeLength, barWidth) {
    var progressBar = this.shadowRoot.querySelector("#progress");
    var timer = this.shadowRoot.querySelector("#timer");
    /* var greyBar = this.shadowRoot.querySelector("greyBar"); */

    function startTimer(timeLength, barWidth, progressBar, timer) {
      var totalSeconds = timeLength;
      var documentWidth =
        document.documentElement.clientWidth * barWidth;
      var start = Date.now();
      var intervalSetted = null;
      /* const progressBarWidth = progressBar.offsetWidth; */


      function updateTimer() {
        var diff = (Date.now() - start) / 1000;
        if (diff >= timeLength) {
          diff = timeLength;
          clearInterval(intervalSetted);
        }

        var seconds = Math.floor(diff % 60);
        var tenths = Math.floor((diff % 1) * 100);
        var progressBarWidth = (diff / timeLength) * documentWidth;
        progressBar.style.width = progressBarWidth + "px";
        /* greyBar.style.width = progressBarWidth + "px"; */


        timer.innerHTML =
          seconds + "." + (tenths < 10 ? "0" + tenths : tenths) + "s";
      }

      updateTimer();
      intervalSetted = setInterval(updateTimer, 10);
    }
    startTimer(timeLength, barWidth, progressBar, timer);
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
          this.progressAnim(this.timeLength, this.barWidth);
        }, 10);
      }
    });
  }

  render() {
    return html`
    
    <!-- FILLER TEXT TO TEST SCROLL FUNCTION -->
    <div class="bruh1">Curry for 3</div>
    <div class="bruh2">LeBron for 3</div>
    <div class="bruh3">Joel Hans Embiid</div>

    <div class="subfiller">
      <div class="speedText">${this.introTitle}</div>
      <div class="textDescription">${this.description}</div>
    </div>

    <div class="progressArea">
      <div class="barTitle">${this.barTitle}</div>
    <div class="surroundingBar">
      <div id="progress"></div>
      <div class="greyBar"></div>
      <div id="timer"></div>
    </div>
</div>

    <div class="moduleCount">
      <div class="moduleCountDefn">Module Count: </div>
      <div class="moduleCountNumber">${this.numberValue}</div>
    </div>
  `;
  }
}

customElements.define('progress-anim', ProgressAnim);