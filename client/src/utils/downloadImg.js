import FileSaver from "file-saver";

export async function downloadImage({ id, url, cloudinaryUrl = false }) {
  if (cloudinaryUrl) {
    url = url.split("/");
    url[url.length - 2] = "fl_attachment";
    url = url.join("/");
  }
  FileSaver.saveAs(url, `dallE-${id}`);
}
