import React from "react";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../profile/profile.css";

function ItemsTable({ items }) {
  const navigate = useNavigate();

  const columns = ["#", "Name", "Collection name"];

  if (items.length) {
    for (const field of items[0].optionalFields) {
      columns.push(field.name);
    }
  }
  columns.push("Last edit", "Created", "Link");

  const handleItemLink = (item) => {
    navigate(`/items/${item.id}`, { state: { item } });
  }

  const getDate = (date) => new Date(date).toLocaleString();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align="left">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.collection_name}</TableCell>

              {item.optionalFields.map((field, i) => (
                field.type_name === "Checkbox" ? (
                  <TableCell key={i} align="left">{field.value === "true" ? "✔" : "✖"}</TableCell>
                ) : (
                  <TableCell key={i} align="left">{field.value}</TableCell>
                )
              ))}

              <TableCell align="left">{getDate(item.last_edit)}</TableCell>
              <TableCell align="left">{getDate(item.created_date)}</TableCell>

              <TableCell align="left">
                <IconButton onClick={() => handleItemLink(item)}>
                  <OpenInNewIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ItemsTable;
