# Expense Tracker

A full-stack expense tracker for browsing monthly spending, grouping it by category, and recording new expenses.

The UI is a React + TypeScript app. The API is Rails 7.2. Both run together with Docker Compose.

## Features

- Monthly history with year and month navigation (reflected in the URL)
- Add, edit, and delete expenses
- Create categories with a preset emoji picker
- Collapsible category breakdown with totals and transaction counts
- Paginated expense list, newest dates first
- Future expense dates blocked in both the UI and the API
- Collapsible sidebar

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Backend | Ruby 3.3, Rails 7.2 (API-only) |
| Database | MySQL 8 |
| Tests | RSpec, RuboCop |
| Dev environment | Docker Compose |

## Project layout

```
.
├── frontend/          React + Vite app
├── backend/           Rails JSON API
├── db/init.sql        MySQL bootstrap
├── docker-compose.yml
└── README.md
```

## Quick start

### Docker (recommended)

```bash
git clone https://github.com/remi-9/likhait-technical-test.git
cd likhait-technical-test
docker compose up
```

The first start runs migrations and seeds sample expenses from January 2024 through today. Seeding can take a few minutes.

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api |
| Health check | http://localhost:3000/up |

Stop with `Ctrl+C`, or run `docker compose up -d` to start in the background.

### Manual setup

MySQL 8, Ruby 3.3.7, and Node 18+ are required.

**Backend**

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server
```

**Frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

The Vite app talks to the API at `http://localhost:3000`.

## Tests

```bash
cd backend
bundle exec rspec
bundle exec rubocop
```

With Docker:

```bash
docker compose exec backend bundle exec rspec
docker compose exec backend bundle exec rubocop
```

Frontend typecheck and production build:

```bash
cd frontend
npm run build
```

## API

All JSON endpoints live under `/api`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/categories` | List categories (alphabetical) |
| `POST` | `/api/categories` | Create a category (`name`, optional `emoji`) |
| `GET` | `/api/expenses` | List expenses; optional `year` and `month` filter by expense date |
| `POST` | `/api/expenses` | Create an expense |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |

Expense payloads use `description`, `amount`, `date`, and `category_id`. Dates cannot be in the future.

## Database

```bash
# Docker
docker compose exec backend rails db:migrate
docker compose exec backend rails db:reset
docker compose exec backend rails console

# Local
cd backend
rails db:migrate
rails db:reset
rails console
```

`db:reset` reloads schema and seed data.

## Environment

Development defaults are set in Docker Compose. For production, set:

```bash
DATABASE_HOST=your-db-host
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-password
RAILS_ENV=production
SECRET_KEY_BASE=$(rails secret)
```

## License

Apache License 2.0. See [LICENSE](LICENSE).
