import React, { useState } from "react";
import { supabase } from "../../createClient";

const FormAddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time_start: "",
    time_end: "",
    location: "",
  });
  const [error, setError] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Function untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    // objek yang digunakan untuk menyimpan pesan kesalahan validasi
    const errors = {};

    if (formData.title.length < 5) {
      errors.title = "Title harus memiliki minimal 5 karakter";
    }
    if (!formData.date || isNaN(Date.parse(formData.date))) {
      errors.date = "Format tanggal tidak valid";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate < today) {
        errors.date = "Tanggal harus lebih besar dari hari ini";
      }
    }
    if (formData.description.length < 10) {
      errors.description = "Deskripsi harus memiliki minimal 10 karakter";
    }
    if (formData.location.length < 5) {
      errors.location = "Location harus memiliki minimal 5 karakter";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      // Kirim data ke database
      const { data, error } = await supabase.from("events").insert([
        {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time_start: formData.time_start,
          time_end: formData.time_end,
          location: formData.location,
        },
      ]);

      // untuk melemparkan kesalahan yang ditangkap saat menjalankan operasi tertentu
      if (error) {
        throw error;
      }

      console.log("Event berhasil ditambahkan:", data);
      // Reset formulir setelah pengiriman
      setFormData({
        title: "",
        description: "",
        date: "",
        time_start: "",
        time_end: "",
        location: "",
      });
      // Tandai operasi berhasil dan tampilkan pesan sukses
      setIsSuccess(true);
      setError({});
    } catch (error) {
      console.error("Error saat menambahkan event:", error.message);
    }
  };

  // Fungsi untuk mereset semua inputan menjadi string kosong
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time_start: "",
      time_end: "",
      location: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Tampilkan pesan sukses jika isSuccess bernilai true */}
      {isSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">
            Event baru berhasil ditambahkan!
          </strong>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Title
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {error.title && <p className="text-red-500">{error.title}</p>}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Description
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {error.description && (
            <p className="text-red-500">{error.description}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Date
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {error.date && <p className="text-red-500">{error.date}</p>}
        </div>
        <div>
          <label
            htmlFor="time_start"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Start Time
            <input
              type="time"
              name="time_start"
              id="time_start"
              value={formData.time_start}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {error.time_start && (
            <p className="text-red-500">{error.time_start}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="time_end"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            End Time
            <input
              type="time"
              name="time_end"
              id="time_end"
              value={formData.time_end}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          {error.time_end && <p className="text-red-500">{error.time_end}</p>}
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Location
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-medium leading-6 text-gray-700"
          onClick={handleCancel} //
        >
          Batal
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default FormAddEvent;
