import getPreviousWords from "./getPreviousWords";
import extractWordsFromHTML from "./extractWordsfromHTML";

const url: string = "https://www.rockpapershotgun.com/wordle-past-answers";

async function fetchWords() {
  try {
    const words = await getPreviousWords(url);
    console.log(words);
  } catch (error) {
    console.error(error);
  }
}

fetchWords();
