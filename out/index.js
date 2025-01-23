const from_id = (id) => {return document.getElementById(id)};
const custom_wad_checkbox = from_id("custom_wad_checkbox");
const wad_file_picker = from_id("wad_file_picker");
const iwad_file_picker = from_id("iwad_file_picker");
const wad_container = from_id("wad_container");
const play_button = from_id("play_button");
const shareware_note = from_id("shareware_note");

custom_wad_checkbox.onchange = () => {
  if (custom_wad_checkbox.checked) {
    wad_container.style.display = "flex";
    shareware_note.style.display = "none";
  }
  else {
    wad_container.style.display = "none";
    shareware_note.style.display = "initial";
  } 
}

play_button.onclick = (event) => {
  if (!custom_wad_checkbox.checked) 
    return;
  event.stopImmediatePropagation();
  event.preventDefault();

  launch_custom_wads();
}

function get_file_b64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = error => reject(error);
  });
}

async function launch_custom_wads() {
  let iwad_file = iwad_file_picker.files[0];
  if (!iwad_file)
    alert("Error: No IWAD file selected.");
  let pwad_file = wad_file_picker.files[0];

  let response = await fetch("/doom_nowad.pdf");
  let pdf = await response.text();

  let iwad_b64 = await get_file_b64(iwad_file);
  pdf = pdf.replace("__iwad_file__", iwad_b64);
  pdf = pdf.replace("__iwad_filename__", iwad_file.name);

  if (pwad_file) {
    let pwad_b64 = await get_file_b64(pwad_file);
    pdf = pdf.replace("__wad_file__", pwad_b64);
    pdf = pdf.replace("__wad_filename__", pwad_file.name);  
  }

  let blob = new Blob([pdf], {type: "application/pdf"});
  open(URL.createObjectURL(blob));
}