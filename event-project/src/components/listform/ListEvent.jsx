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
} from "@mui/material";
import { Edit, Delete, Favorite } from "@mui/icons-material";
import useEventList from "../../hooks/useEventList";
import Swal from "sweetalert2";
import ModalEditEvent from "../modals/ModalEditEvent";

const ListEvent = () => {
  const { eventList, handleLikeClick, handleDeleteEvent, handleUpdateEvent } = useEventList(); // mengambil daftar event dari custom hooks
  const [page, setPage] = useState(0); // State untuk mengatur halaman
  const [rowsPerPage, setRowsPerPage] = useState(5); // state untuk mengatur jumlah baris per halaman
  const [searchQuery, setSearchQuery] = useState(""); // state untuk nilai pencarian
  const [selectedEvent, setSelectedEvent] = React.useState(null); // state untuk menyimpan event yang dipilih untuk diedit
  const [openEditModal, setOpenEditModal] = React.useState(false); // state untuk mengontrol visibilitas modal edit

  // fungsi untuk mengubah halaman saat tombol pagination di klik
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // fungsi untuk mengubah jumlah baris per halaman saat dropdown diubah
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

   // tampilkan modals konfirmasi sebelum menghapus event
   const handleDeleteConfirmation = (eventId, eventTitle) => {
      Swal.fire({
        title: `Yakin akan menghapus event "${eventTitle}"?`, // Judul modals konfirmasi dengan nama event
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Jika konfirmasi di-setujui, panggil fungsi handleDeleteEvent
          handleDeleteEvent(eventId);
          Swal.fire("Terhapus!", "Event anda telah terhapus.", "success");
        }
      });
    };

    const handleEditClick = (event) => {
      setSelectedEvent(event); // Menetapkan event yang dipilih ke state
      setOpenEditModal(true);  // Membuka modal edit
    };
  
    const handleCloseEditModal = () => { // Fungsi untuk menutup modal edit
      setOpenEditModal(false); // Menutup modal edit
    };
  
    const handleSaveEditModal = (updatedEventData) => { // Fungsi untuk menangani penyimpanan perubahan pada modal edit
      handleUpdateEvent(selectedEvent.id, updatedEventData); // Memanggil fungsi handleUpdateEvent dari custom hook useEventList untuk mengupdate event
    };
  
  return (
    <>
      <TableContainer>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
            {filteredList
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
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(event)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDeleteConfirmation(event.id, event.title)
                        }
                      >
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
          count={filteredList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <ModalEditEvent
          open={openEditModal}
          handleClose={handleCloseEditModal}
          eventData={selectedEvent}
          handleSave={handleSaveEditModal}
        />

      </TableContainer>
    </>
  );
};

export default ListEvent;
