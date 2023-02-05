<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse {
        $ongoingTasks = $request->user()->tasks()->with('tags')->whereOngoing()->latest()->get();
        $archivedTasks = $request->user()->tasks()->with('tags')->whereArchived()->latest()->limit(10)->get();

        return response()->json([
            'ongoing_tasks' => $ongoingTasks,
            'archived_tasks' => $archivedTasks,
        ], 200);
    }

    public function search(Request $request): \Illuminate\Http\JsonResponse {
        $ongoingTasks = $request->user()->tasks()->with('tags')->whereOngoing()->filter($request->only('title', 'priority', 'due_date', 'tags'))->latest()->get();
        $archivedTasks = $request->user()->tasks()->with('tags')->whereArchived()->filter($request->only('title', 'priority', 'due_date', 'tags'))->latest()->get();

        return response()->json([
            'ongoing_tasks' => $ongoingTasks,
            'archived_tasks' => $archivedTasks,
        ], 200);
    }

    public function create(CreateTaskRequest $request): \Illuminate\Http\JsonResponse {
        $task = $request->user()->tasks()->create($request->only('title', 'priority', 'due_date'));

        $task->attachTags($request->tags);

        return response()->json([
            'message' => 'Task created, enjoy the added stress!',
            'task' => $task->load('tags'),
        ], 200);
    }

    public function update(UpdateTaskRequest $request, Task $task): \Illuminate\Http\JsonResponse {
        $task->update($request->only('title', 'priority', 'due_date', 'completed'));

        $task->syncTags($request->tags);

        $message = $request->completed ? 'Another task completed, might as well get a trophy for your shelf.' : 'Task updated. You\'re killing it!';

        return response()->json([
            'message' => $message,
            'task' => $task->load('tags'),
        ], 200);
    }

    public function delete(Task $task): \Illuminate\Http\JsonResponse {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted. Hope it had a good run.',
        ], 200);
    }

    public function deleteAll(Request $request): \Illuminate\Http\JsonResponse {
        $request->user()->tasks()->delete();

        return response()->json([
            'message' => 'You\'ve successfully deleted all your responsibilities. Congrats?',
        ], 200);
    }
}
