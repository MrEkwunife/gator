# Gator 🐊

A command-line RSS feed aggregator built with TypeScript. Gator allows you to follow your favorite RSS feeds, automatically aggregate new posts, and browse them from your terminal.

## Features

- **User Management** - Register and login as different users
- **Feed Management** - Add, follow, and unfollow RSS feeds
- **Automatic Aggregation** - Continuously fetch new posts from all feeds at configurable intervals
- **Browse Posts** - View posts from feeds you follow directly in your terminal
- **Multi-user Support** - Multiple users can follow different feeds independently

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **RSS Parsing**: [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MrEkwunife/gator.git
   cd gator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a configuration file at `~/.gatorconfig.json`:

   ```json
   {
     "db_url": "postgresql://username:password@localhost:5432/gator"
   }
   ```

4. Run database migrations:

   ```bash
   npm run migrate
   ```

## Usage

Run commands using:

```bash
npm start -- <command> [arguments]
```

### Commands

#### User Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `register` | `<username>` | Create a new user and log in |
| `login` | `<username>` | Log in as an existing user |
| `users` | - | List all registered users |

#### Feed Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `addfeed` | `<name> <url>` | Add a new RSS feed (requires login) |
| `feeds` | - | List all available feeds |
| `follow` | `<url>` | Follow an existing feed (requires login) |
| `unfollow` | `<url>` | Unfollow a feed (requires login) |
| `following` | - | List feeds you're following (requires login) |

#### Aggregation & Browsing

| Command | Arguments | Description |
|---------|-----------|-------------|
| `agg` | `<interval>` | Start the feed aggregator (e.g., `1m`, `30s`, `1h`) |
| `browse` | `[limit]` | Browse posts from followed feeds (default: 2 posts) |

#### Admin Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `reset` | - | Reset the database (use with caution!) |

### Examples

```bash
# Register a new user
npm start -- register alice

# Add an RSS feed
npm start -- addfeed "Hacker News" "https://news.ycombinator.com/rss"

# Follow another feed
npm start -- follow "https://blog.golang.org/feed.atom"

# Start aggregating feeds every 5 minutes
npm start -- agg 5m

# Browse the latest 10 posts
npm start -- browse 10

# List all users
npm start -- users

# Switch to a different user
npm start -- login bob
```

## Development

### Generate new migrations

After modifying the schema in `src/lib/db/schema.ts`:

```bash
npm run generate
```

### Run migrations

```bash
npm run migrate
```

### Project Structure

```
src/
├── index.ts              # Entry point and command registration
├── config.ts             # Configuration management
├── types.ts              # TypeScript type definitions
├── command_handlers/     # Command implementations
│   ├── aggregate.ts      # Feed aggregation logic
│   ├── browse.ts         # Post browsing
│   ├── feeds.ts          # Feed management
│   ├── users.ts          # User management
│   ├── reset.ts          # Database reset
│   ├── middlewares.ts    # Authentication middleware
│   └── command_utils.ts  # Command registry utilities
└── lib/
    ├── rss.ts            # RSS feed fetching and parsing
    └── db/
        ├── index.ts      # Database connection
        ├── schema.ts     # Drizzle ORM schema
        ├── queries/      # Database query functions
        └── migrations/   # SQL migration files
```

## Configuration

Gator stores its configuration in `~/.gatorconfig.json`:

```json
{
  "db_url": "postgresql://user:password@host:port/database",
  "current_user_name": "alice"
}
```

- `db_url`: PostgreSQL connection string (required)
- `current_user_name`: Currently logged-in user (managed by the app)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
