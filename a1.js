/*******************************************************************
 * WEB322 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Pooja Shankarlal Pinjani Student ID: 170943211 Date: 16-05-2025
 *******************************************************************/

const fs = require('fs');
const readline = require('readline');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user: File or Directory?
rl.question("Do you wish to process a File (f) or Directory (d): ", (choice) => {
    if (choice.toLowerCase() === 'f') {
        rl.question("File: ", (filePath) => {
            processFile(filePath);
            rl.close();
        });
    } else if (choice.toLowerCase() === 'd') {
        rl.question("Directory: ", (dirPath) => {
            processDirectory(dirPath);
            rl.close();
        });
    } else {
        console.log("Invalid Selection");
        rl.close();
    }
});

// Function to process a file
function processFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err.message);
            return;
        }

        const cleanText = data.toString().replace(/\s+/g, ' ');
        const words = cleanText.replace(/[^\w\s']/g, '').split(' ');
        const charCount = cleanText.length;
        const wordCount = words.length;

        let longestWord = '';
        const wordFreq = {};

        words.forEach(word => {
            if (word.length > longestWord.length) {
                longestWord = word;
            }
            const lower = word.toLowerCase();
            wordFreq[lower] = (wordFreq[lower] || 0) + 1;
        });

        let mostRepeated = '';
        let maxCount = 0;
        for (let word in wordFreq) {
            if (wordFreq[word] > maxCount) {
                mostRepeated = word;
                maxCount = wordFreq[word];
            }
        }

        console.log(`Number of Characters (including spaces): ${charCount}`);
        console.log(`Number of Words: ${wordCount}`);
        console.log(`Longest Word: ${longestWord}`);
        console.log(`Most Repeated Word: ${mostRepeated} - ${maxCount} times`);
    });
}

// Function to process a directory
function processDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(err.message);
            return;
        }

        const sortedFiles = files.sort().reverse();
        console.log(`Files (reverse alphabetical order): ${sortedFiles.join(', ')}`);

        sortedFiles.forEach(file => {
            const fullPath = `${dirPath}/${file}`;
            try {
                const stats = fs.statSync(fullPath);
                console.log(`${file}: ${stats.size} bytes`);
            } catch (e) {
                console.log(`Could not read ${file}`);
            }
        });
    });
}
