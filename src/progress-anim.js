import { LitElement, html, css } from 'lit';

export class ProgressAnim extends LitElement {
  static properties = {
    version: {},
  };

  static get styles() {
    return css`
      :host{
        font-size: 2em;
        border: 1px solid blue;
      }
    `;
  }
  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`
    <p>Welcome to the Lit tutorial!</p>
    <p>This is the ${this.version} code.</p>
    `;
  }
}

customElements.define('progress-anim', ProgressAnim);