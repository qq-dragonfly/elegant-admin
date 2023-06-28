import { IconJson } from './data';
import { cloneDeep } from 'lodash-es';
export function getIconList() {
	let iconList: any = cloneDeep(IconJson);
	let files: any = import.meta.globEager('../../assets/icons/*.svg');
	const svgNames: any = [];

	for (const key in files) {
		const filename: any = key.replace(/(\..\/..\/assets\/icons\/local-|\.(svg))/g, '');
		svgNames.push(filename);
	}
	iconList['local-'] = svgNames;

	return iconList;
}
