function slugify(string) {
  return string.split(" ").join("-").toLowerCase();
}

module.exports = slugify;
