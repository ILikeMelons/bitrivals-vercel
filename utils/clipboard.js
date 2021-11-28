

export const copy = (id) => {
    var address = document.getElementById(id).value;
    navigator.clipboard.writeText(address);
  };