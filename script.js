document.getElementById('uploadInput').addEventListener('change', async (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (event) => {
		const img = new Image();
		img.src = event.target.result;

		img.onload = () => {
			const { width, height } = img;
			const imageRatio = Math.max(width, height) / Math.min(width, height);

			const formats = {
				'ISO A4': { width: 210, height: 297, unit: "mm", serie: "A"},
				'ISO A5': { width: 148, height: 210, unit: "mm", serie: "A"},
				'ISO A6': { width: 105, height: 148, unit: "mm", serie: "A"},
				'ISO A7': { width: 74, height: 105, unit: "mm", serie: "A"},
				'ISO A8': { width: 52, height: 74, unit: "mm", serie: "A"},
				'ISO A9': { width: 37, height: 52, unit: "mm", serie: "A"},
				'ISO A10': { width: 26, height: 37, unit: "mm", serie: "A"},

				"B5": { width: 176, height: 250, unit: "mm", serie: "B"},
				"B6": { width: 125, height: 176, unit: "mm", serie: "B"},
				"B7": { width: 88, height: 125, unit: "mm", serie: "B"},
				"B8": { width: 62, height: 88, unit: "mm", serie: "B"},
				"B9": { width: 44, height: 62, unit: "mm", serie: "B"},

				'C5': { width: 162, height: 229, unit: "mm", serie: "C"},
				'C6': { width: 114, height: 162, unit: "mm", serie: "C"},
				'C7': { width: 81, height: 114, unit: "mm", serie: "C"},
				'C8': { width: 57, height: 81, unit: "mm", serie: "C"},
				'C9': { width: 40, height: 57, unit: "mm", serie: "C"},
				'C10': { width: 28, height: 40, unit: "mm" , serie: "C"},

				"5 x 7": { width: 127, height: 178, unit: "mm"},
				"8 x10": { width: 203, height: 254, unit: "mm"},
				"3,5 x 5": { width: 89, height: 127, unit: "mm"},
				"Administratif": { width: 184, height: 267, unit: "mm"},
				"Carte Postal": { width: 100, height: 148, unit: "mm"},
				"4 x 6": { width: 102, height: 152, unit: "mm"},
				"8,5 x 13": { width: 216, height: 330, unit: "mm"},
				"5 x 8": { width: 127, height: 203, unit: "mm"},
				"3 x 5": { width: 76, height: 127, unit: "mm"},
			};
			let bestFormat = '';
			let minDiff = Number.MAX_VALUE;
			let bestFit = false;

			for (const format in formats) {
				const formatRatio = Math.max(formats[format].width, formats[format].height) / Math.min(formats[format].width, formats[format].height);
				const diff = Math.abs(imageRatio - formatRatio);

				if (diff === 0) {
					// Correspondance parfaite, pas besoin de rogner
					bestFormat = format;
					bestFit = true;
					break;
				}

				if (diff < minDiff) {
					minDiff = diff;
					bestFormat = format;
				}
			}

			let result;
			if (bestFit) {
				result = `Le format optimal pour imprimer cette image sans rogner est : ${bestFormat}. Ratio de l'image : ${width}x${height} (${imageRatio.toFixed(2)}).`;
			} else {
				const bestPaperRatio = Math.max(formats[bestFormat].width, formats[bestFormat].height) / Math.min(formats[bestFormat].width, formats[bestFormat].height);
				result = `Le format optimal pour imprimer cette image en minimisant le rognage est : ${bestFormat}. Ratio de l'image : ${width}x${height} (${imageRatio.toFixed(2)}). Ratio du papier ${bestFormat} : ${formats[bestFormat].width}x${formats[bestFormat].height} (${bestPaperRatio.toFixed(2)})`;
			}

			document.getElementById('result').textContent = result;
		};
	};

	reader.readAsDataURL(file);
});