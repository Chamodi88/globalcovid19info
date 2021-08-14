import { google } from "googleapis";

export async function getVaccinesData() {
	try {
		const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
		const jwt = new google.auth.JWT(
			process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
			null,
			process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
			scopes
		);

		const sheets = google.sheets({ version: "v4", auth: jwt });
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
			range: "Sheet1",
		});

		const rows = response.data.values;

		if (rows.length) {
			return rows.map((row) => ({
				location: row[0],
				date: row[1],
				vaccine: row[2],
				total_vaccinations: row[3],
			}));
		}
	} catch (err) {
		console.log(err);
	}

	return [];
}
