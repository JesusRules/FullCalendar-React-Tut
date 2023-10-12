import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';

function Calendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(event);
    //     calendarApi.addEvent({
    //         start: moment(event.start).toDate(),
    //         end: moment(event.end).toDate(),
    //         title: event.title
    //     });
    }

    const handleEventAdd = async (data) => {
        const formData = {
            // title: "Jesus Returns 2!",
            // start: "Wed Oct 11 2023 23:22:38 GMT-0400 (Eastern Daylight Time)",
            // end: "Thu Oct 12 2023 23:19:38 GMT-0400 (Eastern Daylight Time)"
            title: data.event.title,
            start: data.event.start,
            end: data.event.end
        }
        console.log(formData); //Name version autos to ISO String
        // return;
        await axios.post('http://localhost:5001/api/calendar/create-event', formData)
        .then((res) => {
            console.log("Event created Successfully!");
            console.log(res.data);
        })
        .catch((err) => {
            console.log('Error!', err);
        })
    }

    const handleDatesSet = async (data) => {
        // console.log('Start Reg:', data.start);
        // console.log('Start ISO:', moment(data.start).toISOString());
        const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
        // console.log(response.data);
        setEvents(response.data);
    }

  return (
    <section>
        <button onClick={() => setModalOpen(!modalOpen)}>Add Event</button>

        <div style={{position: 'relative', zIndex: 0}}>
        <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[ dayGridPlugin ]}
            initialView='dayGridMonth'
            eventAdd={(event) => handleEventAdd(event)}
            datesSet={(date) => handleDatesSet(date)}
        />
        </div>

        <AddEventModal isOpen={modalOpen} onClose={(e) => setModalOpen(false)} onEventAdded={(event) => onEventAdded(event)} />
    
    </section>
  )
}

export default Calendar