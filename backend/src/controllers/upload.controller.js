const path = require('path');
const { getHeadersToken, verifyToken } = require('../helpers/jwt');

const uploadSingle = async (req, res, next) => {
	try {
		const type = req.query.type;
		const file = req.file;

		if (!file) {
			return res.status(400).json({
				msg: 'No se subió ninggún archivo',
			});
		}

		const baseUrl = `${req.protocol}://${req.get('host')}`;
		const fileDir = type === 'private' ? 'private' : 'public';

		const fileUrl = `${baseUrl}/uploads/${fileDir}/${file.filename}`;

		res.status(200).json({
			msg: 'Archivo cargado',
			data: fileUrl,
		});
	} catch (error) {
		next(error);
	}
};

const uploadMultiple = async (req, res, next) => {
	try {
		const type = req.query.type;
		const files = req.files;

		if (!files || !files?.length) {
			return res.status(400).json({
				msg: 'No se subieron archivos',
			});
		}

		const baseUrl = `${req.protocol}://${req.get('host')}`;

		const filesUrls = files.map((file) => {
			const fileDir = type === 'private' ? 'private' : 'public';
			const fileUrl = `${baseUrl}/uploads/${fileDir}/${file.filename}`;

			return fileUrl;
		});

		res.status(200).json({
			msg: 'Archivos cargados',
			data: filesUrls,
		});
	} catch (error) {
		next(error);
	}
};

const getPublicFile = async (req, res, next) => {
	try {
		const { filename } = req.params;

		const filePath = path.join(
			__dirname,
			'../..',
			'uploads',
			'public',
			filename
		);

		res.sendFile(filePath);
	} catch (error) {
		next(error);
	}
};

const getPrivateFile = async (req, res, next) => {
	try {
		const { filename } = req.params;

		const token = getHeadersToken(req);
		verifyToken(token);

		const filePath = path.join(
			__dirname,
			'../..',
			'uploads',
			'private',
			filename
		);

		res.sendFile(filePath);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	uploadSingle,
	uploadMultiple,
	getPublicFile,
	getPrivateFile,
};
