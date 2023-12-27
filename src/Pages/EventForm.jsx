import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

import { useState } from 'react';

function EventForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDate: '',
    eventStart: '',
    eventEnd: '',
    eventLocation: '',
    eventGenre: 'music', // Default to 'music'
    eventPrice: '',
    eventImageName: '', // Separate field for image name
    eventImageData: '', // Separate field for image data
    eventDescription: '',
  });
  

  const [submissionResult, setSubmissionResult] = useState({
    success: false,
    message: '',
  });


  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const fileDetails = {
        fileName: file.name,
        fileSize: file.size,
      };

    // Convert file data to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file.name, // Store file name separately
        fileName: file.name, // Store additional file details
        fileSize: file.size, // Store additional file details
        eventImageData: reader.result.split(',')[1], // Store base64-encoded image data
      }));
    };
    reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create JSON object to send in the request body
    const requestBody = {
      eventTitle: formData.eventTitle,
      eventDate: formData.eventDate,
      eventStart: formData.eventStart,
      eventEnd: formData.eventEnd,
      eventLocation: formData.eventLocation,
      eventGenre: formData.eventGenre,
      eventPrice: formData.eventPrice,
      eventImageName: formData.fileName, // Send image name separately
      eventImageData: formData.eventImageData, // Send image data separately
      eventDescription: formData.eventDescription,
    };

    // Make HTTP POST request
    try {
      const response = await fetch('https://kv2ch5exkg.execute-api.us-east-1.amazonaws.com/devv/createEvents-devv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        // Form data successfully submitted
        console.log('Form submitted successfully');
        setSubmissionResult({
          success: true,
          message: 'Form submitted successfully', // Assuming the server sends the success message in the response body
        });
      } else {
        // Handle error response
        console.error('Error submitting form:', response.statusText);
        setSubmissionResult({
          success: false,
          message: `Error: ${result.body}`,
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error.message);
      setSubmissionResult({
        success: false,
        message: `Network error: ${error.message}`,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h4 className="text-center py-16 text-4xl text-red-500">Create Event</h4>
      {submissionResult.success ? (
      <div>
        <h4 className="text-center py-16 text-4xl text-green-600">{submissionResult.message}</h4>
      </div>
    ) : (
      <form
        className="container mx-auto pb-8 border rounded shadow-lg p-4 mt-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="eventTitle">
          <strong>Event Title:</strong>
        </label>
        <input
          type="text"
          id="eventT"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventDate">
          <strong>Event Date:</strong>
        </label>
        <input
          type="date"
          id="eventD"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventStart">
          <strong>Event Start Time:</strong>
        </label>
        <input
          type="text"
          id="eventS"
          name="eventStart"
          value={formData.eventStart}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventEnd">
          <strong>Event End Time:</strong>
        </label>
        <input
          type="text"
          id="eventE"
          name="eventEnd"
          value={formData.eventEnd}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventLocation">
          <strong>Event Location:</strong>
        </label>
        <input
          type="text"
          id="eventL"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventGenre">
          <strong>Event Genre:</strong>
        </label>
        <select
          id="eventG"
          name="eventGenre"
          required=""
          value={formData.eventGenre}
          onChange={handleChange}
        >
          <option value="music">Music</option>
          <option value="shows">Shows</option>
          <option value="sports">Sports</option>
        </select>
        <br />
        <br />

        <label htmlFor="eventPrice">
          <strong>Event Price:</strong>
        </label>
        <input
          type="number"
          id="eventP"
          name="eventPrice"
          step="0.01"
          min={0}
          value={formData.eventPrice}
          onChange={handleChange}
          required=""
        />
        <br />
        <br />

        <label htmlFor="eventImage">
          <strong>Event Image:</strong>
        </label>
        <input
          type="file"
          id="eventI"
          name="eventImage"
          accept="image/*"
          onChange={handleChange}
        />
        <br />
        <br />

        <label>
          <strong>Write a description of your event:</strong>
          <br />
          <textarea
            name="eventDescription"
            rows={4}
            cols={40}
            value={formData.eventDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <input
          type="submit"
          defaultValue="Create Event"
          className="w-48 h-12 mb-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
        />
      </form>
    )}
    </div>
  );
}

export default EventForm;
       
