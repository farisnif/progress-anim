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
    }

    static get styles() {
        return css`
        :host {

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
        ${this.types.map(app => html`
        <div class="item">
            <progress-anim barTitle="${app.barTitle}" numberValue="${app.numberValue}" introTitle="${app.introTitle}" description="${app.description}" timeLength="${app.timeLength}" barWidth="${app.barWidth}"></progress-anim>
    </div>
        `)}
    </div>
    `;
    }
}
customElements.define(AppsRoster.tag, AppsRoster);