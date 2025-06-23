# iq-test

These are the operating instructions for Task Scheduler, a handy way to schedule and run recurring tasks. This app allows a user to:

- Add any of the known types of tasks, providing an interval at which to administer the task.
- See a list of active tasks.
- Cancel an active task.
- See the output of all tasks to date.

## Schedulator service

These instructions assume familiarity with Python and ReactJS. Feel free to contact us if you need additional help to get things running.

### Source

This source is available on GitHub at: https://github.com/blueisgreen/iq-test.git

Begin by cloning the source into a local directory. For now, everything will run locally.

### Operating instructions

From a command prompt:

1. cd into the project directory. You will find this README.md file, plus two directories: client and service. Do the following steps in this directory.
2. Understand your Python environment and install dependencies.

- You might want to install a virtual environment (see Python documentation).
- Install the dependencies using: `pip install -r requirements.txt`

3. Start the server using: `uvicorn service.main:app --reload`

The service should start and listen on port 8000. Now you can watch the action in the console.

When you want to stop the service, press Ctrl+C in the console.

### Improvement ideas

- Document the API.
- Add logging.
- Set up as a service on Linux.

## Schedule an Event app

This is a NextJS app. For this exercise, we left the scaffolding in place, and created new pages.

The app is configured for npm. Starting from the project directory, follow these instructions to install and run the app.

```
cd client/scheduler
npm i
npm run dev
```

That should get things going locally at port 3000. You can load the page at:

`http://localhost:3000/schedule`

If the client starts on a port other than 3000, the app (or another app) may already be running. No worries. Just use whatever port you see in the console (e.g., 3001).

Of course, the service needs to be running at port 8000 (the default) for this to work as expected.

Enjoy scheduling Nirvana!
