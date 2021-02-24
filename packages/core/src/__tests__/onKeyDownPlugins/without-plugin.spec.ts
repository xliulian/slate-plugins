import { createEditor } from 'slate';
import { onKeyDownPlugins } from '../../utils';

const event = {} as Event;

it('should', () => {
  const editor = createEditor();
  const onKeyDown = jest.fn();
  onKeyDownPlugins(editor, [], [])(event);
  onKeyDownPlugins(editor, [{}], [])(event);

  expect(onKeyDown).not.toHaveBeenCalled();
});
