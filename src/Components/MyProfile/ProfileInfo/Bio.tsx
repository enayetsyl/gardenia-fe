'use client';
import CustomButton from '@/Components/Shared/CustomButton';
import { useEffect, useState } from 'react';
import { useUpdateUserBioMutation } from '@/lib/api/userApi';
import { useUser } from '@/hooks/user.hook';
import { useGetCurrentUserQuery } from '@/lib/api/authApi';

const Bio = () => {
  const {user} = useUser()
  const { data: userData, refetch } = useGetCurrentUserQuery(user?._id as string, {
    skip: !user?._id, 
  });

  console.log('userData', userData)

  const [bio, setBio] = useState(userData?.data.bio || ''); 
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const maxLength = 100;
  const [updateUserBio, { isLoading }] = useUpdateUserBioMutation();

  useEffect(() => {
    if (userData?.data.bio) {
      // Set a timeout to delay the state update by 2 seconds (2000ms)
      const timeoutId = setTimeout(() => {
        setBio(userData.data.bio || ''); // Set bio from fetched data
        setNewBio(userData.data.bio || ''); // Update newBio for editing
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [userData]);
  

  const handleEdit = () => {
    setIsEditing(true);
    setNewBio(user?.bio || '');
  };

  const handleSave = async () => {
    if (user?._id) {
      try {
        const response = await updateUserBio({ userId: user._id, bio: newBio }).unwrap();
        if (response.success) {
          setBio(newBio);
          setIsEditing(false);
         refetch()
        } else {
          console.error('Failed to update bio:', response.message);
        }
      } catch (error) {
        console.error('Error updating bio:', error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <div>
          <textarea
            className="w-full p-2 border rounded-md focus:border-border-focus focus:outline-none focus:bg-background bg-gray-100"
            value={newBio}
            onChange={handleChange}
            maxLength={maxLength}
          />
          <p className="text-gray-500 text-end text-sm">
            {maxLength - newBio.length} characters remaining
          </p>
          <div className="flex justify-end items-center mt-2 gap-5">
            <CustomButton
              className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
              text="Cancel"
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
            />
            <CustomButton
              className="px-4 py-2 bg-button-bg text-button-text hover:bg-button-hover font-semibold rounded-md"
              text={isLoading ? 'Saving...' : 'Save'}
              type="button"
              onClick={handleSave}
              disabled={isLoading}
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-center">"{bio}"</p>
          <CustomButton
            text="Edit Bio"
            type="button"
            onClick={handleEdit}
            className="w-full bg-button-bg text-button-text hover:bg-button-hover font-semibold"
          ></CustomButton>
        </div>
      )}
    </>
  );
};

export default Bio;
