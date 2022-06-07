import { Quiz } from "./quiz.js";

export class Setting{
    constructor(){
        this.questions;
        //Category
        this.categoryElement=document.getElementById('category')
        //Difficulty
        this.difficultyElement=Array.from(document.getElementsByName('difficulty'))
 
        //Number Input
        this.Number=document.getElementById('Number')
        //btn
        this.startBtn=document.getElementById('startBtn')
        this.startBtn.addEventListener('click',this.startquiz.bind(this))

        
    }

    async  startquiz(){
        let category=this.categoryElement.value;
        let numbet=this.Number.value
        let difficult=Array.from(this.difficultyElement).filter(e=>e.checked)[0].value
        this.questions= await  this.fetchURL(`https://opentdb.com/api.php?amount=${numbet}&category=${category}&difficulty=${difficult}`)
         

        if (this.questions.length>0) {
            $('#setting').fadeOut(500,()=>{
                $('#quiz').fadeIn(500);
                new Quiz(this.questions) ;
            });
            
        }else{
            alert('You have to specify the number of questions')
        }
     }

    async fetchURL(URL){
        let result=await fetch(URL)
        result=await result.json()
        
        return result.results 
    }

} 

 