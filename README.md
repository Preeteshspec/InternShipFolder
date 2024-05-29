# Real-time Bidding Platform

## Requirements
- Node.js
- PostgreSQL
- Docker (optional)

## Setup
1. Clone the repository
    ```sh
    git clone 
    cd real-time-bidding
    ```

2. Install dependencies
    ```sh
    npm install
    ```

3. Set up the environment variables in a `.env` file
    ```env
    DATABASE_URL=postgres://username:password@localhost:5432/real_time_bidding
    JWT_SECRET=your_jwt_secret
    ```

4. Run database migrations
    ```sh
    npx sequelize-cli db:migrate
    ```

5. Start the application
    ```sh
    npm start
    ```

6. (Optional) Run with Docker
    ```sh
    docker-compose up --build
    ```

## Running Tests
```sh
npm test
