package com.example.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Override
    public Todo getTodo(Integer id) {
        return todoRepository.findById(id).orElse(null);
    }

    @Override
    public List<Todo> getTodos() {
        return (List<Todo>) todoRepository.findAll();
    }

    @Override
    public Todo postTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodoText(Integer id, String text) {
        Todo todo = getTodo(id);
        if(todo != null) {
            todo.setText(text);
            todoRepository.save(todo);
        }
        return todo;
    }

    @Override
    public Todo updateTodoDone(Integer id, Boolean done) {
        Todo todo = getTodo(id);
        if(todo != null) {
            todo.setDone(done);
            todoRepository.save(todo);
        }
        return todo;
    }

    @Override
    public Todo deleteTodo(Integer id) {
        Todo todo = getTodo(id);
        if(todo != null) {
            todoRepository.delete(todo);
        }
        return todo;
    }
}
