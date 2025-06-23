# iq-test

Make sure Zanzibar can merge.

## Schedulator service

### Operating instructions

From a command prompt:

1. cd into the project to the same directory as the service directory (not into the service directory).
2. Understand your Python environment and be sure to install Python dependencies.
3. Start the server using:

`uvicorn service.main:app --reload`

You can watch the action in the console.

### Improvement ideas

- Add logging.
- Set up as a service on Linux.
