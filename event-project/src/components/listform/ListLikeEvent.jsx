import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { supabase } from "../../createClient"; // Import supabase dari file createClient

const ListLikeEvent = () => {
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    fetchLikedEvents();
  }, []);

  const fetchLikedEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("like", true);
      if (error) {
        throw error;
      }
      setLikedEvents(data);
    } catch (error) {
      console.error("Error fetching liked events:", error.message);
    }
  };

  return (
    <TableContainer>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {likedEvents.map((event, index) => (
            <TableRow key={event.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.time_start}</TableCell>
              <TableCell>{event.time_end}</TableCell>
              <TableCell>{event.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListLikeEvent;
