# Gardenia

## Introduction

Gardenia is a comprehensive full-stack web application designed for gardening enthusiasts and professionals to share, discover, and engage with gardening knowledge. It provides insightful tips, plant care advice, seasonal guides, and techniques to enhance gardening experiences. Users can contribute by sharing their gardening knowledge, interacting with others, and exploring premium content through a seamless payment integration.

## Project Description

Gardenia aims to foster a vibrant gardening community where users can post gardening advice, upvote content, comment, follow other users, and share their gardening experiences. The platform is equipped with a rich text editor for content creation, user authentication, premium content access via payments, and various social interaction tools. Users can discover the most popular content and access exclusive premium gardening guides by verified experts. Additionally, the platform integrates payments with Aamarpay and Stripe to manage premium content access, making it a rich interactive community platform for gardening enthusiasts.

## Features

- User Authentication: Secure login, registration, and profile management with JWT-based authentication.
- User Profile: Manage personal profiles, posts, followers, and follow other users. Verified users get access to premium content.
- Post Creation & Editing: Rich text editor with support for multimedia content (images, videos).
- Content Categories: Posts categorized under topics like Vegetables, Flowers, Landscaping, etc.
- Social Interaction: Comment, upvote, downvote, and favorite posts.
- News Feed: Dynamic feed with infinite scrolling, search, and filter functionality.
- Payment Integration: Payments for premium content through Aamarpay or Stripe.
- Admin Dashboard: Manage users, posts, payments, and community moderation.
- Advanced Search: Filter content by category, popularity, and other parameters.
- Following System: Follow users and view their posts in the news feed.
- Micro Animations: Smooth transitions and hover effects to enhance user experience.


## Technology Stack

### Frontend:

- Next.js
- TypeScript
- TailwindCSS
- React
- Redux Toolkit for state management
- Framer Motion for animations
- Axios for API calls
- Quill as a rich text editor
- Stripe for payment integration
- Chart.js for data visualization

### Backend:
- Node.js
- Express
- MongoDB for database
- Mongoose for object data modeling
- JWT for authentication
- Zod for schema validation
- Cloudinary for image upload
- Multer for handling file uploads
- Stripe and Aamarpay for payment processing
- Nodemailer for sending emails

##  Installation Guidelines

### Prerequisites:
- Node.js (version 16.x or higher)
- MongoDB (for the database)
- Stripe or Aamarpay API keys (for payment processing)
- Cloudinary account (for image hosting)

## Installation Steps:

1. Clone the repository:

```javascript
https://github.com/enayetsyl/gardenia-fe.git
https://github.com/enayetsyl/gardenia-be.git
```

2. Install frontend dependencies:

```javascript
cd gardenia-fe
npm install
```

3. Install backend dependencies:

```javascript
cd gardenia-be
npm install
```

4. Set up frontend environment variables:  

```javascript
NEXT_PUBLIC_BASE_API="http://localhost:5000/api/v1"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
JWT_SECRET=your_jwt_secret
```

5. Set up backend environment variables:  

```javascript
PORT=5000
database_url=your_mongodb_uri
NODE_ENV='development'
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
bcrypt_salt_rounds=10
jwt_access_secret=your_jwt_access_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=1d
RESET_PASS_UI_LINK=http://localhost:3000
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
NEXT_PAYMENT_GATEWAY_PUBLIC_KEY=your_next_payment_gateway_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

6. Run the frontend and backend server:

```javascript
cd gardenia-fe
npm run dev

cd gardenia-be
npm run start:dev
```

## Live Links
- Frontend: Live Frontend URL(https://gardenia-fe.vercel.app/)
- Backend: Live Backend URL(https://gardenia-be.onrender.com/)


## GitHub Link
- Frontend: [GitHub Repository](https://github.com/enayetsyl/gardenia-fe.git)
- Backend: [GitHub Repository](https://github.com/enayetsyl/gardenia-be.git)


##Contact Information
For any inquiries, feel free to reach out via:

- Email: enayetflweb@gmail.com
- LinkedIn: [Md Enayetur Rahman](https://www.linkedin.com/in/md-enayetur-rahman/)
- Twitter: [Md Enayetur Rahman](https://x.com/enayetu_syl)

## Conclusion

Gardenia offers an all-in-one platform for gardening enthusiasts, combining useful gardening tips with a rich community-driven experience. From novice gardeners to seasoned professionals, the platform brings people together to share knowledge and improve gardening skills. Whether you're looking for quick tips, seasonal guides, or expert advice, Gardenia has something for everyone!