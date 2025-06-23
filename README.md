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

1. cd into the project directory. You will find this README.md file, plus two directories: client and service.
2. Understand your Python environment and be sure to install Python dependencies. You might want to install a virtual environment (see Python documentation).
3. Install the dependencies: `pip install -r requirements.txt`
4. Start the server using: `uvicorn service.main:app --reload`

The service should start and listen on port 8000. Now you can watch the action in the console.

When you want to stop the service, press Ctrl+C in the console.

### Improvement ideas

- Add logging.
- Set up as a service on Linux.

## Schedule an Event app

This is a NextJS app. Left the scaffolding in place, and created a new page for the assignment.

The app is configured for npm. Be sure to install everything first.

Execute the following on a command line.

```
cd client/scheduler
npm i
npm run dev
```

That should get things going locally at port 3000. You can load the page at:

`http://localhost:3000/schedule`

If the client starts on a different port, you may have more than one instance running. No worries. Just use whatever port you see in the console (e.g., 3001).

If you want scheduling to work, the service needs to be running locally and listening at port 8000. (This is the default if you follow the instructions for the service above.)

Enjoy scheduling Nirvana!
