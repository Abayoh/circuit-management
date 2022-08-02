import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import PropTypes from 'prop-types';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTable(
  {
    rows,
    headCells,
    tableLabel,
    selectDisabled = false,
    toolbarContent,
    idFieldName,
    onItemsSelected = (items) => {},
    onItemsDeselected = (items) => {},
  },
  ref
) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  React.useImperativeHandle(
    ref,
    () => {
      return { deselect };
    },
    []
  );

  const deselect = () => {
    setSelected([]);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let deselectedItems = findAllDeselectedItems();
      const newSelecteds = [...selected, ...deselectedItems];
      onItemsSelected(deselectedItems);
      setSelected(newSelecteds);
      return;
    }
    onItemsDeselected([...selected]);
    setSelected([]);
  };

  const findAllDeselectedItems = () => {
    return rows.reduce((pItems, item) => {
      if (selected.includes(item[idFieldName])) return pItems;
      pItems.push(item[idFieldName]);
      return pItems;
    }, []);
  };

  const handleItemClick = (event, id) => {
   
    if (selectDisabled) return;

    const selectedIndex = selected.indexOf(id);

    if (selectedIndex === -1) {
      addSelectedItem(id);
    } else {
      removeSelecedItem(id);
    }
  };

  const addSelectedItem = (id) => {
    let newSelected = [];
    newSelected = newSelected.concat(selected, id);
    onItemsSelected([id]);
    setSelected(newSelected);
  };

  const removeSelecedItem = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    onItemsDeselected([id]);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableLabel={tableLabel}
          toolbarContent={toolbarContent}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              selectDisabled={selectDisabled}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[idFieldName]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleItemClick(event, row[idFieldName])
                      }
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row[idFieldName]}
                      selected={isItemSelected}
                    >
                      {!selectDisabled && (
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {headCells.map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          align={cell.numeric ? 'right' : 'left'}
                        >
                          {row[cell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  idFieldName: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      disablePadding: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableLabel: PropTypes.string.isRequired,
  selectDisabled: PropTypes.bool,
  toolbarContent: PropTypes.func,
  onItemsSelected: PropTypes.func,
  onItemsDeselected: PropTypes.func,
};

export default React.forwardRef(EnhancedTable);
