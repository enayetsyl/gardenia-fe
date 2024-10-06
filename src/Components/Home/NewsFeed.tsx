import CustomContainer from "../Shared/CustomContainer"
import SeeMoreButton from "./SeeMoreButton"

const NewsFeed = () => {
  return (
    <div className="bg-background-dark">
      <CustomContainer>
      <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
        New Feed
      </h1>



      <div className="flex justify-center"><SeeMoreButton text="View More" /></div>
      </CustomContainer>
    </div>
  )
}

export default NewsFeed
