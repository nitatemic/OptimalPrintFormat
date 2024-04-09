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
				'A4': { width: 210, height: 297 },
				'A5': { width: 148, height: 210 },
				// Ajoutez d'autres formats d'image au besoin
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
