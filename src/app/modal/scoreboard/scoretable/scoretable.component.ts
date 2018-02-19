import { Component, Input } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ScoreService } from '../../../services/score.service';

@Component({
    selector: 'app-scoretable',
    templateUrl: './scoretable.html',
    styleUrls: ['./scoretable.css']
})
export class ScoretableComponent {

    scores;
    subscription;
    @Input() piece: number;
    date = new Date()
    
    
    constructor(private db: DbService, private scoreService: ScoreService){
        this.setSubscription();
        this.db.tableChangedEmitter.subscribe( d =>{
            if( d ){
                this.setSubscription();
            }
        })
        

    }

    setSubscription(){
        this.subscription = this.db.getScore().valueChanges()
        this.subscription.subscribe( r => {
            this.scores = r
            // @Todo pass filtering to firebase
            this.scores.sort( (a, b) => {
                return a.time < b.time && a.moves > b.moves
            })
        })
    }

    convertTimeFormat(time):string{
        return this.scoreService.convertTimeFormat(time);
    }

    

    
}