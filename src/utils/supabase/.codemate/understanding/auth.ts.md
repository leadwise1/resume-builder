# Supabase Authentication Module

This module provides functionalities for user authentication using Supabase in a JavaScript/TypeScript project. 

## Features

1. **Supabase Client Initialization**:
   - The module ensures the Supabase URL and Anon Key are loaded from environment variables and initializes the Supabase client.
   - Environment variables required:
     - `VITE_SUPABASE_URL`: Supabase project URL.
     - `VITE_SUPABASE_ANON_KEY`: Anonymous key for public access.

2. **User Interface**:
   - Defines a `User` interface to standardize the user object structure.

3. **API Methods**:
   - `getProfile()`: Fetches the authenticated user's profile from the `profiles` table using the user's session information.

4. **Auth Hook**:
   - Provides several authentication-related methods:
     - `signIn(email, password)`: Authenticates the user using email and password, retrieves the user profile, and returns the user and session data.
     - `signUp(email, password, name)`: Registers a new user, sets user metadata (name and avatar URL), retrieves the user profile, and returns the user and session data.
     - `signOut()`: Signs the user out of the current session.
     - `checkSession()`: Checks if there is an active user session.

## Usage

1. Add your Supabase URL and Anon Key to a `.env.local` file in the project's root directory:
   ```
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```

2. Import and use the functions from the module as needed in your application:
   ```javascript
   import { useAuth } from './path/to/authModule';

   const { signIn, signUp, signOut, checkSession } = useAuth();
   ```

3. Handle user authentication as appropriate for your application, e.g., in login forms, sign-up forms, etc.

This module simplifies the integration of Supabase authentication features and provides a clean interface for managing user sessions and profiles.