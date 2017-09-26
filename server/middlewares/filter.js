let censoredWords = ['dang', 'fetch', 'heck', 'holy', 'crud'];

module.exports = function (req,res,next){
  while(censoredWords.find(word=>req.body.text.includes(word))){
    const badWord = censoredWords.find(word=>req.body.text.includes(word));
    req.body.text = req.body.text.replace(badWord, '*'.repeat(badWord.length));
  }
  next();
}
