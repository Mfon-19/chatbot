# Chatbot Web App

A real-time chatbot web application built with Next.js, TypeScript, PostgreSQL, and the Gemini API. Users can interact with the chatbot without authentication, but authenticated users (via Google OAuth) can save their chat history, stored in a Neon Serverless PostgreSQL database.

## Features

- **Real-time Chat**: Streamed bot responses using the Gemini API for a seamless user experience.
- **Authentication**: Google OAuth integration to enable chat history saving for authenticated users.
- **Database Persistence**: Stores chat history in a PostgreSQL database hosted on Neon Serverless.
- **Guest Mode**: Users can interact with the chatbot without authentication.
- **Modern UI**: Built with Shadcn components for a smooth and responsive interface.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Shadcn/ui, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: Google OAuth
- **AI Integration**: Gemini API

## Setup & Installation

### Prerequisites

- Node.js&#x20;
- PostgreSQL database&#x20;
- API key for the Gemini API
- Google OAuth credentials

### Installation Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/Mfon-19/chatbot.git
   cd chatbot
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_postgresql_database_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`

## Usage

- Type a message into the input field and click send.
- Responses from the chatbot will be streamed in real time.
- Authenticate via Google to save your chat history.

## Future Enhancements

- Implement user-specific chatbot settings and preferences.
- Add support for multiple AI models.
- Implement file upload functionality

## Contact

For any questions or contributions, feel free to reach out or open an issue on GitHub!

