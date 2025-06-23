from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import List, Dict
from datetime import datetime, timedelta, timezone
from uuid import uuid4
import asyncio

app = FastAPI()

# --- Models ---


class User(BaseModel):
    id: str
    name: str


class TaskCreate(BaseModel):
    user_id: str
    task_type: str
    duration_ms: int


class Task(TaskCreate):
    id: str
    status: str = "Scheduled"
    createdAt: datetime

# --- In-memory DB ---


USERS: Dict[str, User] = {}
TASKS: Dict[str, Task] = {}
TASK_TYPE_COUNTER: Dict[str, int] = {"A": 0, "B": 0, "C": 0}
ALLOWED_TASK_TYPES = {"A", "B", "C"}

# --- Initialization ---


def init_users():
    USERS.clear()
    USERS["u1"] = User(id="u1", name="Alice")
    USERS["u2"] = User(id="u2", name="Bob")
    USERS["u3"] = User(id="u3", name="Carol")


init_users()

# --- Output Tracking ---

TASK_OUTPUTS: List[Dict] = []


async def run_task(task: Task):
    start_time = task.createdAt
    interval = task.duration_ms
    next_run = start_time.timestamp() + interval
    await asyncio.sleep(interval)
    while True:
        # end once task is canceled
        if task.status != "Scheduled":
            break
        now = datetime.now(timezone.utc)
        # Record output
        TASK_OUTPUTS.append({
            "timestamp": now.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3],
            "task_id": task.id,
            "output": task.task_type
        })
        next_run += interval
        await asyncio.sleep(interval)  # should put us close to the right time

# --- Endpoints ---


@app.post("/tasks/", response_model=Task)
async def create_task(payload: TaskCreate, background_tasks: BackgroundTasks):
    if payload.user_id not in USERS:
        raise HTTPException(status_code=404, detail="User not found")
    if payload.task_type not in ALLOWED_TASK_TYPES:
        raise HTTPException(status_code=400, detail="Invalid task type")
    TASK_TYPE_COUNTER[payload.task_type] += 1
    task_id = f"{payload.task_type}{TASK_TYPE_COUNTER[payload.task_type]}"
    now = datetime.now(timezone.utc)
    task = Task(
        id=task_id,
        user_id=payload.user_id,
        task_type=payload.task_type,
        duration_ms=payload.duration_ms,
        status="Scheduled",
        createdAt=now,
    )
    TASKS[task_id] = task
    background_tasks.add_task(run_task, task)
    return task


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return [
        {
            "id": task.id,
            "user_id": task.user_id,
            "task_type": task.task_type,
            "duration_ms": task.duration_ms,
            "status": task.status,
            "createdAt": task.createdAt,
        }
        for task in TASKS.values()
    ]


@app.get("/tasks/active", response_model=List[Task])
def get_active_tasks():
    now = datetime.now(timezone.utc)
    active = []
    for task in TASKS.values():
        if task.status == "Scheduled":
            elapsed = (now - task.createdAt).total_seconds() * 1000
            if elapsed < task.duration_ms:
                active.append(task)
    return active


@app.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: str):
    task = TASKS.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    now = datetime.now(timezone.utc)
    elapsed = (now - task.createdAt).total_seconds() * 1000
    if task.status != "Scheduled" or elapsed >= task.duration_ms:
        raise HTTPException(status_code=400, detail="Task is not running")
    task.status = "Cancelled"
    return


@app.get("/tasks/output")
def get_task_outputs():
    return TASK_OUTPUTS
