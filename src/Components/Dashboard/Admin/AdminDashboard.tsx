import Image from 'next/image'
import adminDashboard from '../../../../public/admin-dashboard.webp'
import { User } from '@/type';
import { useGetDailyStatsQuery, useGetMonthlyStatsQuery, useGetStatsOverviewQuery } from '@/lib/api/adminApi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import StatCard from './StatCard';
import CustomContainer from '@/Components/Shared/CustomContainer';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const AdminDashboard = ({user}: {user: User}) => {
  const { data: overview, error: overviewError, isLoading: isOverviewLoading } = useGetStatsOverviewQuery();
  const { data: monthlyStats, error: monthlyError, isLoading: isMonthlyLoading } = useGetMonthlyStatsQuery();
  const { data: dailyStats, error: dailyError, isLoading: isDailyLoading } = useGetDailyStatsQuery({
    start: '2024-10-01',
    end: '2024-10-31',
  });

  // if (isOverviewLoading || isMonthlyLoading || isDailyLoading) {
  //   return <div>Loading...</div>;
  // }

  if (overviewError || monthlyError || dailyError) {
    return <div>Error loading stats</div>;
  }

  console.log("overview", overview, "monthlyStats", monthlyStats, "dailyStats", dailyStats)


 // Consolidate all dates into a single array
 const allDates = Array.from(
  new Set([
    ...(dailyStats?.data.dailyNewUsers?.map((entry) => entry._id) ?? []),
    ...(dailyStats?.data.dailyNewPosts?.map((entry) => entry._id) ?? []),
    ...(dailyStats?.data.dailyNewComments?.map((entry) => entry._id) ?? []),
    ...(dailyStats?.data.dailyNewPremiumContent?.map((entry) => entry._id) ?? []),
  ])
).sort(); // Sort the dates to ensure they are in chronological order

// Helper function to get the data for each dataset, filling in missing dates with 0
interface DataItem {
  _id: string;
  [key: string]: number | string; // Assuming other properties can be numbers or strings
}

function getDataForDates<T extends { _id: string; [key: string]: any }>(
  data: T[] | undefined,
  allDates: string[],
  key: string
): DataItem[] {
  // Add a check at the beginning of the function
  if (!data) return allDates.map(date => ({ _id: date, date, [key]: 0 }));

  // Create a map of existing data
  const dataMap = new Map(data.map(item => [item._id, item[key]]));

  // Map all dates to DataItem objects
  return allDates.map(date => ({
    _id: date,
    date,
    [key]: dataMap.get(date) || 0
  }));
}

// Prepare the chart data for all datasets
const dailyUsers = getDataForDates(dailyStats?.data.dailyNewUsers, allDates, 'newUsers');
const dailyPosts = getDataForDates(dailyStats?.data.dailyNewPosts, allDates, 'newPosts');
const dailyComments = getDataForDates(dailyStats?.data.dailyNewComments, allDates, 'newComments');
const dailyPremiumContent = getDataForDates(dailyStats?.data.dailyNewPremiumContent, allDates, 'newPremiumContent');

const chartData = {
  labels: allDates, // X-axis labels (dates)
  datasets: [
    {
      label: 'New Users',
      data: dailyUsers.map(item => item.newUsers), // Extract numbers for new users
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Posts',
      data: dailyPosts.map(item => item.newPosts), // Extract numbers for new posts
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Comments',
      data: dailyComments.map(item => item.newComments), // Extract numbers for new comments
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Premium Content',
      data: dailyPremiumContent.map(item => item.newPremiumContent), // Extract numbers for new premium content
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: true,
      tension: 0.1,
    },
  ],
};


const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // Use a specific position
    },
    title: {
      display: true,
      text: 'Daily Statistics',
    },
  },
};


  return (
    <div className='py-10 bg-background-dark'>
    <CustomContainer>
    <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="cover image"
          src={adminDashboard}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            Welcome {user?.name}
          </h1>
        </div>
      </div>
      

      <div className='space-y-10 flex flex-col items-center'>
      <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent py-5">
            Overview
          </h1>
        <StatCard
        text1="Total Users"
        data1={overview?.data.totalUsers ?? 0}
        text2="Total Posts"
        data2={overview?.data.totalPosts ?? 0}
        />

        <StatCard
        text1="Total Comments"
        data1={overview?.data.totalComments ?? 0}
        text2="Total Premium Content"
        data2={overview?.data.totalPremiumContent ?? 0}
        />
        
      </div>
      <div className='space-y-10 flex flex-col items-center'>
      <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent py-5">
      Monthly Stats
          </h1>
        <StatCard
        text1="New Users This Month"
        data1={monthlyStats?.data.newUsersThisMonth ?? 0}
        text2="New Posts This Month"
        data2={monthlyStats?.data.newPostsThisMonth ?? 0}/>
       
       <StatCard
       text1="New Comments This Month"
       data1={monthlyStats?.data.newCommentsThisMonth ?? 0}
       text2="New Premium Content This Month"
       data2={monthlyStats?.data.newPremiumContentThisMonth ?? 0}/>
      </div>
      <div>
        <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent py-5">
            Daily Stats
          </h1>
        <Line data={chartData} options={chartOptions} />
      </div>
    </CustomContainer>
    </div>
  )
}

export default AdminDashboard
