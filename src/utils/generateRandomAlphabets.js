function generateRandomAlphabets() {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = [];
  for (let i = 0; i < 20; i++) {
    let char = alphabets.charAt(Math.floor(Math.random() * 26));
    result.push(char);
  }
  return result;
}

export {generateRandomAlphabets}
