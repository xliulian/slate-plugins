import { createEditor } from 'slate';
import { onDOMBeforeInputPlugins } from '../../utils';

const event = {} as Event;

it('should', () => {
  const editor = createEditor();
  const onDOMBeforeInput = jest.fn();
  onDOMBeforeInputPlugins(
    editor,
    [{ onDOMBeforeInput }],
    [onDOMBeforeInput]
  )(event);

  expect(onDOMBeforeInput).toHaveBeenCalledTimes(2);
});
