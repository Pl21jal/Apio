const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return {
        statusCode: 200,
        body: data
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gagal membaca file" })
      };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      if (!body.value) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Field 'value' is required" })
        };
      }

      fs.writeFileSync(filePath, JSON.stringify({ value: body.value }, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, newValue: body.value })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gagal menyimpan file" })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
};
