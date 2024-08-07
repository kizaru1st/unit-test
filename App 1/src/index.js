import { web } from "./application/web.js";

web.listen(3000, () => {
    console.log("Server running on port 3000")
    console.log("Swagger UI available at http://localhost:3000/api-docs");
})