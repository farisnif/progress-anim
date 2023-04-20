import { LitElement, html, css } from 'lit';

export class ProgressAnim extends LitElement {
  static properties = {
    version: {},
  };

  static get styles() {
    return css`
      .progress {
      background: var(--progress-anim-bar-color, linear-gradient(to right, #9dad6b, #ffa500));
      height: var(--progress-anim-bar-height, 50px);
      border-radius: var(--progress-anim-bar-radius, 6px);
      direction: rtl;
      margin-left: 20%;
    }

    .timer {
      padding-right: 10px;
      margin-left: auto;
    }

    .bruh1 {
      margin: 0 auto;
      padding: 20px;
      padding-bottom: 400px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh1-color, #687dcb);
    }
    
    .bruh2 {
      margin: 0 auto;
      margin-top: 30px;
      padding: 20px;
      padding-top: 30px;
      padding-bottom: 400px;
      border-radius: 20px;
      background-color: var(--progress-anim-bruh2-color, orange);
    }

    .speedText {
      margin-top: var(--progress-anim-header-padding-top, 20px);
      font-size: var(--progress-anim-header-size, 40px);
      font-weight: bold;
      text-align: center;
    }

    .textDescription {
      margin-top: var(--progress-anim-description-padding-top, 20px);
      font-size: var(--progress-anim-description-font-size, 18px);
      text-align: center;
    }

    .surroundingBar {
      margin-top: 50px;
      padding: 2px;
      border: 1px solid #c6c5c9;
      border-radius: 10px;
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    `;
  }


  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`
    
      <div class="bruh1">Curry for 3</div>
      <div class="bruh2">LeBron for 3</div>

      <div class="subfiller">
        <div class="speedText">Blazing fast build speed</div>
        <div class="textDescription">Combining TypeScript and Rust with a parrelized architecture to bring you the ultimate developer experience.</div>
      </div>

      <div class="surroundingBar">
        <div class="progress"></div>
        <div class="timer"></div>
      </div>
    `;
  }
}

customElements.define('progress-anim', ProgressAnim);