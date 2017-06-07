// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { Database } from "./providers/database/database";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule
    ],
    providers: [Database]
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
