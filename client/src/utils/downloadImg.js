import FileSaver from "file-saver";

export async function downloadImage(_id, photo_url) {
  FileSaver.saveAs(photo_url, `download-${_id}.jpg`);
}
