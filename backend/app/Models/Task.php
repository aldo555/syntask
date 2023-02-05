<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Tags\HasTags;

class Task extends Model
{
    use HasFactory, HasTags;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'completed',
        'priority',
        'due_date',
    ];

    public function scopeWhereArchived($query) {
        return $query->where('completed', true);
    }

    public function scopeWhereOngoing($query) {
        return $query->where('completed', false);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function scopeFilter($query, array $filters) {
        $filters['priority'] = is_numeric($filters['priority']) ? $filters['priority'] + 1  : null;
        $filters['tags'] = count($filters['tags']) ? $filters['tags'] : null;

        $query->when($filters['title'] ?? null, function ($query, $title) {
            $query->where(function ($query) use ($title) {
                $query->where('title', 'like', '%'.$title.'%');
            });
        })->when($filters['priority'], function ($query, $priority) {
            $query->where('priority', $priority - 1);
        })->when($filters['due_date'] ?? null, function ($query, $due_date) {
            $query->where('due_date', $due_date);
        })->when($filters['tags'], function ($query, $tags) {
            $query->withAnyTags($tags);
        });
    }
}
