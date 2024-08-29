

#  DevSync

This application allows multiple users to collaboratively write and edit code in real-time, leveraging the power of WebSockets. Users can sign up or log in with a unique username, create or join rooms with unique room IDs, and interact with other users through real-time chat and code editing. Each room supports multiple users who can collaboratively write code, select the programming language, submit their code for execution, and view the results together. The backend handles code execution using the Judge0 API and Redis for task queuing and pub/sub functionality. This makes CCE an ideal platform for collaborative coding sessions, educational environments, and coding competitions.

## 🌟 Features
- **User Authentication**: Sign up and log in with unique usernames.
- **Room Management**: Create or join rooms with unique IDs.
- **Real-time Collaboration**: Code and chat in real-time with other users in the room.
- **Multi-language support**: Choose the programming language for your code, supports 4 languages (python,javascript,java,c++)
-  **Code Submission and Execution**: Submit code and view results using the Judge0 API.
- **Real-time Updates**: Automatic updates for code changes, language selection, user activity, and chat messages.

## 🛠️ Tech Stack
- **Frontend**: Vite, React, TypeScript
- **Backend**: Express, HTTP for WebSockets, MongoDB
- **Queue and Pub/Sub System**: Redis



### Docker Setup
1. **Navigate to the root directory**:
    ```sh
    cd path/to/DevSync
    ```

2. **Create a `.env` file** in each folder and configure your environment variables: (Refer the .env.example file)
    ```env
    # Example Client .env file
	    VITE_REACT_APP_SERVER_URL =
    # Example Server .env file
	    MONGO_URL =
        REDIS_URL = 
	# Example Worker .env file
		//judge0 api key
		X_RAPID_API_KEY = 
        REDIS_URL =

3. **Build and run the stack of containers**:
    ```sh
    docker-compose up --build
    ```

### Troubleshooting
- If you encounter an issue with `bcrypt` related to an invalid ELF header, perform the following steps:
    ```sh
    # Enter the server container using bin/bash
    docker exec -it server_container_name /bin/bash

    # Inside the container, reinstall bcrypt
    npm install bcrypt
    ```