import React, { Component } from 'react';
import Snake from './Snake';
import Food from "../components/Food";


const getRandomCoordinates = () => { // פונקציה שמגדירה את מיקום האוכל באופן רנדומלי - הקוביה האדומה
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {  // מצב התחלתי של הנחש שלנו
  food: getRandomCoordinates(),
  speed: 200,         // מהירות
  direction: 'RIGHT', // הנחש מאותחל כפונה ימינה
  snakeDots: [   // מערך התחלתי של כמות נקודות הנחש לפני שגדל
    [0,0], // 0
    [2,0]  // 1
  ]
}

class game extends Component { // הגדרת רכיב - game

  state = initialState; // מגדיר לנו מצב התחלתי

  componentDidMount() { 
    setInterval(this.moveSnake, this.state.speed); // שיטה המאפשרת מרווחי זמן 
    document.onkeydown = this.onKeyDown; // אירוע מקלדת - כלומר מאפשר למשתמש לשחק ע"י המקלדת
  }

  componentDidUpdate() { // מאפשר עדכון לאחר בדיקות
    this.checkIfOutOfBorders();
    this.checkIfEat();
  }

  onKeyDown = (e) => { // מגדיר לנו פניות אפשריות של הנחש
  
    switch (e.keyCode) { // לכל מקש כיווני יש קוד מספרי שונה לכן זה 38,39 וכן הלאה
      case 38: 
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }
  
  moveSnake = () => {
    let dots = [...this.state.snakeDots];  // נקודות 
    let head = dots[dots.length - 1];      // בתוך משתנה הראש נכנסות לנו הנקודות מהסוף

    switch (this.state.direction) { // אחראי לנו על מצב הכיוונים של הנחש
      case 'RIGHT':
        head = [head[0] + 2, head[1]]; // תזוזה ימינה על ציר האיקס החיובי 
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]; // תזוזה שמאלה על ציר האיקס השלילי
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]; // תזוזה למטה
        break;
      case 'UP':
        head = [head[0], head[1] - 2]; // תזוזה למעלה
        break; 
    }
    dots.push(head); 
    dots.shift();   // מאתחל את הנקודות לפי כיוון חדש
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() { // בדיקה האם הנחש יוצא מגבולות המשחק
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) { // בדיקה בכל הצירים - כמה הנחש יכול לפנות במרחב
      this.onGameOver(); // המשחק נגמר - הדפסת הודעה לסיום משחק
    }
  }


  checkIfEat() { // אם הנחש במצב אכילה אז יש הופעה רנדומלית חדשה של האוכל
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake(); // הנחש גדל
      this.increaseSpeed(); // המעטת המהירות של הנחש
    }
  }

  enlargeSnake() { //  אחראי על הגדלת הנחש בכל פעם כאשר הוא אוכל 
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]) // מוסיף כל פעם אוכל כלומר נקודות לתחילת המערך - ראש הנחש
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() { // הורדת מהירות הנחש כאשר הוא אוכל מפעם לפעם
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() { 
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`); // כאשר המשתמש מפסיד מוצגת לו הודעה מתאימה ואת אורך הנחש שלו
    this.setState(initialState) // אתחול מחדש של הנחש למצב התחלתי כי המשתמש הפסיד
  }

  render() { // מאפשר לקבל נתונים 
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>  
      </div>
    );
  }
}
//  הפעלת קומפוננטה של אוכל - קובע את מיקום האוכל בכל פעם רנדומלית -Food
export default game;
