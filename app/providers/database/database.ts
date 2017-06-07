import { Injectable } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";

Injectable()
export class Database {

    private storage: any;
    private isInstantiated: boolean;

    public constructor() {
        if(!this.isInstantiated) {
            this.storage = new Couchbase("stock-ticker");
            this.storage.createView("stocks", "1", (document, emitter) => {
                emitter.emit(document._id, document);
            });
            this.isInstantiated = true;
        }
    }

    public getDatabase() {
        return this.storage;
    }
}