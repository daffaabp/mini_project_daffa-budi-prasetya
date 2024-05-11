import { useState, useEffect } from 'react';
import { supabase } from '../createClient';

const useEventList = () => {
  const [eventList, setEventList] = useState([]); // state buat nyimpen daftar event

  // useEffect untuk menjalankan fetchEventList saat komponen pertama kali dirender
  useEffect(() => { 
    fetchEventList();
  }, []);

  const fetchEventList = async () => {
    try {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        throw error;
      }
      setEventList(data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const handleLikeClick = async (eventId, currentLike) => {
    try {
      // Mengubah nilai like
      const { data, error } = await supabase // memanggil API Supabase untuk meng update nilai "like"
        .from("events")
        .update({ like: !currentLike }) // mengubah nilai "like" dari false ke true atau sebaliknya
        .eq("id", eventId); // filter berdasarkan id event
      if (error) {
        throw error; // jika terjadi error, lempar error
      }
      console.log("Update like success:", data);

      // update nilai like dalam state lokal
      setEventList((prevEventList) =>
        prevEventList.map((event) =>
          event.id === eventId ? { ...event, like: !currentLike } : event
        )
      );
    } catch (error) {
      console.error("Update like error:", error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', eventId);
      if (error) {
        throw error;
      }
      setEventList((prevEventList) => prevEventList.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const handleUpdateEvent = async (eventId, eventData) => {
    try {
      const { data, error } = await supabase.from('events').update(eventData).eq('id', eventId);
      if (error) {
        throw error;
      }
      console.log('Update event success:', data);

      setEventList((prevEventList) =>
        prevEventList.map((event) =>
          event.id === eventId ? { ...event, ...eventData } : event
        )
      );
    } catch (error) {
      console.error('Update event error:', error.message);
    }
  };
  


  return { eventList, handleLikeClick, handleDeleteEvent, handleUpdateEvent }; // mengembalikan daftar event dan fungsi handleLikeClick
};

export default useEventList;
