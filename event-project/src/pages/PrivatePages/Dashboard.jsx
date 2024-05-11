import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { supabase } from "../../createClient";
import ModalDetailEvent from "../../components/modals/ModalDetailEvent";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State untuk menyimpan detail event yang dipilih

  useEffect(() => {
    async function fetchEvents() {
      // Ambil data dari tabel events di Supabase
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        // Ubah data menjadi format yang diterima oleh React Big Calendar
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(`${event.date} ${event.time_start}`), // asumsi event.date adalah tanggal ISO-8601
          end: new Date(`${event.date} ${event.time_end}`), // asumsi event.date adalah tanggal ISO-8601
          description: event.description,
          date: event.date,
          time_start: event.time_start,
          time_end: event.time_end,
          image: event.image,
          location: event.location,
          // tambahkan properti lain sesuai kebutuhan (time, image, location)
        }));
        setEvents(formattedEvents);
      }
    }

    fetchEvents();
  }, []); // pastikan useEffect hanya dijalankan sekali saat komponen dimount


  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Memperbarui state untuk menampilkan detail event saat event dipilih
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null); // Menutup pop-up detail event
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent} // Memanggil fungsi saat event dipilih
      />

      {/* Pop-up untuk menampilkan detail event */}
      {selectedEvent && (
        <ModalDetailEvent event={selectedEvent} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Dashboard;
