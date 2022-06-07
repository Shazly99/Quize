export class Quiz {
  constructor(question) {
    this.questions = question;

    this.currentQustion = 0;
    this.score = 0;
    this.nextBtn = document.getElementById("next");
    this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
    this.showQustions();
  }
  showQustions() {
    document.getElementById("question").innerHTML =
      this.questions[this.currentQustion].question;
    document.getElementById("totalAmount").innerHTML = this.questions.length;
    document.getElementById("current").innerHTML = this.currentQustion + 1;
    this.getAnswers();
  }
  getAnswers() {
    //this.questions[this.currentQustion]. ==> ده السؤال
    this.answers = [
      this.questions[this.currentQustion].correct_answer,
      ...this.questions[this.currentQustion].incorrect_answers,
    ];
   
    
    let currentIndex = this.answers.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.answers[currentIndex], this.answers[randomIndex]] = [
        this.answers[randomIndex],
        this.answers[currentIndex],
      ];
    }

   
    
    this.cartonna = ``;
    for (let i = 0; i < this.answers.length; i++) {
      this.cartonna += `
             <div class="form-check">
             <label class="form-check-label">
                 <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${this.answers[i]}">
                 ${this.answers[i]}
             </label>
         </div>
             `;
      document.getElementById("rowAnswer").innerHTML = this.cartonna;
    }
  }

  nextQuestion() {
    this.checkUserAnswer()?
 
     $("#Correct" ).fadeIn(500,()=>{
         $('#Correct').fadeOut(500);
     })
      :
      $("#inCorrect" ).fadeIn(500,()=>{
          $('#inCorrect').fadeOut(500);
      }) 
    
    // if (this.currentQustion>this.questions) {
    //     this.currentQustion++;
    // }
 this.currentQustion++ 
    if (this.currentQustion<this.questions.length) {
        this.showQustions();
    }else{
        this.finish()
        
    }
    
  }
  checkUserAnswer() {
    this.userAnswer = document.getElementsByName("answer");
    this.userAnswer = [...this.userAnswer].filter((e) => e.checked)[0].value;
    this.correct_answer = this.questions[this.currentQustion].correct_answer;
    if (this.userAnswer === this.correct_answer) {
      this.score++;
      return true;
    } else {
      return false;
    }
  }
  finish(){
    $('#quiz').fadeOut(500,()=>{
        $('#finish').fadeIn(500)
    });
    document.getElementById("score").innerHTML=this.score
    document.getElementById('tryBtn').addEventListener('click',()=>{
        $('#finish').fadeOut(500,()=>{
            $('#setting').fadeIn(500)
        });
    })
  }
  
}
