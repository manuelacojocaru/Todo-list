import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: any = [];
  async addTodo(text: string) {
    const todo = { text: text, done: false };
    const raw = await fetch('http://localhost:8081/todo', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.fetchData();
  }
  async fetchData() {
    const raw = await fetch('http://localhost:8081/todo');
    this.todos = await raw.json();
    console.log(this.todos);
  }
  async toggleDone(id: Number, done: Boolean) {
    await fetch(`http://localhost:8081/todo/${id}/done/${done}`, {
      method: 'PUT',
    });
    this.fetchData();
  }
  async editText(todoText: HTMLElement) {
    console.log(todoText);
    todoText.setAttribute('contenteditable', 'true');
    todoText.classList.add('border');
  }
  async keyDown(e: any, id: Number) {
    const isValidShortcut = e.ctrlKey && e.keyCode != 86;

    const isValidKeyCode = [8, 16, 17, 37, 38, 39, 40, 46].includes(e.keyCode);
    const maxLength = parseInt(e.srcElement.getAttribute('maxlength'));
    const text = e.srcElement.innerText;
    console.log(text);
    if (text.length >= maxLength && !isValidKeyCode && !isValidShortcut) {
      e.preventDefault();
    }

    if (e.keyCode === 13) {
      e.target.classList.remove('border');
      e.target.setAttribute('contenteditable', 'false');
      const text = e.target.textContent;
      await fetch(`http://localhost:8081/todo/${id}/text/${text}`, {
        method: 'PUT',
      });
      e.preventDefault();
      this.fetchData();
    }
  }
  async deleteTodo(id: Number) {
    await fetch(`http://localhost:8081/todo/${id}`, {
      method: 'DELETE',
    });
    this.fetchData();
  }
  ngOnInit() {
    this.fetchData();
  }
}
