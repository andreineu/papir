# Demos

https://papir.space

![editor suggestion preview](https://github.com/andreineu/papir/assets/91819279/a1aa898a-67a6-4fe3-be97-bdbca689e61c)
![star-preview](https://github.com/andreineu/papir/assets/91819279/aaa9f7c3-b9d2-46ee-880c-d9ddf1fdfff0)


# Technologies
mainly [T3 Stack](https://create.t3.gg/)
- TypeScript, NextJS, TRPC, Tailwind
- Prisma, postgres
- tiptap for wysiwyg
- Vitest for testing
- Radix UI/shadcn-ui
- Docker for local development

# How to run locally

## Dev server

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

## Production build

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

## Storybook

1. ```sh
   npm run storybook
   ```
