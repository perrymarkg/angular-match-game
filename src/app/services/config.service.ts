export class ConfigService {
    private cols = 2;
    private row = 6;
    private blockSize = 3;
    private gridArray: Array<string> = [];
    private classes = Array('fa-android', 'fa-gratipay', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-left', 'fa-caret-square-o-left', 'fa-envelope-square', 'fa-stumbleupon', 'fa-taxi', 'fa-steam', 'fa-file-excel-o', 'fa-git', 'fa-paper-plane-o', 'fa-google-wallet', 'fa-copyright', 'fa-at', 'fa-forumbee', 'fa-user-secret');

    constructor(){
        if( this.gridArray.length === 0){
            this.generateGridArray();
        }
    }

    getBlockSize(){
        return this.blockSize;
    }

    getGridArray(index:any = false): any{
        if( index !== false )
            return this.gridArray[index];
        else   
            return this.gridArray;
    }

    generateGridArray(){
        const gridArraySize = ( this.cols * this.row ) / 2;
        const array = Array(gridArraySize).fill(0).map((val,index) => this.classes[index]);
        this.gridArray = array.concat(array).sort(function(a, b){return 0.5 - Math.random()});
    }

    

}