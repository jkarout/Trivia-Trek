# Trivia Challenge 🧠

A clean, responsive, and interactive web-based trivia game. Test your knowledge across multiple categories and difficulty levels!

## Features
* **Customizable Games:** Choose from the following categories Science & Nature, History, Film, and General Knowledge. Choose a difficulty level such as Easy, Medium, or Hard.
* **Instant Feedback:** Sleek, modern UI that immediately highlights correct (green checkmark) and incorrect (red X) answers using custom CSS pseudo-elements.
* **Dynamic Content:** Fetches fresh trivia questions dynamically from the Open Trivia Database API.
* **Score Tracking:** Tracks your progress and provides a final grade/message at the end of the 5-question round.

## How to Run the Project

1. **Clone or Download the Repository:** Extract the files to a local folder on your computer.
2. **Open the App:** Simply double-click the `index.html` file to open it in your default web browser. 
   * *Optional:* If you are using a code editor like VS Code, you can use the "Live Server" extension for a better development experience.
3. **Play!** Ensure you have an active internet connection so the app can fetch questions from the trivia API.

## Tools & Libraries Used
* **HTML5 & CSS3:** For the structure and modern, responsive styling.
* **Vanilla JavaScript:** For DOM manipulation, game logic, and asynchronous API calls.
* **[Open Trivia Database (OpenTDB) API](https://opentdb.com/):** A free, JSON-based API used to fetch the multiple-choice trivia questions.
* **Normalize.css:** Used to ensure consistent styling and baseline resets across all web browsers.
* **Embedded SVGs:** Used for the correct/incorrect answer icons to keep the project lightweight without relying on external icon libraries like FontAwesome.

## Assumptions & Technical Notes
* **Internet Connection:** The game assumes the user has a stable internet connection. If the API fetch fails, an alert is currently triggered.
* **Question Count:** The game is currently hardcoded to pull exactly 5 questions per round to keep gameplay quick and engaging.
* **API Rate Limiting:** The OpenTDB API has rate limits (only 1 request per IP every 5 seconds). The current flow naturally spaces out requests, but rapid restarting could theoretically hit this limit.

## What I Would Add Next (With More Time)
If I were to continue developing this project, I would focus on the following enhancements:

1. **Smooth Animations:** Add CSS transitions for the game screens fading in and out, rather than snapping instantly when the display property changes.
2. **Adjustable Question Counts:** Add a third dropdown on the welcome screen allowing the user to choose 5, 10, or 20 questions.
