import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SpanningTableHeader from './SpanningTableHeader';
import PropTypes from 'prop-types';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable({
  rows,
  headCells,
  enableActionCell = false,
  actionButtons,
}) {
  const [total] = useState(0);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <SpanningTableHeader
          headCells={headCells}
          enableActionCell={enableActionCell}
        />

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              {headCells.map((cell, index) => (
                <TableCell key={index} align={cell.numeric ? 'right' : 'left'}>
                  {row[cell.id]}
                </TableCell>
              ))}
              {enableActionCell && <TableCell>{actionButtons()}</TableCell>}
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2} align='right'>
              Total
            </TableCell>
            <TableCell align='right'>{ccyFormat(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SpanningTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  enableActionCell: PropTypes.bool,
  actionButtons: PropTypes.func,
};
