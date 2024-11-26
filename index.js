

const http = require("http");
const { CodeSandbox } = require("@codesandbox/sdk");

// const TOKEN= "csb_v1_vX6JoKqKb68UIZPKWH2amcz323i1jndJJCV4It7u39M"
const TOKEN = "csb_v1_SUMOJfhaRWdKZxFYBOrqYoT1KnNb1QqNcX67PtuJrTU";

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    try {
      console.log("Starting sandbox interaction...");

      const sdk = new CodeSandbox(TOKEN);
      console.log("SDK initialized");

      // Create a new sandbox
      const sandbox = await sdk.sandbox.create();


    //     {
    //     extensions: [
    //       {
    //         id: "Blackboxapp.blackbox",  // Replace with the actual extension ID
    //         version: "latest"         // Optional: Specify the version if necessary
    //       }
    //     ]
    //   }
    // );

      console.log("Sandbox created:", sandbox);

      const test1 = await sandbox.shells.run("curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz");
      console.log("Downloaded vscode_cli.tar.gz:", test1);

      const test2 = await sandbox.shells.run("tar -xf vscode_cli.tar.gz");
      console.log("Extracted VS Code:", test2);

      const test3 = await sandbox.shells.run("echo 'Hello, world!'");
    
      
      console.log("Hello World Output:", test3);

      const test4 = await sandbox.shells.run("which code");

      console.log("which code:", test4);
    //   const test5 = await sandbox.shells.run("./code --install-extension Blackboxapp.blackbox");

      // Run the VS Code tunnel command in the background
    //   const output = await sandbox.shells.run("./code tunnel --accept-server-license-terms &");
    //   console.log("VS Code tunnel started:", output, test5);
    const command = `./code tunnel --name test --accept-server-license-terms &`;

    const output = await sandbox.shells.run(command);
      console.log('Tunnel successfully created:', output, test5,);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "CodeSandbox interaction complete!",
          output,
        })
      );
    } catch (error) {
      console.error("Error during execution:", error);
      res.statusCode = 500;
      res.end(`Error: ${error.message}`);
    }
  } else {
    console.log("404 - Not Found");
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Not Found");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
