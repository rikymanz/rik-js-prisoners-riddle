const getPrisoners = () => {
    let prisoners = []

    for (let index = 0; index < 100; index++) {
        prisoners[index] = {number:index+1,result:null}
    }

    return prisoners
}

const optimalSolution = (boxes) => {
    const prisoners = getPrisoners()

    for (let index = 0; index < prisoners.length; index++) {
        const prisoner = prisoners[index];
        
        const tempBoxes = JSON.parse( JSON.stringify( boxes ) )
        let cont = 0
        let nextBox = prisoner.number
        while( cont < 50 && !prisoner.result){
            const box = tempBoxes.find( row => row.number === nextBox )
            if( box.paper === prisoner.number ) prisoner.result = true
            nextBox = box.paper
            cont ++
        }
        
        prisoner.result = prisoner.result ? true : false
        
    }

    return prisoners
}

const randomSolution = (boxes) => {
    const prisoners = getPrisoners()

    for (let index = 0; index < prisoners.length; index++) {
        const prisoner = prisoners[index];
        
        const tempBoxes = JSON.parse( JSON.stringify( boxes ) )
        let cont = 0
        while( cont < 50 && !prisoner.result){
            const random = Math.floor(Math.random() * 100) + 1;
            const box = tempBoxes.find( row => row.number === random )
            if( !box.opened ){
                cont ++
                box.opened = true 
                if( box.paper === prisoner.number ) prisoner.result = true
            }
        }
        
        prisoner.result = prisoner.result ? true : false
        
    }

    return prisoners
}

const fillBoxes = () => {
    let boxes = []
    let numbers = []

    for (let index = 0; index < 100; index++) {
        boxes.push({number:index+1,paper:0,opened:false})   
        numbers.push(index+1)
    }

    for (let index = 0; index < 100; index++) {
        const tempPos = Math.floor(Math.random() * numbers.length);
        boxes[index].paper = numbers[tempPos]
        numbers.splice(tempPos,1)
    }

    return boxes
}

const init = () =>{
    const normalCheck = document.getElementById('normalMode').checked 
    const solutionCheck = document.getElementById('solutionMode').checked

    if( (normalCheck && solutionCheck) || (!normalCheck && !solutionCheck)){
        alert('Selezionare solo una delle due opzioni')
        return false
    }
    
    const ripetition = document.getElementById('ripetition').value 

    if( !ripetition ||  ripetition < 1 || ripetition > 10000 ){
        alert('selzionare un numero tra 1 e 10000')
        return false
    }

    let success = 0
    let unsuccess = 0
    for (let index = 0; index < ripetition; index++) {
        // riempimento box
        const boxes = fillBoxes()
        let prisoners = []

        if( solutionCheck ) prisoners = optimalSolution( boxes ) 
        if( !solutionCheck ) prisoners = randomSolution( boxes ) 

        const successPrisoners = prisoners.filter( row => row.result ).length 
        console.log( successPrisoners )
        if( successPrisoners === 100  ) success ++ 
        else unsuccess ++ 

        document.getElementById('ok').innerHTML = `Successo : ${success}`
        document.getElementById('nook').innerHTML = `Insuccesso : ${unsuccess}`
    
        
    }
    

}


document.getElementById('startButton').addEventListener('click', init )