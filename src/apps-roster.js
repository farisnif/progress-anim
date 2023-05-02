import { LitElement, html, css } from 'lit';
import "./progress-anim.js";

export class AppsRoster extends LitElement {
  static get tag() {
    return 'apps-roster';
  }
  static get properties() {
    return {
      types: { type: Array },
      apps: { type: String },
    }
  }

  constructor() {
    super();
    this.types = []
    this.apps = 'Software';
    this.updateRoster();
    this.numberValue = "50000";
    this.introTitle = "Blazing fast build speed";
    this.description = "Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience.";
  }

  static get styles() {
    return css`
        /* BROUGHT THIS CSS OVER FROM PROGRESS-ANIM.js */
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

    /* MODULE COUNT CSS MOVED FORM PROGRESS-ANIM.js */
    
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

    .textDescription {
      margin-top: var(--progress-anim-description-margin-top, 20px);
      margin-bottom: var(--progress-anim-description-margin-bottom, 20px);
      font-size: var(--progress-anim-description-font-size, 18px);
      text-align: center;
    }

    .speedText {
      margin-top: var(--progress-anim-header-padding-top, 20px);
      font-size: var(--progress-anim-header-size, 40px);
      font-weight: bold;
      text-align: center;
      background: linear-gradient(to right, green, orange);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }


        `;
  }


  updateRoster() {
    const address = new URL('../assets/roster.json', import.meta.url).href;
    fetch(address).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return [];
    })
      .then((data) => {
        this.types = data;
      });
  }



  render() {
    return html`
        <div class="wrapper">
         <!-- DROPPED FROM PROGRESS-ANIM.js FILLER TEXT TO TEST SCROLL FUNCTION -->
        <div id="bruh">Joel Hans Embiid</div>
        <div id="bruh">Joel Hans Embiid</div>
        <div id="bruh">Joel Hans Embiid</div>


        <div class="subfiller">
        <div class="speedText">${this.introTitle}</div>
        <div class="textDescription">${this.description}</div>
        </div>
        ${this.types.map(app => html`
        <div class="item">
            <progress-anim barTitle="${app.barTitle}" numberValue="${app.numberValue}" introTitle="${app.introTitle}" description="${app.description}" timeLength="${app.timeLength}" barWidth="${app.barWidth}"></progress-anim>
    </div>
        `)}

        <div class="moduleCount">
      <div class="moduleCountDefn">Module Count: </div>
      <div class="moduleCountNumber">${this.numberValue}</div>
    </div>

    </div>
    `;
  }
}
customElements.define(AppsRoster.tag, AppsRoster);