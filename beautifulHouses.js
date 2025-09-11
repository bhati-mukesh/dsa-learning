const isBeautifulHouse = (data, i, j) => {
    const colMax = data[0].length;
    const rowMax = data.length;
    // console.log(">>> max",{i, j, rowMax, colMax})
    if(i == 0 && j == 0){
        if(data[i+1][0] == 0 && data[0][j+1] == 0){
            return true;
        }
        return false;
    }
    if(i == 0 && j == colMax-1){
        if(data[i][j-1] == 0 && data[i+1][j] == 0){
            return true;
        }
        return false;
    }
    if(i == rowMax-1 && j == 0){
        if(data[i][j+1] == 0 && data[i-1][j] ==0){
            return true;
        }
        return false;
    }
    if(i == rowMax-1 && j== colMax-1){
        if(data[i][j-1] == 0 && data[i-1][j] ==0){
            return true;
        }
        return false;
    }
    if(i== 0 && j > 0 && j < colMax-1){
        if(data[i+1][j] == 0 && data[i][j-1] == 0 && data[i][j+1] == 0){
            return true;
        }
        return false;
    }
    if(i== rowMax-1 && j > 0 && j < colMax-1){
        if(data[i-1][j] == 0 && data[i][j-1] == 0 && data[i][j+1] == 0){
            return true;
        }
        return false;
    }
    if(j== 0 && i > 0 && i < rowMax-1){
        if(data[i-1][j] == 0 && data[i+1][j] == 0 && data[i][j+1] == 0){
            return true;
        }
        return false;
    }
    if(j== colMax-1 && i > 0 && i < rowMax-1){
        if(data[i-1][j] == 0 && data[i+1][j] == 0 && data[i][j-1] == 0){
            return true;
        }
        return false;
    }
    if(i > 0 && j > 0){
        if(data[i-1][j] == 0 && data[i+1][j] == 0 && data[i][j-1] == 0 && data[i][j+1] == 0){
            return true
        }
        return false;
    }

}

const main = ()=>{
    data = [
        [1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0],
    ]
    let count = 0;
    for(let i=0; i< data.length; i++){
        for(j=0; j< data[0].length; j++){
            if(data[i][j] == 1 && isBeautifulHouse(data,i,j)){
                console.log(">>> beautiful house found at",`[${i}][${j}]`)
                count++;
            }
        }
    }
    console.log(">>> total beautiful houses", count);
}

main();