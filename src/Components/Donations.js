import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import style from '../Style.css';

Modal.setAppElement('#root');

function Donations() {
  const navigate = useNavigate();
  const handleProfile =()=>
  {
    navigate(`/profile/${transactionId}`);
  }
  const { transactionId } = useParams();

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [donationData, setDonationData] = useState({
    amount: '',
    donation_date: '',
    status: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Maintain a list of donations
  const [donationsList, setDonationsList] = useState([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/showbyid/${transactionId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();
  }, [transactionId]);

  const handleAddDonation = async () => {
    try {
      const newUserDonation = {
        ...userDetails,
        d: donationData,
      };

      // Send a POST request to add the donation
      await axios.post('http://localhost:8080/adddonor', newUserDonation);

      // Add the new donation to the list
      setDonationsList([...donationsList, newUserDonation]);

      // Clear the donationData state
      setDonationData({
        amount: '',
        donation_date: '',
        status: '',
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  return (
    <div id='donations'>
      <div className='overlay'>
      <h1  className='welcome'> Dashboard </h1>
      <div id='dondetails'>
      <h4>MY DONATIONS</h4>
      {donationsList.map((donation, index) => (
        <div key={index}>
           <p>____________________________________________</p>
          <h5> Amount: ₹{donation.d.amount}</h5>
          <h5>Donation Date: {donation.d.donation_date}</h5>
          <h5>Status: {donation.d.status}</h5>
          <p>____________________________________________</p>
        </div>
      ))}
      </div>
      <button id='addbutton' onClick={() => setIsModalOpen(true)}>Add a donation</button>
      <div>
      <div id='donid'><h3>{transactionId}</h3></div>
      <button id='profilebutton' onClick={handleProfile}>My Profile</button>
      </div>
      </div>

      <Modal
      id='modal'
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Donation Modal"
      >
        <h2>ADD A DONATION</h2>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={donationData.amount}
            onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Donation Date:
          <input
            type="date"
            name="donation_date"
            value={donationData.donation_date}
            onChange={(e) =>
              setDonationData({ ...donationData, donation_date: e.target.value })
            }
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={donationData.status}
            onChange={(e) => setDonationData({ ...donationData, status: e.target.value })}
          />
        </label>
        <br></br>
        <button onClick={handleAddDonation}>Save Donation</button>
        <br></br>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default Donations;