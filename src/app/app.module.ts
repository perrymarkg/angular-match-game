import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { ConfigService } from './services/config.service';
import { ClickService } from './services/click.service';
import { BlockLinkComponent } from './block/block-link/blocklink.component';
import { StatComponent } from './stats/stat.component';


@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    BlockLinkComponent,
    StatComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ConfigService, ClickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
