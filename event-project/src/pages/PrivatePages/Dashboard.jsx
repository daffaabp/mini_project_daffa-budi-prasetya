// import React from "react";

// const Dashboard = () => {
//    return (
//       <div id="default-carousel" className="relative w-full" data-carousel="slide">
//          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//             {/* Item 1 */}
//             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src="https://source.unsplash.com/random/800x600/?nature"
//                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//             </div>
//             {/* Item 2 */}
//             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src="https://source.unsplash.com/random/800x600/?technology"
//                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//             </div>
//             {/* Item 3 */}
//             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src="https://source.unsplash.com/random/800x600/?travel"
//                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//             </div>
//             {/* Item 4 */}
//             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src="https://source.unsplash.com/random/800x600/?food"
//                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//             </div>
//             {/* Item 5 */}
//             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src="https://source.unsplash.com/random/800x600/?architecture"
//                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//             </div>
//          </div>
//          {/* Slider indicators */}
//          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//             <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
//                   data-carousel-slide-to="0"></button>
//             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
//                   data-carousel-slide-to="1"></button>
//             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
//                   data-carousel-slide-to="2"></button>
//             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
//                   data-carousel-slide-to="3"></button>
//             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5"
//                   data-carousel-slide-to="4"></button>
//          </div>
//          {/* Slider controls */}
//          <button type="button"
//             className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//             data-carousel-prev>
//             <span
//                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                   <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
//                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                         d="M5 1 1 5l4 4" />
//                   </svg>
//                   <span className="sr-only">Previous</span>
//             </span>
//          </button>
//          <button type="button"
//             className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//             data-carousel-next>
//             <span
//                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                   <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
//                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                         d="m1 9 4-4-4-4" />
//                   </svg>
//                   <span className="sr-only">Next</span>
//             </span>
//          </button>
//       </div>
//    );
// };

// export default Dashboard;



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
