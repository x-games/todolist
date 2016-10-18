import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { DetailsComponent } from "./pages/details/details.component";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "list", component: ListComponent },
    { path: "details", component: DetailsComponent }
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
    DetailsComponent
];