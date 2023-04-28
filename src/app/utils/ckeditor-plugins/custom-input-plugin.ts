// custom-input-plugin.ts
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class CustomInputPlugin extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('textInput', (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Text Input',
        tooltip: true,
      });

      view.on('execute', () => {
        editor.model.change((writer) => {
          const inputElement = writer.createElement('rawHtml', {
            value: '<input type="text" placeholder="Enter text" />',
          });
          editor.model.insertContent(inputElement);
        });
      });

      return view;
    });
  }
}
