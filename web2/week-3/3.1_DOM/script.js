function addTODO() {
  const value = document.querySelector("input").value;
  const spanElement = document.createElement("span");
  const buttonElement = document.createElement("button");
  spanElement.innerHTML= value;
  buttonElement.innerHTML = "Delete";

  const ulElement = document.createElement("ul");
  ulElement.appendChild(spanElement);
  ulElement.appendChild(buttonElement);
  
  document.querySelector("body").appendChild(ulElement);
}

