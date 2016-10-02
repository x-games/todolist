import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { Todos } from "../../shared/todos/todos";
import { TodosListService } from "../../shared/todos/todos-list.service";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: "list",
    templateUrl: "pages/list/list.html",
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [TodosListService]
})
export class ListComponent implements OnInit {
    constructor(private todosListService: TodosListService) {}
    todosList: Array<Todos> = [];
    todos = "";
    isLoading = false;
    listLoaded = false;
    @ViewChild("todosTextField") todosTextField: ElementRef;

    ngOnInit() {
        this.isLoading = true;
        this.todosListService.load()
            .subscribe(loadedTodos => {
                loadedTodos.forEach((todosObject) => {
                    this.todosList.unshift(todosObject);
                });
                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    share() {
        let list = [];
        for (let i = 0, size = this.todosList.length; i < size ; i++) {
            list.push(this.todosList[i].name);
        }
        let listString = list.join(", ").trim();
        SocialShare.shareText(listString);
    }

    add() {
        if (this.todos.trim() === "") {
            alert("Enter a todo item");
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.todosTextField.nativeElement;
        textField.dismissSoftInput();

        this.todosListService.add(this.todos)
            .subscribe(
                todosObject => {
                    this.todosList.unshift(todosObject);
                    this.todos = "";
                },
                () => {
                    alert({
                        message: "An error occurred while adding an item to your list.",
                        okButtonText: "OK"
                    });
                    this.todos = "";
                }
            )
    }
}