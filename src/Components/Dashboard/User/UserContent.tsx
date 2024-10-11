import PostCard from "@/Components/ProfilePost/PostCard";
import { useUser } from "@/hooks/user.hook";
import userImage from '../../../../public/user-profile-image-1.webp'
import { useGetUserSpecificPostsQuery } from "@/lib/api/postApi";
import { User } from "@/type";
import UserLoader from "./UserLoader";

const UserContent: React.FC  = () => {
  const {user} = useUser();
  const userImageSrc = typeof userImage === 'string' ? userImage : userImage.src;
  const {data: posts, isLoading} = useGetUserSpecificPostsQuery(user?._id as string);
  return (
    
    <div>
      {isLoading ? <div className="flex justify-center items-center">
      <UserLoader/>
    </div> : (
        <div>
          {posts?.data?.map((post) => (
            <PostCard key={post._id}
            postId={post._id}
            userImage={userImageSrc}
            userName={user?.name || 'Unknown User'}
            postTime={post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date'}
            category={post.category}
            content={post.content}
            title={post.title}
            media={post.images && post.images.length > 0 ? { type: 'image', url: post.images[0] } : undefined}
            link={post.link}
            isPremium={post.isPremium}
            upvoteCount={post.upvoteCount || 0}
            upvotedBy={post.upvotedBy || []}
            userId={post.userId as unknown as User}
            updateTime={post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Unknown Date'}
            comments={post.comments || []}
            favoritedBy={post.favoritedBy || []}
            favoriteCount={post.favoriteCount || 0}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserContent
