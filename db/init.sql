-- Create databases only. Rails migrations and seeds own the schema and data.
-- The previous table/seed SQL here predates `expenses.date` and would leave
-- Docker first-boot with a schema Rails cannot query.
CREATE DATABASE IF NOT EXISTS expense_system_development
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE DATABASE IF NOT EXISTS expense_system_test
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

GRANT ALL PRIVILEGES ON expense_system_development.* TO 'expense_user'@'%';
GRANT ALL PRIVILEGES ON expense_system_test.* TO 'expense_user'@'%';
FLUSH PRIVILEGES;
