# Notion Table View and Filters

![cover](https://i.imgur.com/HH3jGQp.png)

## Description

This project uses `@tanstack/react-table` to build a mega example with many features in one place:

- [x] Column sorting
- [x] Column resizing
- [x] Column reordering
- [x] Filters
- [x] Skeleton loading
- [x] Responsive design
- [ ] Row selection
- [ ] Row expand
- [ ] Pagination

Using Notion API as example backend, `@dnd-kit` for column reordering.

## Why build this project?

Because its easier to remove features already working than adding them. `@tanstack/react-table` is a wonderful library but notorious for its steep learning curve and lack luster docs. Use this project as a starting point if you want to learn while implementing it.

## Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run start
   ```

4. To run in Docker:
   ```bash
   docker build -t notion-table-view .
   docker run -p 3000:3000 notion-table-view
   ```

## Usage

Set your Notion API key in a `.env` file:

```
NOTION_SECRET=your-secret-api-key
NOTION_DATABASE_ID=your-database-id
```

## Improvements

- Use server actions to handle the API calls. Currently the MVP uses client side to fetch data. It will require to pass filters and sorts objects through url params to the server. However this will scale much better and works faster with larger database.
- Use @tanstack/react-query to handle the data fetching and caching.
- In order to build an integration that works with any database a user picks, and to remain flexible as the user's chosen database inevitably changes in the future, use the Retrieve a database endpoint. Your integration can call this endpoint to get a current database schema, and then create the properties parameter in code based on that schema. [https://developers.notion.com/docs/working-with-databases]

## License

MIT
