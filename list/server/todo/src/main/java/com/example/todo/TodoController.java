package com.example.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping("/todo")
    public List<Todo> getTodos() {
        return todoService.getTodos();
    }
    @PostMapping("/todo")
    public Todo postTodo(@RequestBody Todo todo) {
        return todoService.postTodo(todo);
    }
    @PutMapping("/todo/{id}/text/{text}")
    public Todo updateTodoText(@PathVariable Integer id, @PathVariable String text) {
        return todoService.updateTodoText(id, text);
    }
    @PutMapping("/todo/{id}/done/{done}")
    public Todo updateTodoDone(@PathVariable Integer id, @PathVariable Boolean done) {
        return todoService.updateTodoDone(id, done);
    }
    @DeleteMapping("/todo/{id}")
    public Todo deleteTodo(@PathVariable Integer id) {
        return todoService.deleteTodo(id);
    }
}
