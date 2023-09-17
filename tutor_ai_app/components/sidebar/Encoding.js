const encodedFile = (file) => {
  const fs = require("fs");

  // Read the EPUB file as a binary buffer
  const epubFilePath =
    "../bookdata/python-books_A_Practical_Introduction_to_Python_Programming_Heinold.epub";
  const epubData = fs.readFileSync(epubFilePath);

  // Encode the binary data as a base64 string
  const base64EncodedEpub = epubData.toString("base64");

  // Create a JSON object with the base64-encoded EPUB
  const jsonPayload = {
    epubData: base64EncodedEpub,
    // You can include other data in your JSON object as needed
    // For example:
    // title: 'My EPUB Book',
    // author: 'John Doe',
  };

  // Convert the JSON object to a JSON string
  const jsonString = JSON.stringify(jsonPayload);

  // Specify the path where you want to save the JSON data to a text file
  const jsonFilePath = "output.json";

  // Write the JSON string to a text file
  fs.writeFileSync(jsonFilePath, jsonString);
  
};

