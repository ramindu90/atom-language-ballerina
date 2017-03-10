'use babel';

import LanguageBallerinaView from './language-ballerina-view';
import { CompositeDisposable } from 'atom';

export default {

  languageBallerinaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageBallerinaView = new LanguageBallerinaView(state.languageBallerinaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageBallerinaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-ballerina:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageBallerinaView.destroy();
  },

  serialize() {
    return {
      languageBallerinaViewState: this.languageBallerinaView.serialize()
    };
  },

  toggle() {
    console.log('LanguageBallerina was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
