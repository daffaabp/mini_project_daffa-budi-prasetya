import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TablePagination,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Favorite } from "@mui/icons-material";
import useEventList from "../../hooks/useEventList";

const ListEvent = () => {
  const [page, setPage] = useState(0); // State untuk mengatur halaman
  const [rowsPerPage, setRowsPerPage] = useState(5); // state untuk mengatur jumlah baris per halaman
  const [filterValue, setFilterValue] = useState(""); // state untuk nilai filter
  const [searchQuery, setSearchQuery] = useState(""); // state untuk nilai pencarian
  const { eventList, handleLikeClick } = useEventList(); // mengambil daftar event dari custom hooks

  // fungsi untuk mengubah halaman saat tombol pagination di klik
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // fungsi untuk mengubah jumlah baris per halaman saat dropdown diubah
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

   // fungsi untuk mengubah nilai filter saat dropdown filter diubah
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // fungsi untuk mengubah nilai pencarian saat nilai input pencarian diubah
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

   // filter list event berdasarkan kriteria pencarian
  const filteredList = eventList.filter((event) => {
      // jika nilai yang dicari kosong, tampilkan semua acara
    if (!searchQuery) return true;
      // jika nilai pencarian cocok dengan judul, deskripsi, atau lokasi acara, tampilkan acara tersebut
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // filter daftar acara berdasarkan kriteria filter
  const sortedList = filteredList.filter((event) => {
   // jika tidak ada filter yang dipilih, tampilkan semua acara
    if (!filterValue) return true;
    // jika filter yang dipilih adalah 'liked', tampilkan acara yang disukai
    if (filterValue === "liked") {
      return event.like === true;
    }
    // Tampilkan semua acara jika tidak ada filter yang dipilih
    return true;
  });

  return (
    <TableContainer>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TextField
        select
        label="Filter"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filterValue}
        onChange={handleFilterChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="liked">Liked</MenuItem>
      </TextField>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {/* Mengiterasi dan menampilkan daftar acara yang telah difilter dan diurutkan */}
          {sortedList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((event, index) => (
              <TableRow key={event.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time_start}</TableCell>
                <TableCell>{event.time_end}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteConfirmation(event.id, event.title)}>
                      <Delete />
                    </IconButton>
                    <IconButton
                      color={event.like ? "secondary" : "default"}
                      onClick={() => handleLikeClick(event.id, event.like)}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* Komponen TablePagination untuk mengatur halaman dan jumlah baris per halaman */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ListEvent;
