import * as https from "https";
import * as cheerio from "cheerio"; // Cheerio is a tool to take raw HTML, parse it, and extract or manipulate data

// This function takes url as a parameter and returns a promite that will resolve to a string or reject with an error
function getPreviousWords(url: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    https
      .get(url, (res) => {
        // https.get method initiates a requrest to the url. It takes a callback function taht receices an res object. If there is an error, the "error" event is triggered.
        let data: string = "";

        res.on("data", (chunk) => {
          data += chunk;
        }); // As data is received, the data event is emitted mutliple times. Each chunk of data is appended to data

        res.on("end", () => {
          const allWords: string[] = extractWordsFromHTML(data);
          resolve(allWords);
        }); // On all data is received and respinse ends, the end even is emitted. The Promise is resolved.
      })
      .on("error", (err) => {
        reject(err);
      });
  });

  function extractWordsFromHTML(htmlContent: string): string[] {
    const $ = cheerio.load(htmlContent);
    const lis = $('h2:contains("All Wordle answers") ~ ul.inline > li');

    const allWords: string[] = [];
    lis.each((index, element) => {
      allWords.push($(element).text());
    });

    return allWords;
  }
}

export default getPreviousWords;
