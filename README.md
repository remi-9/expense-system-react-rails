# Expense System

A full-stack expense tracker with a monthly history view, category breakdown, and a Rails JSON API.

Users can add, edit, and delete expenses, create categories (with an emoji), and browse spending by month and year.

## Features

- Monthly expense history with year/month navigation
- Add, edit, and delete expenses
- Dynamic categories with a preset emoji picker
- Category spending breakdown for the selected month
- Expenses ordered by date (newest first)
- Future expense dates blocked in both the UI and API

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Backend | Ruby 3.3, Rails 7.2 (API) |
| Database | MySQL 8 |
| Tests | RSpec, RuboCop |
| Dev environment | Docker Compose |

## Quick start

### Docker (recommended)

```bash
git clone <repo-url>
cd expense-system-react-rails
docker compose up
```

The first start runs migrations and seeds sample data. Seeding can take a few minutes.

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api |

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

The Vite app expects the API at `http://localhost:3000`.

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
