/**
 * Գրանցում → Google Sheets
 * -----------------------------------------
 * 1. Ստեղծեք նոր Google Sheet (sheets.new)
 * 2. Extensions → Apps Script
 * 3. Ջնջեք եղած կոդը և տեղադրեք սա
 * 4. Save (Ctrl+S)
 * 5. Deploy → New deployment → Type՝ "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Deploy, հաստատեք թույլտվությունները
 * 7. Պատճենեք Web app URL-ը
 * 8. finance-script.js-ում SCRIPT_URL-ի տեղը դրեք այդ URL-ը
 */

function doPost(e) {
  // Honeypot՝ bot-երից պաշտպանություն
  if (e.parameter.hp_confirm_9k2) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "ignored" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Գրանցումներ");
  if (!sheet) {
    sheet = ss.insertSheet("Գրանցումներ");
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Ամսաթիվ/Ժամ", "Անուն Ազգանուն", "Խումբ / Կուրս"]);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.name || "",
    e.parameter.group || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
