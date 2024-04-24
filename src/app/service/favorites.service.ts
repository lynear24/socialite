import { Injectable } from "@angular/core";
import { ImageItem } from "./Models";
// import { Set } from "immutable";

@Injectable({
	providedIn: "root",
})
export class FavoritesService {
	// Use set for distinct posts

	favs: Set<ImageItem> = new Set<ImageItem>([]);
	constructor() {}

	addFavorite(img: ImageItem) {
		this.favs.add(img);
		// console.log(this.favs);
	}

	removeFavorite(img: ImageItem) {
		this.favs.forEach((obj) => {
			if (obj._id === img._id) {
				this.favs.delete(obj);
			}
		});
	}

	// togglefav(image_id: number): void {
	// 	var found_image = images.find((x) => x.id === image_id);
	// 	if (found_image) {
	// 		found_image.isFaved = !found_image.isFaved;
	// 	}
	// }
}
