import React from "react";
import moment from "moment";
import './style.css'

const ModalDetailEvent = ({ event, onClose }) => {
return (
  <div
    id="showModal"
    data-modal-backdrop="showModal"
    tabIndex="-1"
    aria-hidden="true"
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div className="relative w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detail Information
          </h3>
          <button
            type="button"
            id="event-detail-btn-close"
            className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
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
                    {event.title}
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
                    {event.description}
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
                    {moment(event.date).format("dddd, DD MMMM YYYY")}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    Time
                  </th>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4" id="event-detail-date">
                    {event.time_start} - {event.time_end}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    Location
                  </th>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4" id="event-detail-date">
                    {event.location}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ModalDetailEvent;
