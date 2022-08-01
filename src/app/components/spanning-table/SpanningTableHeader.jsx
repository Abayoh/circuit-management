import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';

function SpanningTableHeader({ headCells, enableActionCell = false }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
        {enableActionCell && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

SpanningTableHeader.propTypes = {
  headCells: PropTypes.array.isRequired,
  enableActionCell: PropTypes.bool,
};

export default SpanningTableHeader;
