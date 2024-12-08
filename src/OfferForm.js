import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './OfferForm.css';

function OfferForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    months: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const formRefs = {
    name: React.createRef(),
    address: React.createRef(),
    phone: React.createRef(),
    months: React.createRef(),
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateAndFocus = () => {
    if (!formData.name.trim()) {
      formRefs.name.current.focus();
      return false;
    }
    if (!formData.address.trim()) {
      formRefs.address.current.focus();
      return false;
    }
    if (!formData.phone.trim() || !/^\d{9}$/.test(formData.phone)) {
      formRefs.phone.current.focus();
      return false;
    }
    if (!formData.months.trim() || isNaN(formData.months) || formData.months <= 0) {
      formRefs.months.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateAndFocus()) {
      try {
        // Make a POST request to the backend
        const response = await axios.post('http://localhost:8085/ht/create', formData); // Replace with your API endpoint
        if (response.status === 200) {
          setFormData({ name: '', address: '', phone: '', months: '' });
          setShowPopup(true);
          setErrorMessage('');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Failed to submit. Please try again later.');
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h2> PATIENT OFFER FORM </h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <label htmlFor="name"> Name </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John"
          value={formData.name}
          onChange={handleInputChange}
          ref={formRefs.name}
        />

        <label htmlFor="address"> Address </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Colombo"
          value={formData.address}
          onChange={handleInputChange}
          ref={formRefs.address}
        />

        <label htmlFor="phone"> Phone Number </label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="752345678"
          value={formData.phone}
          onChange={handleInputChange}
          ref={formRefs.phone}
        />

        <label htmlFor="months"> Number of Months </label>
        <input
          type="text"
          id="months"
          name="months"
          placeholder="Number of Months"
          value={formData.months}
          onChange={handleInputChange}
          ref={formRefs.months}
        />

        <button type="submit"> Submit </button>
        <button type="button" onClick={() => setFormData({ name: '', address: '', phone: '', months: '' })}>
          Cancel
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>🎉 Submitted Successfully! 🎉</h3>
            <p>Your information has been recorded.</p>
            <button onClick={handleClosePopup} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OfferForm;
