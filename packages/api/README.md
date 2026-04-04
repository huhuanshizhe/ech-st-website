# ECH-ST Electrics API

FastAPI backend for ECH-ST website.

## Requirements

- Python 3.11+
- PostgreSQL (production) or SQLite (development)

## Environment Variables

```env
DATABASE_TYPE=postgres
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-key-change-this
```

## Run

```bash
pip install -r requirements.txt
python main.py
```

## API Documentation

- Swagger UI: `/docs`
- ReDoc: `/redoc`