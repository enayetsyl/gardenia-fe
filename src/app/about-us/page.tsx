import Image from 'next/image';
import aboutUsImage from '../../../public/about.webp';
import CustomContainer from '@/Components/Shared/CustomContainer';

const AboutUs = () => {
  return (
    <>
      <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="A vibrant garden setup with plants, flowers, and gardening tools"
          src={aboutUsImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            About Us
          </h1>
        </div>
      </div>
      <div className="bg-background-light">
        <CustomContainer>
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
            Welcome to the Gardening Tips & Advice Platform!
          </h1>

          <p className="text-justify text-p lg:text-p-lg">
            We are passionate about all things gardening! Our platform is built
            for both novice gardeners and seasoned experts to explore, learn,
            and share their gardening experiences. We believe that gardening is
            more than just planting seeds; it's about nurturing life, finding
            tranquility, and fostering a connection with nature.
          </p>

          <div className="space-y-5 pb-20">
            <div>
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                Our Mission
              </h1>
              <p className="text-justify text-p lg:text-p-lg">
                Our mission is to create a vibrant community where gardening
                enthusiasts can share knowledge, tips, and advice. We aim to
                empower everyone to cultivate their green spaces, be it a small
                balcony garden or a vast backyard. Through our platform, we hope
                to spread the joy of gardening and inspire people to grow
                something beautiful.
              </p>
            </div>
            <div>
              {' '}
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                Who We Are
              </h1>
              <p className="text-justify text-p lg:text-p-lg">
                We are a group of gardening enthusiasts, plant lovers, and tech
                innovators who came together with a shared goal – to build a
                platform that brings gardening knowledge to your fingertips. Our
                team is made up of experienced horticulturists, developers, and
                content creators dedicated to making gardening accessible and
                fun for everyone.
              </p>
            </div>
            <div>
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                What We Offer
              </h1>
              <ul>
                <li className="text-justify text-p lg:text-p-lg">
                  <strong>Expert Tips:</strong> Discover a wealth of gardening
                  tips, from plant care and seasonal guides to advanced
                  landscaping techniques.
                </li>
                <li className="text-justify text-p lg:text-p-lg">
                  <strong>Interactive Community:</strong> Join a network of
                  gardeners, share your own experiences, upvote great content,
                  and engage in meaningful conversations.
                </li>
                <li className="text-justify text-p lg:text-p-lg">
                  <strong>Premium Content:</strong> Unlock exclusive guides and
                  resources to take your gardening skills to the next level with
                  our premium membership.
                </li>
                <li className="text-justify text-p lg:text-p-lg">
                  <strong>Easy Access: </strong>Use our rich text editor to
                  share your gardening wisdom with the community effortlessly.
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                Join Us in Growing a Greener World!
              </h1>
              <p className="text-justify text-p lg:text-p-lg">
                At the Gardening Tips & Advice Platform, we believe that
                gardening has the power to transform lives. Whether you’re
                looking to start your first garden or share your knowledge, we
                are here to support you every step of the way. Let’s grow,
                learn, and inspire each other!
              </p>
            </div>
            <div>
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                Get in Touch!
              </h1>
              <p className="text-justify text-p lg:text-p-lg">
                We would love to hear from you! If you have questions,
                suggestions, or just want to share your gardening success story,
                feel free to reach out to us through our Contact Us page.
              </p>
            </div>
            <div>
              <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
                Happy Gardening!
              </h1>
              <p className="text-justify text-p lg:text-p-lg">
                The Gardening Tips & Advice Platform Team
              </p>
            </div>
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default AboutUs;
