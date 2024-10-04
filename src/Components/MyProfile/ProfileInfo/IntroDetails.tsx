'use client';
import React, { useState } from 'react';
import CustomButton from '@/Components/Shared/CustomButton';
import Link from 'next/link';
import { FaGraduationCap } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { PiRssBold } from 'react-icons/pi';
import { TbWorld } from 'react-icons/tb';

const IntroDetails = () => {
  // Initial details data
  const [details, setDetails] = useState({
    study: 'Programming Hero',
    location: 'Sylhet',
    maritalStatus: 'Married',
    followers: '329 people',

    website: 'https://md-enayetur-rahman-portfolio.vercel.app/',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState(details);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Save edited details
  const handleSave = () => {
    setDetails(editableDetails);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <div className="mb-2">
            <label className="block">Studied at:</label>
            <input
              type="text"
              name="study"
              value={editableDetails.study}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-2">
            <label className="block">From:</label>
            <input
              type="text"
              name="location"
              value={editableDetails.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-2">
            <label className="block">Marital Status:</label>
            <input
              type="text"
              name="maritalStatus"
              value={editableDetails.maritalStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-2">
            <label className="block">Followers:</label>
            <input
              type="text"
              name="followers"
              value={editableDetails?.followers}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* <div className="mb-2">
            <label className="block">LinkedIn:</label>
            <input
              type="text"
              name="linkedin"
              value={editableDetails?.linkedin}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div> */}

          <div className="mb-2">
            <label className="block">Website:</label>
            <input
              type="text"
              name="website"
              value={editableDetails.website}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <CustomButton
              text="Save"
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          <div className="flex justify-start items-center gap-3">
            <FaGraduationCap className="text-2xl" />

            <p>
              Studied at <strong>{details.study}</strong>
            </p>
          </div>
          <div className="flex justify-start items-center gap-3">
            <FaLocationDot className="text-2xl" />
            <p>
              From <strong>{details.location}</strong>
            </p>
          </div>

          <div className="flex justify-start items-center gap-3">
            <FaHeart className="text-2xl" />
            <p>{details.maritalStatus}</p>
          </div>

          <div className="flex justify-start items-center gap-3">
            <PiRssBold className="text-2xl" />
            <p className="text-sm">
              Followed by <strong>{details.followers}</strong>
            </p>
          </div>

          <div className="flex justify-start items-center gap-3">
            <TbWorld className="text-2xl" />
            <p className="clear-start text-primary text-sm font-semibold">
              <Link
                href={details.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {details.website
                  .replace(/(^\w+:|^)\/\//, '')
                  .replace(/^www\./, '')}
              </Link>
            </p>
          </div>

          <CustomButton
            text="Edit details"
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full mt-2 bg-button-bg hover:bg-button-hover text-button-text font-semibold rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default IntroDetails;
