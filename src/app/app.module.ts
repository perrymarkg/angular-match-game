import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { ConfigService } from './services/config.service';
import { ScoreService } from './services/score.service';
import { BlockLinkComponent } from './block/block-link/blocklink.component';
import { StatComponent } from './stats/stat.component';
import { PlayAgainComponent } from './modal/playagain/playagain.component';
import { ScoreboardComponent } from './modal/scoreboard/scoreboard.component';
import { ScoretableComponent } from './modal/scoreboard/scoretable/scoretable.component';

import { AngularFireModule } from 'angularfire2';
import { env } from './env';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DbService } from './services/db.service';


@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    BlockLinkComponent,
    StatComponent,
    PlayAgainComponent,
    ScoreboardComponent,
    ScoretableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [ConfigService, ScoreService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
