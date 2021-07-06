let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.getElementById("input_btn");
const ulEl = document.querySelector("#ul_el");
const deleteBtn = document.querySelector("#delete_btn");
const tabBtn = document.getElementById("tab_btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); //get the element stored in local storage&turn it back into into a array with JSON

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let itemsList = "";
  for (let i = 0; i < leads.length; i++) {
    //itemsList+="<li><a target='_blank' href='"+leads[i]+"'>"+leads[i]+"</a></li>"; atrenative code
    itemsList += `
		<li><a target='_blank' href='${leads[i]}'> 
				${leads[i]}
			</a>
		</li>`; //expression using template literals
    console.log(itemsList);
  }
  ulEl.innerHTML = itemsList;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); //storing the element into the local storage&turn my array into a string with JSON
  console.log(localStorage.getItem("myLeads"));
  render(myLeads);
});
