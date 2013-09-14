Rand = function() {
  if (!Rand.generator) Rand.generator = Alea();
  return Rand.generator();
} 