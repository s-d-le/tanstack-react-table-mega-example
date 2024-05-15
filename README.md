# Notion Table View and Filters

## Description

This project implements a Notion table view with sorting, rearrangement, resizing, and filtering capabilities using the Notion API.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notion-table-view.git
   cd notion-table-view
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
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

## Features

- Table view for Notion databases
- Column sorting, rearrangement, and resizing
- Filtering with various property types and compound conditions

## License

MIT
