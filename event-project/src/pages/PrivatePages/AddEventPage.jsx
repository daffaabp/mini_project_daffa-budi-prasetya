import React from "react";
import FormAddEvent from "../../components/form/FormAddEvent";

const AddEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Add New Event</h1>
      <FormAddEvent />
    </div>
  );
};

export default AddEventPage;
