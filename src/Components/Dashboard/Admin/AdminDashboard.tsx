import Image from 'next/image'
import adminDashboard from '../../../../public/admin-dashboard.webp'
import { User } from '@/type';
import { useGetDailyStatsQuery, useGetMonthlyStatsQuery, useGetStatsOverviewQuery } from '@/lib/api/adminApi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const AdminDashboard = ({user}: {user: User}) => {
  const { data: overview, error: overviewError, isLoading: isOverviewLoading } = useGetStatsOverviewQuery();
  const { data: monthlyStats, error: monthlyError, isLoading: isMonthlyLoading } = useGetMonthlyStatsQuery();
  const { data: dailyStats, error: dailyError, isLoading: isDailyLoading } = useGetDailyStatsQuery({
    start: '2024-10-01',
    end: '2024-10-31',
  });

  if (isOverviewLoading || isMonthlyLoading || isDailyLoading) {
    return <div>Loading...</div>;
  }

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
      data: dailyUsers, // Y-axis data for new users
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Posts',
      data: dailyPosts, // Y-axis data for new posts
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Comments',
      data: dailyComments, // Y-axis data for new comments
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: true,
      tension: 0.1,
    },
    {
      label: 'New Premium Content',
      data: dailyPremiumContent, // Y-axis data for new premium content
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
    <div>
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
      

      <div>
        <h2>Overview</h2>
        <p>Total Users: {overview?.data.totalUsers}</p>
        <p>Total Posts: {overview?.data.totalPosts}</p>
        <p>Total Comments: {overview?.data.totalComments}</p>
        <p>Total Premium Content: {overview?.data.totalPremiumContent}</p>
      </div>
      <div>
        <h2>Monthly Stats</h2>
        <p>New Users This Month: {monthlyStats?.data.newUsersThisMonth}</p>
        <p>New Posts This Month: {monthlyStats?.data.newPostsThisMonth}</p>
        <p>New Comments This Month: {monthlyStats?.data.newCommentsThisMonth}</p>
        <p>New Premium Content This Month: {monthlyStats?.data.newPremiumContentThisMonth}</p>
      </div>
      <div>
        <h2>Daily Stats</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default AdminDashboard
