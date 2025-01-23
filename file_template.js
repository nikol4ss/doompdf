//https://stackoverflow.com/a/62364519
function b64_to_uint8array(str) {
  const abc = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"]; // base64 alphabet
  let result = [];

  for(let i=0; i<str.length/4; i++) {
    let chunk = [...str.slice(4*i,4*i+4)]
    let bin = chunk.map(x=> abc.indexOf(x).toString(2).padStart(6,0)).join(''); 
    let bytes = bin.match(/.{1,8}/g).map(x=> +('0b'+x));
    result.push(...bytes.slice(0,3 - (str[4*i+2]=="=") - (str[4*i+3]=="=")));
  }
  return new Uint8Array(result);
}

var file_data = b64_to_uint8array("__iwad_file__");
var file_name = "__iwad_filename__"
var file2_data = b64_to_uint8array("__wad_file__");
var file2_name = "__wad_filename__"

if (file_data.length <= 9) {
  throw "Error: IWAD not found.";
}
if (file2_data.length <= 9) {
  file2_data = null;
}
else {
  Module.arguments = ["-file", file2_name];
}