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
// import ModalDetailEvent from "../../components/modals/ModalDetailEvent";

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
          start: new Date(event.date), // asumsi event.date adalah tanggal ISO-8601
          end: new Date(event.date), // asumsi event.date adalah tanggal ISO-8601
          description: event.description,
          date: event.date,
          time: event.time,
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
      {/* {selectedEvent && (
        <ModalDetailEvent event={selectedEvent} onClose={handleCloseDetail} />
      )} */}

      {/* Pop-up untuk menampilkan detail event */}
      {selectedEvent && (
        <div
          id="showModal"
          data-modal-backdrop="showModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative w-full max-w-2xl">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Detail Information
                </h3>
                <button
                  type="button"
                  id="event-detail-btn-close"
                  className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseDetail}
                  data-modal-hide="showModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-6" id="modalContent">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Title
                        </th>
                        <td className="px-6 py-4">:</td>
                        <td className="px-6 py-4" id="event-detail-title">
                          {selectedEvent.title}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Description
                        </th>
                        <td className="px-6 py-4">:</td>
                        <td className="px-6 py-4" id="event-detail-desc">
                          {selectedEvent.description}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Date
                        </th>
                        <td className="px-6 py-4">:</td>
                        <td className="px-6 py-4" id="event-detail-date">
                          {selectedEvent.date}
                        </td>
                      </tr>
                      {/* Tambahkan informasi lainnya seperti time, image, dll */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
