import { AppServer, AppSession, ViewType } from '@mentra/sdk';


const PACKAGE_NAME = process.env.PACKAGE_NAME ?? (() => { throw new Error('PACKAGE_NAME is not set in .env file'); })();
const MENTRAOS_API_KEY = process.env.MENTRAOS_API_KEY ?? (() => { throw new Error('MENTRAOS_API_KEY is not set in .env file'); })();
const PORT = parseInt(process.env.PORT || '3000');

class ExampleMentraOSApp extends AppServer {

  constructor() {
    super({
      packageName: PACKAGE_NAME,
      apiKey: MENTRAOS_API_KEY,
      port: PORT,
    });
  }

  protected async onSession(session: AppSession, sessionId: string, userId: string): Promise<void> {
    // Text-to-speech
    // await session.audio.speak('Connecting to REK Robot!');

    // Robot limb temperatures as variables
    let SOCTemp = 63;
    let leftArmTemp = 96;
    let rightArmTemp = 104;
    let batteryPercentage = 92;
    let batteryTemp = 74;
    let leftHipTemp = 68;
    let rightHipTemp = 69;
    let leftKneeTemp = 98;
    let rightKneeTemp = 96;
    let crotchIMUTemp = 110;

    // Helper function to update the text wall
    const updateTextWall = () => {
      session.layouts.showTextWall(
        `     REK Robot Live Status Readout | Unit R001 DeREK\nLeft Arm: ${leftArmTemp}\u00B0C     SOC Temp: ${SOCTemp}\u00B0C        Right Arm: ${rightArmTemp}\u00B0C\nLeft Hip: ${leftHipTemp}\u00B0C      Battery: ${batteryPercentage}%|${batteryTemp}\u00B0C     Right Hip: ${rightHipTemp}\u00B0C\nLeft Knee: ${leftKneeTemp}\u00B0C    Crotch IMU: ${crotchIMUTemp}\u00B0C      Right knee: ${rightKneeTemp}\u00B0C`
      );
    };

    // Show initial message
    updateTextWall();

    // Collect all temp variable references in an array of objects
    const tempVars = [
      { name: "SOCTemp", ref: () => SOCTemp, set: (v: number) => { SOCTemp = v; } },
      { name: "leftArmTemp", ref: () => leftArmTemp, set: (v: number) => { leftArmTemp = v; } },
      { name: "rightArmTemp", ref: () => rightArmTemp, set: (v: number) => { rightArmTemp = v; } },
      { name: "batteryTemp", ref: () => batteryTemp, set: (v: number) => { batteryTemp = v; } },
      { name: "leftHipTemp", ref: () => leftHipTemp, set: (v: number) => { leftHipTemp = v; } },
      { name: "rightHipTemp", ref: () => rightHipTemp, set: (v: number) => { rightHipTemp = v; } },
      { name: "leftKneeTemp", ref: () => leftKneeTemp, set: (v: number) => { leftKneeTemp = v; } },
      { name: "rightKneeTemp", ref: () => rightKneeTemp, set: (v: number) => { rightKneeTemp = v; } },
      { name: "crotchIMUTemp", ref: () => crotchIMUTemp, set: (v: number) => { crotchIMUTemp = v; } },
    ];

    // Function to randomly fluctuate one or more temp variables
    const fluctuateTemps = () => {
      // Randomly decide how many temps to fluctuate (at least 1)
      const numToFluctuate = Math.max(1, Math.floor(Math.random() * tempVars.length));
      // Shuffle and pick random subset
      const shuffled = tempVars
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, numToFluctuate);

      shuffled.forEach(tempVar => {
        // Randomly add or subtract 0-3
        const delta = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
        const sign = Math.random() < 0.5 ? -1 : 1;
        const newValue = tempVar.ref() + sign * delta;
        tempVar.set(newValue);
      });
      updateTextWall();
    };

    // Start fluctuating temps every 2 seconds
    const fluctuationInterval = setInterval(fluctuateTemps, 2000);

    // Optionally, clear the interval on session end (not shown here)

    session.events.onGlassesBattery((data) => {
      console.log('Glasses battery:', data);
    })
  }
}

// Start the server
// DEV CONSOLE URL: https://console.mentra.glass/
// Get your webhook URL from ngrok (or whatever public URL you have)
const app = new ExampleMentraOSApp();

app.start().catch(console.error);