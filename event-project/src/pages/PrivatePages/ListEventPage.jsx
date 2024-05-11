import React from "react";
import ListEvent from "../../components/listform/ListEvent";

const ListEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">List Events</h1>
      <ListEvent />
    </div>
  );
};

export default ListEventPage;
