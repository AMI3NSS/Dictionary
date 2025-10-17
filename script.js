async function getMeaning() {
  const inputWord = document.getElementById("inputt").value.trim();
  const word = document.getElementById("heading");
  const partOfSpeech = document.getElementById("speech");
  const phonetics = document.getElementById("phonetics");
  const firstMeaning = document.getElementById("m1");
  const example = document.getElementById("m2");
  const volume = document.getElementById("volume");

  if (!inputWord) {
    firstMeaning.textContent = "Please enter a word";
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
    );
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    const meaning1 = data[0].meanings[0].definitions[0].definition;
    const ex = data[0].meanings[0].definitions[0].example;
    const pos = data[0].meanings[0].partOfSpeech;
    const symbol = data[0].phonetic;

    const audioSrc = data[0].phonetics.find((p) => p.audio)?.audio;

    console.log(data);

    firstMeaning.textContent = `${meaning1}`;
    partOfSpeech.textContent = `${pos}`;
    phonetics.textContent = `${symbol}`;
    word.textContent = `${inputWord}`;

    if (!ex) {
      example.textContent = "";
    } else {
      example.textContent = `${ex}`;
    }

    // attach playSound only if audio is available
    if (audioSrc) {
      volume.style.display = "inline"; // show the icon
      volume.onclick = () => {
        let audio = new Audio(audioSrc);
        audio.play();
      };
    } else {
      volume.style.display = "none"; // hide icon if no audio
    }
  } catch (error) {
    console.error(error);
    word.textContent = inputWord;
    firstMeaning.textContent = "Word not found in dictionary";
    partOfSpeech.textContent = "";
    phonetics.textContent = "";
  }
}

document.getElementById("search").addEventListener("click", getMeaning);
