<div align="center">
  <img style="width: 15%;" src="https://raw.githubusercontent.com/Tyler-Vinson/react-unit-project/main/my-react-app/src/assets/doorclosed.png" alt="Closed museum door">

  # **THE ABANDONED INTERNET MUSEUM**

  ## **DESCRIPTION**
  "The Abandoned Internet Museum" is an interactive web museum about notable internet-horror stories and spaces. Visitors begin in the museum lobby, choose an exhibit through three doors, learn about [...]

  COLOR PALETTE | LIVE DEMO
:-------------------------:|:-------------------------:
<img style="width: 50%;" src="https://raw.githubusercontent.com/Tyler-Vinson/react-unit-project/main/my-react-app/src/assets/color%20pallete.png" alt="The Abandoned Internet Museum color palette"> | [Open the museum](https://tyler-vinson.github.io/react-unit-project/)
</div>

## **KEY FEATURES:**

1. **MUSEUM LOBBY:**
   - Introduces the museum and provides an animated door leading to the exhibit hall.
   - Includes background music controls for the museum experience.

2. **THREE-DOOR EXHIBIT HALL:**
   - Presents three interactive doors for Valley View Center, Slender Man, and *The Blair Witch Project*.
   - Each door responds to hover and keyboard focus before opening its exhibit.

3. **EXHIBIT PAGES:**
   - Provides historical context, images, videos, and themed backgrounds for each topic.
   - Includes a consistent door control to continue into the selected experience.

4. **INTERACTIVE 3D MALL:**
   - Loads a navigable 3D recreation of Valley View Center.
   - Supports collision detection, walking, running, jumping, and noclip mode.
   - Works with keyboard and mouse, game controllers, and mobile touch controls.

5. **RESPONSIVE DESIGN:**
   - Adapts exhibit content, media, and navigation to smaller screens.
   - Provides an on-screen joystick, look area, and jump control for mobile mall exploration.

## **HOW TO USE (Visual Studio Code)**

1. Install [Node.js](https://nodejs.org/) on your computer.
2. Download [Visual Studio Code](https://code.visualstudio.com/).
3. Clone this repository and open the `my-react-app` folder in Visual Studio Code.
4. In the terminal, install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal, usually `http://localhost:5173/react-unit-project/`.

## **SCRIPTS**

- `npm run dev` — starts the Vite development server.
- `npm run lint` — checks the project with ESLint.
- `npm run build` — creates a production build in `dist/`.
- `npm run deploy` — builds and publishes the site to GitHub Pages.
