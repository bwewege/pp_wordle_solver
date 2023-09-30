import * as cheerio from "cheerio";

//Function to Extract words from the HTML received from Rock Paper Shotgun

function extractWordsFromHTML(htmlContent: string): string[] {
  const $ = cheerio.load(htmlContent);
  const lis = $('h2:contains("All Wordle answers") ~ ul.inline > li');

  const allWords: string[] = [];
  lis.each((index, element) => {
    allWords.push($(element).text());
  });

  return allWords;
}

export default extractWordsFromHTML;
