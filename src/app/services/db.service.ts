import { Injectable, EventEmitter } from "@angular/core";

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DbService {

    tableChangedEmitter = new EventEmitter<boolean>();

    private scoreTable = 'score-6';

    constructor(
        private db: AngularFireDatabase,
        private af: AngularFireAuth
    ){
        this.af.authState.subscribe( d => {
            if( d ){
                
            }
            else {
                this.af.auth.signInAnonymously().catch( r => {
                
                })
            }
        })
    }

    addScore(name: string, moves: number, time: number, size: number){
        const list = this.db.list('score-' + size);
        list.push({'name': name, 'moves':moves, 'time':time, 'date': new Date().getTime()});
    }

    getScore(){        
        
        const list = this.db.list(this.getScoreTable());
        return list;
    }

    setScoreTable(size: number){
        this.scoreTable = 'score-'+size;
        this.tableChangedEmitter.emit(true)
    }

    getScoreTable(){
        return this.scoreTable;
    }

}