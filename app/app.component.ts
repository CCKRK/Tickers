import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import * as Dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import "rxjs/Rx";
import { Database } from "./providers/database/database";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

    public stocks: Array<any>;

    public constructor(private http: Http, private database: Database) {
        this.stocks = [];
    }

    public ngOnInit() {
        let rows = this.database.getDatabase().executeQuery("stocks");
        for(let i = 0; i < rows.length; i++) {
            this.stocks.push(rows[i]);
        }
    }

    public addTicker() {
        let options = {
            title: "Ticker Symbol",
            okButtonText: "Add",
            cancelButtonText: "Cancel",
            inputType: Dialogs.inputType.text
        };
        Dialogs.prompt(options).then((result: Dialogs.PromptResult) => {
            this.getQuote(result.text);
        });
    }

    public getQuote(ticker: string) {
        this.http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + ticker)
            .map(result => JSON.parse(result.json()))
            .do(result => console.log("RESULT: ", JSON.stringify(result)))
            .subscribe(result => {
                this.database.getDatabase().createDocument(result, result.Symbol);
                this.stocks.push(result);
            }, error => {
                console.log("ERROR: ", error);
            });
    }

}