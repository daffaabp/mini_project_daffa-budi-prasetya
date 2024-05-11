import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const ModalEditEvent = ({ open, handleClose, eventData, handleSave }) => { // Mendefinisikan komponen ModalEditEvent dengan props open, handleClose, eventData, dan handleSave
  const [formData, setFormData] = useState({ ...eventData }); // State untuk menyimpan data formulir yang akan diedit
  const [error, setError] = useState({}); // State untuk menyimpan pesan kesalahan validasi

  useEffect(() => { // Menggunakan useEffect untuk memperbarui data formulir saat prop eventData berubah
    setFormData({ ...eventData }); // Menetapkan nilai eventData ke dalam state formData
  }, [eventData]); // useEffect akan dijalankan setiap kali nilai eventData berubah

  const handleChange = (e) => { // Fungsi untuk menangani perubahan pada input formulir
    const { name, value } = e.target; // Mendapatkan nama dan nilai input
    setFormData({ ...formData, [name]: value }); // Memperbarui state formData dengan data baru
  };

  const handleSubmit = (e) => { // Fungsi untuk menangani pengiriman formulir
    e.preventDefault(); // Mencegah perilaku default dari pengiriman formulir
    const errors = {}; // Objek untuk menyimpan pesan kesalahan validasi

    if (formData.title.length < 5) {  // Validasi untuk panjang judul
      errors.title = "Title harus memiliki minimal 5 karakter";
    }
    
    if (formData.description.length < 10) {
      errors.description = "Deskripsi harus memiliki minimal 10 karakter";
    }

    if (!formData.date || isNaN(Date.parse(formData.date))) {
      errors.date = "Format tanggal tidak valid";
    }

    if (Object.keys(errors).length > 0) { // Jika terdapat pesan kesalahan validasi
      setError(errors); // Menetapkan pesan kesalahan ke dalam state error
      return; // Menghentikan proses pengiriman formulir
    }

    handleSave(formData); // Memanggil fungsi handleSave dengan data formulir yang telah diubah
    handleClose(); // Menutup modal setelah penyimpanan berhasil
  };

  const handleCancel = () => {
   setFormData({ ...eventData });
   handleClose();
 }

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextField type='text' label="Title" variant="outlined" name="title" value={formData.title} onChange={handleChange} fullWidth />
              {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div>
              <TextField type='text' label="Description" variant="outlined" name="description" value={formData.description} onChange={handleChange} fullWidth />
              {error.title && <p className="text-red-500">{error.description}</p>}
            </div>
            <div>
              <TextField type="date" label="Date" variant="outlined" name="date" value={formData.date} onChange={handleChange} fullWidth />
              {error.date && <p className="text-red-500">{error.date}</p>}
            </div>
            <div>
              <TextField type="time" label="Start Time" variant="outlined" name="time_start" value={formData.time_start} onChange={handleChange} fullWidth />
              {error.time_start && <p className="text-red-500">{error.time_start}</p>}
            </div>
            <div>
              <TextField type="time" label="End Time" variant="outlined" name="time_end" value={formData.time_end} onChange={handleChange} fullWidth />
              {error.time_end && <p className="text-red-500">{error.time_end}</p>}
            </div>
            <div>
              <TextField type='text' label="Location" variant="outlined" name="location" value={formData.location} onChange={handleChange} fullWidth />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button variant="outlined" onClick={handleCancel}>Batal</Button>
            <Button type="submit" variant="contained">Simpan</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEditEvent;
