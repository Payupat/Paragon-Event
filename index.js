// window.location.href = "../summary/";

var sub_role = localStorage.getItem("sub_role");
if (sub_role === "2") {
  window.location.href = "../electrical/lighting/";
} else {
  window.location.href = "../summary/";
}
