import FileSaver from "file-saver";

export async function downloadImage({ id, url }) {
  url = url.split("/");
  url[url.length - 2] = "fl_attachment";
  console.log(id, url.join("/"));
  FileSaver.saveAs(url.join("/"), `dallE-${id}`);
}
