import ContactForm from '@/Components/ContactUs/ContactForm';
import ContactInfo from '@/Components/ContactUs/ContactInfo';
import GoogleMap from '@/Components/ContactUs/GoogleMap';
import contactUsImage from '../../../public/contact.webp';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="bg-background-light">
      <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="A vibrant garden setup with plants, flowers, and gardening tools"
          src={contactUsImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 py-32 px-5 md:px-20">
        <ContactInfo />
        <ContactForm />
      </div>
      <GoogleMap />
    </div>
  );
};

export default ContactUs;
