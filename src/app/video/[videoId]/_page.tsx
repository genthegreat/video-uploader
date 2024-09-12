// // app/video/[videoId]/page.tsx

// import { google } from 'googleapis';
// import { oauth2Client } from '@/utils/oauthClient';
// import { notFound } from 'next/navigation';

// const youtube = google.youtube({
//   version: 'v3',
//   auth: oauth2Client,
// });

// export async function generateMetadata({ params }: { params: { videoId: string } }) {
//   const { videoId } = params;

//   try {
//     const response = await youtube.videos.list({
//       part: 'snippet,contentDetails,statistics',
//       id: videoId,
//     });

//     const video = response.data.items?.[0] || null;

//     if (!video) {
//       return {
//         title: 'Video Not Found',
//       };
//     }

//     return {
//       title: video.snippet?.title || 'No Title',
//     };
//   } catch (error) {
//     console.error('Failed to fetch video:', error);
//     return {
//       title: 'Error',
//     };
//   }
// }

// const VideoPage = async ({ params }: { params: { videoId: string } }) => {
//   const { videoId } = params;

//   try {
//     const response = await youtube.videos.list({
//       part: 'snippet,contentDetails,statistics',
//       id: videoId,
//     });

//     const video = response.data.items?.[0] || null;

//     if (!video) {
//       notFound();
//       return;
//     }

//     return (
//       <div>
//         <h1>{video.snippet?.title || 'No Title'}</h1>
//         <p>{video.snippet?.description || 'No Description'}</p>
//         <p>Views: {video.statistics?.viewCount || 'N/A'}</p>
//         {/* Replace this video source with an appropriate video player or embed */}
//         <video controls>
//           <source src={`https://www.youtube.com/watch?v=${video.id}`} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     );
//   } catch (error) {
//     console.error('Failed to fetch video:', error);
//     return <div>Failed to fetch video details.</div>;
//   }
// };

// export default VideoPage;
