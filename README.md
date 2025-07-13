# Robot Status

This is an application that is designed for the MentraOS platform to run on the Even Realities G1. This app has not been tested on any other device that works with the MentraOS app, but it may work on other devices with minimal changes. The goal of this app is to pipe data from servo temps and battery percentage from a humanoid robot such as the Unitree G1 EDU into the smartglasses heads up display.

### Install MentraOS on your phone

MentraOS install links: [mentra.glass/install](https://mentra.glass/install)

### (Easiest way to get started) Set up ngrok

1. `brew install ngrok`

2. Make an ngrok account

3. [Use ngrok to make a static address/URL](https://dashboard.ngrok.com/)

### Register your version of Robot Status with MentraOS

1. Navigate to [console.mentra.glass](https://console.mentra.glass/)

2. Click "Sign In", and log into your Mentra account

3. Click "Create App"

4. Set a unique package name like `com.yourName.yourAppName`

5. For "Public URL", enter your Ngrok's static URL

### Get your App running!

1. [Install bun](https://bun.sh/docs/installation)

2. Make a fork of this repo

3. Clone your fork of this repo locally: `git clone <your-repo-url>`

4. cd into your repo, then type `bun install`

5. Set up your environment variables:
   * Create a `.env` file in the root directory by copying the example: `cp .env.example .env`
   * Edit the `.env` file with your app details:
     ```
     PORT=3000
     PACKAGE_NAME=com.yourName.yourAppName
     MENTRAOS_API_KEY=your_api_key_from_console
     ```
   * Make sure the `PACKAGE_NAME` matches what you registered in the MentraOS Console
   * Get your `API_KEY` from the MentraOS Developer Console

6. Run your app with `bun run dev`

7. To expose your app to the internet (and thus MentraOS) with ngrok, run: `ngrok http --url=<YOUR_NGROK_URL_HERE> 3000`
    * `3000` is the port. It must match what is in the app config. For example, if you entered `port: 8080`, use `8080` for ngrok instead.


### Next Steps

To extend the app further, read the Mentra SDK documentation at [docs.mentra.glass](https://docs.mentra.glass/core-concepts)

#### Subscribing to events

You can listen for events within the onSession function. You can use that to replace the on-screen variables with whatever you'd like.

### NOTE

All data displayed in the app currently is synthetic placeholder data meant to simulate live temperature changes on a humanoid robot.

