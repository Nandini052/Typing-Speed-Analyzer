# Typing Speed Analyzer

A web-based typing speed analysis application developed using HTML, CSS, and JavaScript. The system allows users to measure their typing speed, accuracy, errors, and overall typing performance through timed typing tests.

## Features

- Multiple difficulty levels: Easy, Medium, and Hard
- Multiple test durations: 15s, 30s, 60s, and 120s
- Real-time Words Per Minute (WPM) calculation
- Accuracy calculation
- Error tracking
- Countdown timer
- Character-by-character typing feedback
- Correct and incorrect character highlighting
- Automatic test completion
- Detailed test result summary
- Test history using Local Storage
- History filtering by difficulty and duration
- Clear history functionality
- Best and average WPM statistics
- Best and average accuracy statistics
- Total tests, errors, characters, and time tracking
- WPM progress graph using HTML Canvas
- Dark mode
- Persistent dark mode preference
- Responsive user interface
- Settings panel

## Technologies Used

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas
- Browser Local Storage

## How It Works

The user selects a difficulty level and test duration before starting the typing test. A passage is displayed on the screen, and the user types it into the provided text area.

While the test is running, the system:

1. Tracks the time remaining.
2. Compares the typed characters with the original passage.
3. Calculates typing speed in WPM.
4. Calculates typing accuracy.
5. Tracks typing errors.
6. Provides visual feedback for correct and incorrect characters.

After the test is completed, the application displays the final performance results and stores the test data in the browser's Local Storage.

The stored results are then used to generate performance statistics and the WPM progress graph.

## WPM Calculation

Typing speed is measured using Words Per Minute (WPM).

The standard calculation considers five characters as one word:

```text
WPM = (Characters Typed / 5) / Time in Minutes