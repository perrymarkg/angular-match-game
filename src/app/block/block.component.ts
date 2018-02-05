import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ClickService } from '../services/click.service';


@Component({
    selector: 'app-block',
    templateUrl: './block.html',
    styleUrls: ['./block-component.css']
})
export class BlockComponent {
    
    blockSize;
    gridArray;

    constructor(
        private configService: ConfigService, 
        private clickService: ClickService
    ){
        this.blockSize = this.configService.getBlockSize();
        this.gridArray = this.configService.getGridArray(false);
    }


   


}