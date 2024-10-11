'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/Components/Shared/CustomButton';
import Link from 'next/link';
import { FaGraduationCap } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { useUpdateUserDetailsMutation } from '@/lib/api/userApi';
import { useUser } from '@/hooks/user.hook';

type Details = {
  study: string;
  location: string;
  maritalStatus: string;
  website: string;
};

const IntroDetails = () => {
  const {user} = useUser()
  // Initial details data
  const [details, setDetails] = useState<Details>({
    study: user?.study || '',
    location: user?.location || '',
    maritalStatus: user?.maritalStatus || '',
    website: user?.website || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();
  const [editableDetails, setEditableDetails] = useState<Details>(details);

  useEffect(() => {
    if (user) {
      // Set a timeout to delay the state update by 2 seconds (2000ms)
      const timeoutId = setTimeout(() => {
        setDetails({
          study: user.study || '',
          location: user.location || '',
          maritalStatus: user.maritalStatus || '',
          website: user.website || '',
        });
       
      }, 2000);
  
      return () => clearTimeout(timeoutId); // Clean up the timeout
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Save edited details
  const handleSave = async () => {
    try {
      const result = await updateUserDetails({
        userId: user?._id || "",
        details: editableDetails,
      }).unwrap();
      
      if (result.success) {
        setDetails(editableDetails);
        setIsEditing(false);
      } else {
        // Handle error
        console.error('Failed to update user details:', result.message);
      }
    } catch (error) {
      console.error('An error occurred while updating user details:', error);
    }
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
              className="px-4 py-2 bg-button-bg hover:bg-button-hover text-button-text font-semibold rounded-md"
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
