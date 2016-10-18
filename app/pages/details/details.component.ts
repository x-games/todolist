import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TodosListService } from "../../shared/todos/todos-list.service";

@Component({
    selector: "list",
    templateUrl: "pages/details/details.html",
    styleUrls: ["pages/details/details-common.css", "pages/details/details.css"],
    providers: [TodosListService]
})
export class DetailsComponent {

}