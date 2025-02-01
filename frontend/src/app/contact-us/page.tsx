import ContactForm from '@/Components/ContactUs/ContactForm';
import ContactInfo from '@/Components/ContactUs/ContactInfo';
import GoogleMap from '@/Components/ContactUs/GoogleMap';
import contactUsImage from '../../../public/contact.webp';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="bg-background-light">
      <div className="relative min-h-[50vh] z-10 flex flex-col justify-center items-center">
        <Image
          alt="A vibrant garden setup with plants, flowers, and gardening tools"
          src={contactUsImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />
        <div className="rounded-md dropDown z-20 flex justify-center items-center max-w-[700px] mb-12">
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
