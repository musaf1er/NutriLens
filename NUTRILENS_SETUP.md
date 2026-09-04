# NutriLens MVP setup

The existing root Next.js prototype is preserved. The MVP implementation is in `laravel-app/`; the classifier is in `ai-service/`.

## Dependency audit

### PHP / Laravel

- PHP 8.3 or newer, with `openssl`, `mbstring`, `fileinfo`, `xml`, `tokenizer`, `pdo_mysql`, and `curl` enabled.
- Composer 2.x.
- Laravel 13.17 and Laravel Tinker, installed by `laravel-app/composer.json`.
- No authentication package: the app uses Laravel session authentication in `AuthController`.
- Laravel's built-in HTTP client is used for FastAPI calls; no extra HTTP package is needed.

### Node / frontend

- No Node runtime is needed to run the MVP. Bootstrap is loaded from its CDN in the Blade layout, so no npm Bootstrap package is required.
- The generated Laravel Vite/Tailwind package files are scaffold leftovers and are not required by the Bootstrap pages.

### Python

- Python 3.11+ and pip are required for `ai-service`.
- `fastapi`, `uvicorn[standard]`, `python-multipart`, `Pillow`, `torch`, and `torchvision` are pinned in `ai-service/requirements.txt`.
- A trained TorchScript Food-101-compatible model and its labels JSON are required. They are not included because model weights are large and project-specific.

### System services

- MySQL 8 or XAMPP MySQL, plus PHP's `pdo_mysql` extension.
- Python and pip for the AI service.
- Node/npm are only needed if the untouched root Next.js prototype is also run.

## Local run

From a clean terminal:

```powershell
cd "e:\Calories Tracker\laravel-app"
copy .env.example .env
php artisan key:generate
```

Create the database in MySQL or XAMPP:

```sql
CREATE DATABASE nutrilens CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Set `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and `AI_SERVICE_URL` in `laravel-app/.env`, then run:

```powershell
php artisan migrate
php artisan db:seed
php artisan storage:link
php artisan serve
```

In a second terminal, after installing Python:

```powershell
cd "e:\Calories Tracker\ai-service"
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

Set `FOOD_MODEL_PATH` and `FOOD_LABELS_PATH` to a TorchScript Food-101 model and a JSON index-to-label map before testing classification. Without model files the endpoint intentionally returns a clear 503 response.

## Flow test

Register, log in, upload a JPG/PNG under 5 MB, analyze it, enter a positive portion in grams, save the result, inspect History, delete only your own record, and log out. Use `php artisan route:list`, `php artisan test`, and `python -m compileall ai-service` for checks.