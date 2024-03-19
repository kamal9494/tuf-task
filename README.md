# TUF Full-Stack Task

## Tech Stack
- **Frontend:** React.js with TailwindCSS and React-Router DOM v6 for routing.
- **Backend:** Express.js
- **Database:** MySQL
- **Caching:** Redis
- **External Service:** Judge0

## Demo URL

Frontend: [https://task-tuf.vercel.app](https://task-tuf.vercel.app/)

Backend: [https://tuf-task-backend-iota.vercel.app/](https://tuf-task-backend-iota.vercel.app/)

## Features Overview

- Created two pages as mentioned in task description :
    1. `/` to gather information from the user, like code, username, stdin, and language.
    2. `/submissions` to display all submitted entries in a tabular format.
  <br />
- **API Endpoints:** Developed API endpoints using Express.js
  - `/submit` POST Method for submitting entries and storing in database.
  - `/submissions` GET Method for fetching all submissions.
  - `/compile` POST Method for compiling code and retrieving output.
  <br />
- Created a responsive design to ensure compatibility across various devices.
- Implemented a limit to display only the initial 100 characters of the source code to improve readability on page 2.
  <br />
- **Error Handling:** Implemented error handling for few cases:
  - If there is any compilation error in the user's code after submission, an error message will be displayed in place of the output on page 2.
- **Bonus Tasks Implemented:**
  - **Redis Caching:** Used Redis for caching submitted entries, reducing the number of database read requests and improving performance.
  - **Judge0 API:** Utilized Judge0 API to get output of the code and stored in a new column for each submission.
  <br />
- Both frontend and backend is deployed in vercel.

## Extra Work
- **Compile Option:** Added a compile option on the first page to compile code and display output immediately, enhancing user experience and debugging capabilities.

*Note : I used FREE API Service from Judge0 which has a `Rate Limit of 50 calls PER day`.*

## Preview

### Page 1
![image](https://github.com/kamal9494/tuf-task/assets/97849725/18d8d153-4a55-4ffb-8f41-018e4b69ed92)

### Page 2
![image](https://github.com/kamal9494/tuf-task/assets/97849725/26cb38f2-e18b-4fbb-93f8-180930114db1)

## Architecture Diagram
![image](https://github.com/kamal9494/tuf-task/assets/97849725/04214671-21da-49f6-9245-b257e1fc76f1)



