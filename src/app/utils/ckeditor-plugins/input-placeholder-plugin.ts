// input-placeholder-plugin.ts
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export default class InputPlaceholderPlugin extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('inputPlaceholder', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Input',
        tooltip: true,
      });

      view.on('execute', () => {
        const placeholder = this._createPlaceholder();
        editor.model.change((writer) => {
          editor.model.insertContent(placeholder);
          writer.setSelection(placeholder, 'on');
        });
      });

      return view;
    });
  }

  _createPlaceholder() {
    const editor = this.editor;
  
    editor.model.schema.register('input-placeholder', {
      isObject: true,
      isBlock: false,
      isInline: true,
      allowWhere: '$text',
    });
  
    editor.conversion.for('editingDowncast').elementToElement({
      model: 'input-placeholder',
      view: (modelElement, { writer }) => {
        const widgetElement = writer.createContainerElement('span', {
          class: 'input-placeholder',
        });
  
        writer.setCustomProperty('input-placeholder', true, widgetElement);
        return toWidget(widgetElement, writer);
      },
    });
  
    editor.conversion.for('dataDowncast').elementToElement({
      model: 'input-placeholder',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('span', {
          class: 'input-placeholder',
        });
      },
    });
  
    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: 'input-placeholder',
      },
      model: 'input-placeholder',
    });
  
    const placeholder = editor.model.document.createRoot('input-placeholder');
  
    return placeholder;
  }
  
}
