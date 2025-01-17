import * as React from 'react';
import { useSlate } from 'slate-react';
import { isNodeTypeIn } from '../../../../common/queries/isNodeTypeIn';
import { getPreventDefaultHandler } from '../../../../common/utils/getPreventDefaultHandler';
import { setDefaults } from '../../../../common/utils/setDefaults';
import { ToolbarButton } from '../../../../components/ToolbarButton/ToolbarButton';
import { DEFAULTS_TABLE } from '../../defaults';
import { ToolbarTableProps } from './ToolbarTable.types';

export const ToolbarTable = ({ transform, ...props }: ToolbarTableProps) => {
  const { table } = setDefaults(props, DEFAULTS_TABLE);

  const editor = useSlate();

  return (
    <ToolbarButton
      active={isNodeTypeIn(editor, table.type)}
      onMouseDown={getPreventDefaultHandler(transform, editor, props)}
      {...props}
    />
  );
};
