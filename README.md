## How to run locally

### Dev server

1. ```sh
   npm install
   ```
1. set `.env` using `.env.example` as template
1. ```sh
   docker compose up -d
   ```
1. ```sh
   npm run dev
   ```

### Production build

1. ```sh
   npm install
   ```
1. set `.env` using `.env.example` as template
1. ```sh
   npm build
   ```
1. ```sh
   npm start
   ```

## Testing

### Integration testing

1. set `.env.test.local` using `.env.example` as template
1. ```sh
   npm run test:int # or npm run test:int:ui
   ```

### Unit testing

1. set `.env.test.local` using `.env.example` as template
1. ```sh
   npm run test:unit # or npm run test:unit:ui
   ```
