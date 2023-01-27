package com.example.todo;

import java.util.List;

public interface TodoService {
    Todo getTodo(Integer id);
    List<Todo> getTodos();
    Todo postTodo(Todo todo);
    Todo updateTodoText(Integer id, String text);
    Todo updateTodoDone(Integer id, Boolean done);
    Todo deleteTodo(Integer id);
}
