import { PORT } from "./utils/config.js";
import app from "./app.js";

app.listen(PORT, () => {
  console.log(`Server runnign at port ${PORT}`);
});
