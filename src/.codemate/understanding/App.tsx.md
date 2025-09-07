# LeadWise Foundation App - High-Level Documentation

## Overview
The LeadWise Foundation App is a React-based application designed to help users create AI-powered resumes, match with job opportunities, and get feedback on their resumes. The application leverages modern technologies and libraries for state management, animations, and user authentication.

### Main Features:
1. **Responsive Navigation**: Both desktop and mobile navigation menus with smooth scrolling to sections.
2. **AI Resume Building**: Users can build resumes with the help of AI suggestions and a variety of templates.
3. **User Authentication**: Sign-up, sign-in, and session management using Supabase.
4. **Interactive Sections**: Features sections like testimonials, FAQs, and an AI Chatbot for user assistance.
5. **Dynamic Content**: Periodically updated content including testimonials and features.

## Components and State Management
- **App Component**: The main wrapper component managing global states and rendering other components.
- **Navigation**: Sticky navigation bar with dynamic content rendering based on user authentication state.
- **Hero Section**: Introductory section with call-to-action buttons.
- **Features Sections**: Presenting what the app offers and detailed explanations.
- **Templates Display**: Showcasing different resume templates.
- **Testimonials**: User feedback showcased on a rotating basis.
- **FAQs**: Frequently asked questions with collapsible answers.
- **Footer**: Footer section with links and social media icons.

### State Variables:
- `isMenuOpen`: Controls the visibility of the mobile menu.
- `activeTestimonial`: Manages which testimonial is currently displayed.
- `openFAQ`: Index of the currently opened FAQ.
- `isScrolled`: Tracks if the page has been scrolled past a certain point.
- `isChatOpen`: Controls the visibility of the chat widget.
- `isAuthModalOpen`: Manages the visibility of the authentication modal.
- `authModalTab`: Tracks which tab (sign-in or sign-up) should be open in the authentication modal.
- `user`: Holds the current authenticated user’s details.
- `isLoadingAuth`: Represents the authentication loading state.

### Key Libraries and Technologies:
- **React**: For building the user interface.
- **Framer Motion**: For animations and transitions.
- **Supabase**: For user authentication and session management.
- **Lucide React**, **Hero Icons**: For icons.
- **TailwindCSS**: For styling.

### Authentication Flow:
1. On component mount, it checks if a session exists.
2. If a session is found, it retrieves and sets the user’s profile.
3. Authentication states handle sign-in, sign-up, and sign-out processes.

### Navigation and Scroll:
- Smooth scrolling is implemented for navigation to different sections.
- The navigation bar changes appearance when the user scrolls.

### Interaction:
- Features like an AI-writing assistant, job matching algorithm, and interactive templates provide dynamic user experiences.
- Users can like or dislike testimonials.

### User Interface:
- The layout is designed to be visually appealing with animations and smooth transitions.
- TailwindCSS is used to ensure responsiveness and theming.

### Additional Features:
- **Auth Modal**: A modal for handling user authentication.
- **Chat Widget**: A placeholder chat feature to assist users.
- **Dynamic Testimonial Rotation**: Automatically changes displayed testimonials every 5 seconds.

This documentation provides a high-level overview of the application, encapsulating its core components, state management, key features, and user interactions.