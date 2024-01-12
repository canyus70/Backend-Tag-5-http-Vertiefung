console.log("inside gaestebuch.js");
fetch("/api/index")
  .then((res) => res.json())
  .then((eintrag) => {
    console.log(eintrag);
    renderServicesList(eintrag);
  });

function renderServicesList(eintragArray) {
  const listItemArray = eintragArray.map((eintrag) => {
    // Ein service schaut so aus { firstname: string, lastname: string, commentar: string , date: number }
    const listItem = document.createElement("li");
    listItem.innerHTML = `${eintrag.firstname}   ${eintrag.lastname}, ${eintrag.commentar}  ,${eintrag.date}`;
    return listItem;
  });
  const ul = document.createElement("ul");
  ul.append(...listItemArray);
  document.body.appendChild(ul);
}