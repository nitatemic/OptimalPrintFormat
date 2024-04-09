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
				'A0': { width: 841, height: 1189, unit: "mm", serie: "A"},
				'A1': { width: 594, height: 841, unit: "mm", serie: "A"},
				'A2': { width: 420, height: 594, unit: "mm", serie: "A"},
				'A4': { width: 210, height: 297, unit: "mm", serie: "A"},
				'A5': { width: 148, height: 210, unit: "mm", serie: "A"},
				'A6': { width: 105, height: 148, unit: "mm", serie: "A"},
				'A7': { width: 74, height: 105, unit: "mm", serie: "A"},
				'A8': { width: 52, height: 74, unit: "mm", serie: "A"},
				'A9': { width: 37, height: 52, unit: "mm", serie: "A"},
				'A10': { width: 26, height: 37, unit: "mm", serie: "A"},
				'4A0': { width: 1682, height: 2378, unit: "mm", serie: "A"},
				'2A0': { width: 1189, height: 1682, unit: "mm", serie: "A"},
				'A0+': { width: 914, height: 1292, unit: "mm", serie: "A"},
				'A1+': { width: 609, height: 914, unit: "mm", serie: "A"},
				'A3+': { width: 329, height: 483, unit: "mm", serie: "A"},

				"B0": { width: 1000, height: 1414, unit: "mm", serie: "B"},
				"B1": { width: 707, height: 1000, unit: "mm", serie: "B"},
				"B2": { width: 500, height: 707, unit: "mm", serie: "B"},
				"B3": { width: 353, height: 500, unit: "mm", serie: "B"},
				"B4": { width: 250, height: 353, unit: "mm", serie: "B"},
				"B5": { width: 176, height: 250, unit: "mm", serie: "B"},
				"B6": { width: 125, height: 176, unit: "mm", serie: "B"},
				"B7": { width: 88, height: 125, unit: "mm", serie: "B"},
				"B8": { width: 62, height: 88, unit: "mm", serie: "B"},
				"B9": { width: 44, height: 62, unit: "mm", serie: "B"},
				"B10": { width: 31, height: 44, unit: "mm", serie: "B"},
				"B11": { width: 22, height: 31, unit: "mm", serie: "B"},
				"B12": { width: 15, height: 22, unit: "mm", serie: "B"},
				"B13": { width: 11, height: 15, unit: "mm", serie: "B"},
				'B0+': { width: 1030, height: 1456, unit: "mm", serie: "B"},
				'B1+': { width: 728, height: 1030, unit: "mm", serie: "B"},
				'B2+': { width: 515, height: 728, unit: "mm", serie: "B"},

				'C0': { width: 917, height: 1297, unit: "mm", serie: "C"},
				'C1': { width: 648, height: 917, unit: "mm", serie: "C"},
				'C2': { width: 458, height: 648, unit: "mm", serie: "C"},
				'C3': { width: 324, height: 458, unit: "mm", serie: "C"},
				'C4': { width: 229, height: 324, unit: "mm", serie: "C"},
				'C5': { width: 162, height: 229, unit: "mm", serie: "C"},
				'C6': { width: 114, height: 162, unit: "mm", serie: "C"},
				'C7': { width: 81, height: 114, unit: "mm", serie: "C"},
				'C8': { width: 57, height: 81, unit: "mm", serie: "C"},
				'C9': { width: 40, height: 57, unit: "mm", serie: "C"},
				'C10': { width: 28, height: 40, unit: "mm" , serie: "C"},

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
				result = `Le format optimal pour imprimer cette image sans rogner est : ${bestFormat}. Ratio de l'image : ${width}x${height} (${imageRatio.toFixed(2)}). Ratio du papier ${bestFormat} : ${formats[bestFormat].width}x${formats[bestFormat].height}`;
			} else {
				const bestPaperRatio = Math.max(formats[bestFormat].width, formats[bestFormat].height) / Math.min(formats[bestFormat].width, formats[bestFormat].height);
				result = `Le format optimal pour imprimer cette image en minimisant le rognage est : ${bestFormat}. Ratio de l'image : ${width}x${height} (${imageRatio.toFixed(2)}). Ratio du papier ${bestFormat} : (${bestPaperRatio.toFixed(2)})`;
			}

			document.getElementById('result').textContent = result;
		};
	};

	reader.readAsDataURL(file);
});
