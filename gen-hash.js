const bcrypt = require('bcryptjs');

async function main() {
  const hash = await bcrypt.hash('123456', 12);
  console.log("HASH GERADO:", hash);
  
  // Realizar chamada de API local para corrigir? Better just do it directly via fetch here by updating the Seed api or just running a fast node script with fetch
}

main();
