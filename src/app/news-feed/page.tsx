"use client"
import React, { useState, useEffect } from 'react';
import { useSearchAndFilterPostsQuery } from "@/lib/api/postApi";
import PostCard from "@/Components/ProfilePost/PostCard";
import CustomContainer from "@/Components/Shared/CustomContainer";
import Loading from "@/Components/Shared/Loading";
import { NewsFeed as NewsFeedType } from '@/type';

// Gardening categories
const categories: string[] = [
  "Vegetable Gardening",
  "Flower Gardening",
  "Herb Gardening",
  "Fruit Gardening",
  "Indoor Gardening",
  "Landscaping",
  "Succulents & Cacti",
  "Container Gardening",
  "Organic Gardening",
  "Seasonal Gardening"
];

const NewsFeed = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<NewsFeedType[]>([]);
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available for fetching
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data: newsFeed, isLoading: isNewsFeedLoading, isFetching } = useSearchAndFilterPostsQuery({
    search,
    category,
    page,
  });

  useEffect(() => {
    console.log('Fetched posts:', newsFeed);
    if (newsFeed && !isNewsFeedLoading) {
      if (page === 1) {
        setPosts(newsFeed.data); 
      } else {
        
        setPosts((prev) => [...prev, ...newsFeed.data.filter(post => !prev.some(p => p._id === post._id))]);
      }
  
      
      setHasMore(newsFeed.data.length > 0); 
      setIsFetchingMore(false); 
      console.log('Updated posts:', posts);
    }
  }, [newsFeed, isNewsFeedLoading, page]);
  

  // Infinite scroll function
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !isFetchingMore && !isFetching) {
      setIsFetchingMore(true);
      console.log("Loading more content for page: ", page + 1); // Debugging line
      setPage((prevPage) => prevPage + 1);
    }
  };
  

  useEffect(() => {
    // Add event listener for scrolling
    window.addEventListener('scroll', handleScroll);

    // Cleanup scroll listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetchingMore, hasMore, isFetching]);

  // Reset page and posts when search or category changes
  useEffect(() => {
    setPage(1); // Reset to first page
    setPosts([]); // Clear posts for new search or category
    setHasMore(true); // Reset the hasMore state for new queries
  }, [search, category]);

  if (isNewsFeedLoading && page === 1) return <Loading />; // Show loading only on the first page

  return (
    <div>
      <CustomContainer>
        <div className="pt-10">
          {/* Search and Filter UI */}
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full mb-5"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full mb-5"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                userImage={post.userId.userImage}
                userName={post.userId.name || 'Unknown User'}
                postTime={post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date'}
                category={post.category}
                content={post.content}
                title={post.title}
                media={post.images && post.images.length > 0 ? { type: 'image', url: post.images[0] } : undefined}
                link={post.link}
                isPremium={post.isPremium}
                upvoteCount={post.upvoteCount || 0}
                upvotedBy={post.upvotedBy || []}
                userId={post.userId}
                updateTime={post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Unknown Date'}
                comments={post.comments || []}
                favoritedBy={post.favoritedBy || []}
                favoriteCount={post.favoriteCount || 0}
              />
            ))}
          </div>

          {isFetchingMore && <Loading />} {/* Show loading spinner when fetching more posts */}
          {!hasMore && <p className="text-center mt-5">No more posts to load</p>} {/* Show message if no more posts */}
        </div>
      </CustomContainer>
    </div>
  );
};

export default NewsFeed;
