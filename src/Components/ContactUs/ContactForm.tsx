'use client';
import toast from 'react-hot-toast';
import CustomButton from '../Shared/CustomButton';
import CustomInput from '../Shared/CustomInput';
import { useState } from 'react';

const ContactForm = () => {
  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Handle change in form inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add form submission logic here (e.g., API call)
    toast.success('Message submitted successfully!');

    setFormData(initialFormState);
  };

  return (
    <div className="bg-background-dark shadow-xl w-full p-5">
      <form onSubmit={handleFormSubmit}>
        <CustomInput
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-background-light"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-background-light"
        />
        <CustomInput
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-background-light"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-background-light"
          rows={6}
        ></textarea>
        <CustomButton
          text="Send Message"
          type="submit"
          className="bg-primary hover:bg-primary-light text-white px-4 py-2"
        />
      </form>
    </div>
  );
};

export default ContactForm;
