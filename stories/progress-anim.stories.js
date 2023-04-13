import { html } from 'lit';
import '../src/progress-anim.js';

export default {
  title: 'ProgressAnim',
  component: 'progress-anim',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <progress-anim
      style="--progress-anim-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </progress-anim>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
