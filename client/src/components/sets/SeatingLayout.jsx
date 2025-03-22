import React, { useState, useEffect } from 'react';
import './SeatingLayout.css';

import Header from "../header/Header.jsx";
import Navbar from '../header/Navbar';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const initialSeatsConfig = {
  A: [1, 20, [1, 2, 3, 4], 200],
  B: [1, 20, [4], 200],
  C: [1, 20, [10], 200],
  D: [1, 20, [], 200],
  E: [1, 20, [], 200],
  F: [1, 20, [], 200],
  G: [1, 20, [], 200],
  H: [1, 20, [], 200],
  J: [1, 20, [], 200],
  K: [1, 20, [], 200],
  L: [1, 20, [], 200],
  M: [1, 20, [], 200],
  N: [1, 20, [1], 200],
};

const howSeats = [1, 2, 3, 4, 5, 6];

const SeatingLayout = () => {

  const [seatsQuantity, setSeatsQuantity] = useState(0);
  const [seatsLeft, setSeatsLeft] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null)
  const [show, setShow] = useState(false);
  const [modalTrigger, setModalTrigger] = useState('')

  const handleSeatQuantityChange = (quantity, index) => {
    setSeatsQuantity(quantity);
    setSeatsLeft(quantity);
    setSelectedSeats([]);
    setActiveIndex(index)
  };

  const handleSeatSelection = (row, seat) => {
    const seatId = `${row}${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
      setSeatsLeft(seatsLeft + 1);
    } else if (seatsLeft > 0) {
      setSelectedSeats([...selectedSeats, seatId]);
      setSeatsLeft(seatsLeft - 1);
    }
  };

  const renderSeats = (row, start, end, blockedSeats, price) => {
    const seatsArray = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    return seatsArray.map((seat, index) => {
      const seatId = `${row}${seat}`;
      const isBlocked = blockedSeats.includes(seat);
      const isSelected = selectedSeats.includes(seatId);
      const isAfterFourthSeat = index === 4;
      const isAfterFifteenSeat = index === 14;

      return (
        <React.Fragment key={seat}>
          <span
            className={`seat ${isBlocked ? 'blocked' : isSelected ? 'selected' : 'available'}`}
            onClick={() => !isBlocked && handleSeatSelection(row, seat)}
            title={`Seat: ${seat}, Price: ₹${price}`}
          >
            {seat}
          </span>
          {isAfterFourthSeat && <span className="seat-space"></span>}
          {isAfterFifteenSeat && <span className="seat-space"></span>}
        </React.Fragment>
      );
    });
  };


  // Effect to show modal on component mount
  useEffect(() => {
    setShow(true)
    setModalTrigger('Auto-opened on mount')
  }, []);

  // Handler to open modal via button click
  const handleShow = () => {
    setShow(true)
    setModalTrigger('Opened by button click')
  };

  // Handler to close the modal
  const handleClose = () => {
    setShow(false)
    setModalTrigger('')
  };

  // Handler to close modal when selecting seats quantity
  const handleSelectSeats = () => {
    if (seatsQuantity > 0) {
      setShow(false)
      setActiveIndex(index)
    }
  };

  // calculate total price of selected seats
  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = seat[0];  // extract the row from the seatId
      const price = initialSeatsConfig[row][3];  // get the price for row
      return total + price;
    }, 0);
  };


  return (
    <>
      <Header />
      <Navbar />
      <div>

        <div className="container">

          {/* <div className="col-lg-2">
            <div className="container input-card">
              <p>How many seats?</p>
              <select
                id="seats-quantity"
                value={seatsQuantity}
                onChange={handleSeatQuantityChange}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="row mt-4">
            <div className='col text-end'>
              <Button variant='outlined' endIcon={<EditIcon />} onClick={handleShow}>
                {seatsQuantity} {seatsQuantity > 1 ? 'Tickets' : 'Ticket'}
              </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Body className="text-center">
                <Modal.Title>How Many Seats?</Modal.Title>
                <div className="d-flex justify-content-center my-4">
                  {howSeats.map((item, index) => (
                    <div
                      key={index}
                      className={`seat-option ${activeIndex === index ? 'active-item' : ''}`}
                      onClick={() => handleSeatQuantityChange(item, index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <button className="btn btn-danger mt-3" onClick={handleSelectSeats}>
                  Select Seats
                </button>
              </Modal.Body>
            </Modal>


            <div className="col-lg-12">
              <p>Seats left: <strong>{seatsLeft}</strong></p>
              <div className="seats-container">
                {Object.entries(initialSeatsConfig).map(([row, [start, end, blockedSeats, price]]) => (
                  <tbody key={row} className="seat-row">
                    <tr>
                      <td className="row-name">{row}</td>
                      <td>{renderSeats(row, start, end, blockedSeats, price)}</td>
                    </tr>
                  </tbody>
                ))}
              </div>

              <div className='d-flex flex-column justify-content-center align-items-center py-5'>
                <div className='movie_screen_cont'></div>
                <p>All eyes this way please!</p>
              </div>
            </div>
          </div>

        </div>

        <div>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
        </div>


        <nav class="navbar sticky-bottom bootom_navbar">
          {
            selectedSeats.length == seatsQuantity ?
              (<>
                <div className='container d-flex justify-content-center'>
                  <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#rulesModal">
                    Pay Rs. {calculateTotalPrice()}
                  </button>
                </div>


              </>
              )
              :
              (
                <div className='container d-flex justify-content-center'>
                  <div className='d-flex align-items-center'>
                    <div className='seat_boxes'></div>
                    <div>Available</div>
                  </div>
                  <div className='d-flex align-items-center mx-5'>
                    <div className='seat_boxes selected_box'></div>
                    <div>Selected</div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='seat_boxes sold_box'></div>
                    <div>Sold</div>
                  </div>
                </div>
              )
          }
        </nav >

        <div class="modal fade" id="rulesModal" tabindex="-1" aria-labelledby="rulesModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="rulesModalLabel">Terms & Conditions</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <ol className='terms_conditions_text'>
                  <li>Ticket is Compulsory for Children of 3 Years age & Above.</li>
                  <li>Once Ticket Purchased cannot be Canceled or refunded.</li>
                  <li>Only Online booking partner server messages are allowed.</li>
                  <li>Printout & forwarded messages are not allowed for both F&B as well as for movie tickets.</li>
                  <li>Customers under the influence of alcohol will not be allowed inside the theater.</li>
                  <li>Cildren under the age of 18 years will not be permitted in the cinema for A rated movies.</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success">Accept</button>
              </div>
            </div>
          </div>
        </div>

      </div >
    </>

  );
};

export default SeatingLayout;
