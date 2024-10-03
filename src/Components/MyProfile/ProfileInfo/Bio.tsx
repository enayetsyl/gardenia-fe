'use client';
import CustomButton from '@/Components/Shared/CustomButton';
import { useState } from 'react';

const Bio = () => {
  const [bio, setBio] = useState(
    'Tech enthusiast and aspiring web developer, weaving creativity into every line of code.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const maxLength = 100;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setBio(newBio);
    setIsEditing(false);
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
            />
            <CustomButton
              className="px-4 py-2 bg-button-bg text-button-text hover:bg-button-hover font-semibold rounded-md"
              text="Save"
              type="button"
              onClick={handleSave}
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
