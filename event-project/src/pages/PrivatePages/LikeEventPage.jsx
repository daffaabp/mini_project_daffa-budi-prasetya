import React, { useState, useEffect } from "react";
import ListLikeEvent from "../../components/listform/ListLikeEvent";

const LikeEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Like Events</h1>
      <ListLikeEvent />
    </div>
  );
};

export default LikeEventPage;