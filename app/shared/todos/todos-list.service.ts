import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Todos } from "./todos";

@Injectable()
export class TodosListService {
    constructor(private http: Http) {}

    load() {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "Todos", {
            headers: headers
        })
            .map(res => res.json())
            .map(data => {
                let todosList = [];
                data.Result.forEach((todos) => {
                    todosList.push(new Todos(todos.Id, todos.Name, todos.Checked));
                });
                return todosList;
            })
            .catch(this.handleErrors);
    }
    add(name: string) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "Todos",
            JSON.stringify({ Name: name }),
            { headers: headers }
        )
            .map(res => res.json())
            .map(data => {
                return new Todos(data.Result.Id, name, false);
            })
            .catch(this.handleErrors);
    }
    delete(id: string) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");

        return this.http.delete(
            Config.apiUrl + "Todos/" + id,
            { headers: headers }
        )
            .map(res => {
                res.json();
            })
            .catch(this.handleErrors);
    }
    update(todos: Todos) {
        let headers = new Headers();
        todos.checked = !todos.checked;
        let zxc = todos.checked;
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");

        return this.http.put(
            Config.apiUrl + "Todos/" + todos.id,
            JSON.stringify({ Checked: zxc }),
            { headers: headers }
        )
            .map(res => {
                console.log(JSON.stringify(res));
                res.json();
            })
            .catch(this.handleErrors);
    }
    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}