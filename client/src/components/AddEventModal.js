import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';

function AddEventModal({isOpen, onClose, onEventAdded}) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    // useEffect(() => {
    //     console.log('Start:', start);
    //     console.log('End:', end);
    // }, [])

    // useEffect(() => {
    //     if (start) {
    //         console.log(start._d);
    //     }
    // }, [start])

    // useEffect(() => {
    //     if (end) {
    //         console.log(end);
    //     }
    // }, [end])

    const onSubmit = (e) => {
        e.preventDefault();
        const simpleStart = start._d;
        const simpleEnd = end._d;

        onEventAdded({
            title,
            start: simpleStart,
            end: simpleEnd
        })
        onClose();
    }

    return (
    <Modal isOpen={isOpen} onRequestClose={onClose} >
        <form onSubmit={onSubmit}>
            <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <div>
                <label>Start Date</label>
                <Datetime value={start} onChange={(e) => setStart(e)}/>
            </div>
            <div>
                <label>End Date</label>
                <Datetime value={end} onChange={(e) => setEnd(e)}/>
            </div>
            <button>Add event</button>
        </form>
    </Modal>
  )
}

export default AddEventModal