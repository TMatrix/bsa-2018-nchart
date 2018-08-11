const CsvService = require('./csv.service');
const XlsxService = require('./xlsx.service');

module.exports = {
	fileService: file =>
		new Promise((resolve, reject) => {
			const pattern = {
				csv: /.+(\.csv)$/,
				xlsx: /.+(\.xlsx)$/
			};
			if (!file) {
				throw new Error('No file were uploaded');
			}
			if (pattern.csv.test(file.fileKey.name)) {
				resolve(CsvService.processFile(file.fileKey));
			} else if (pattern.xlsx.test(file.fileKey.name)) {
				resolve(XlsxService.processFile(file.fileKey));
			} else {
				throw new Error('Incorrect file extension');
			}
			return reject(new Error('Something went wrong'));
		})
};
