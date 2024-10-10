'use client'
import PostCard from '@/Components/ProfilePost/PostCard';
import CardBone from '@/Components/Shared/CardBone';
import { useUser } from '@/hooks/user.hook';
import { useGetSinglePostQuery } from '@/lib/api/postApi';
import { useState } from 'react';
const FavoritePosts = () => {
  const {user} = useUser()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null); 
  const { data: postData, isLoading } = useGetSinglePostQuery(selectedPostId as string, {
    skip: !selectedPostId, // Skip querying until a post is selected
  });
  const handleOpenPost = async (postId: string) => {
    setSelectedPostId(postId);
    setLoadingPostId(postId);
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLoadingPostId(null);
  };
  return (
    <div>
      <CardBone>
        <h1 className="font-bold text-lg">Favorite Posts</h1>
        <div>
          {
            user?.favoritePosts?.map((post: string) => {
              return (
                <div key={post}
                className='flex items-center justify-center rounded-lg p-2  cursor-pointer my-2 bg-background-dark shadow-lg'
                onClick={() => handleOpenPost(post)}
                >
                  <h1 className='text-text-primary '>
                  {loadingPostId === post && isLoading ? 'Loading...' : 'Open This Post'}
                  </h1>
                </div>
              )
            })
          }
        </div>
      </CardBone>
      {/* Modal */}
      {isModalOpen && postData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className='flex justify-end'>
          <button 
              className="mt-4 px-4 py-2 bg-button-bg text-button-text hover:bg-button-hover rounded-lg"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
          <PostCard
            key={postData?.data?._id}
            postId={postData?.data?._id}
            userImage={postData?.data?.userId?.userImage}
            userName={postData?.data?.userId?.name || 'Unknown User'}
            postTime={postData?.data?.createdAt ? new Date(postData?.data?.createdAt).toLocaleString() : 'Unknown Date'}
            category={postData?.data?.category}
            content={postData?.data?.content}
            title={postData?.data?.title}
            media={postData?.data?.images && postData?.data?.images.length > 0 ? { type: 'image', url: postData?.data?.images[0] } : undefined}
            link={postData?.data?.link}
            isPremium={postData?.data?.isPremium}
            upvoteCount={postData?.data?.upvoteCount || 0}
            upvotedBy={postData?.data?.upvotedBy || []}
            userId={postData?.data?.userId}
            updateTime={postData?.data?.updatedAt ? new Date(postData?.data?.updatedAt).toLocaleString() : 'Unknown Date'}  
            comments={postData?.data?.comments || []}
            favoritedBy={postData?.data?.favoritedBy || []}
            favoriteCount={postData?.data?.favoriteCount || 0}
          />
          
           
           
            
          
        </div>
      )}
    </div>
  );
};

export default FavoritePosts;
