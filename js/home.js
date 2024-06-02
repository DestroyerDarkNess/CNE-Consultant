import { consultCneDataApi } from "./api.js";
import { CardData } from "../utils/constans.js";
import { Counter } from "../utils/constans.js";
import { API_HOST } from "../utils/constans.js";

let CounterIFRAME = null;
onload = (event) => {
  if (CounterIFRAME == null) {
    CounterIFRAME = Counter;
  }

  document.getElementById("preview-result").innerHTML = CounterIFRAME;

  console.log(
    "%c Para quitar el anuncio DEMO , de la cuenta regresiva, siga los pasos a continuacion :",
    "background: #222; color: #ff0000"
  );

  console.log(
    "%c 1) Preciona click derecho en la palabra DEMO.",
    "background: #222; color: #ff0000"
  );

  console.log(
    "%c 2) Seleccione INSPECCIONAR / INSPECCIONAR ELEMENTO",
    "background: #222; color: #ff0000"
  );

  console.log(
    "%c 3) Dirijase a la consola del navegador, y ejecute el siguiente script : ",
    "background: #222; color: #ff0000"
  );

  console.log(
    `%c
const demoDivs = document.querySelectorAll("div.demo");

await new Promise(r => setTimeout(r, 2000));

demoDivs.forEach((demoDiv) => {
  demoDiv.parentNode.removeChild(demoDiv);
});
  `,
    "background: #ffffff; color: #00ff1a"
  );
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

document
  .getElementById("searchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    searchFunction();
  });

document
  .querySelector(".search_input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchFunction();
    }
  });

const Loading = (show) => {
  const loadingStatus = document.getElementById("loading_status");
  if (show) {
    loadingStatus.setAttribute("class", "spinner-grow fixed-bottom text-light");
  } else {
    loadingStatus.setAttribute(
      "class",
      "spinner-grow fixed-bottom text-light visually-hidden"
    );
  }
};

const searchFunction = async () => {
  Loading(true);
  const searchInput = document.querySelector(".search_input").value;
  const typeDni = document.getElementById("typeDni").value;

  if (!searchInput) {
    console.error("Please provide both typeDni and searchInput");
    return;
  }

  const dataParsed = {
    typeDni: typeDni,
    dni: searchInput,
  };

  try {
    const result = await consultCneDataApi(dataParsed);

    if (result.status === "success") {
      CurrentDNI = result;
    } else {
      CurrentDNI = null;
      alert(result.data);
    }

    Loading(false);
    return LoadCardData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return false;
};

let CurrentDNI = null;
const LoadCardData = () => {
  const previewResult = document.querySelector("#preview-result");
  if (CurrentDNI != null) {
    const { name, dni, state, municipality, parish, center, address } =
      CurrentDNI.data;

    const MapAddress = `${state}, ${municipality}, ${parish}, ${center}`;
    const MapURL = CreateMapURLByAdress(MapAddress);
    //const Map = CreateMapByAdress(MapAddress);
    let card = CardData;
    previewResult.innerHTML = card;

    //Map Adress Change

    document
      .getElementById("Votacion")
      .addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("IframeMap").src = MapURL;
        document.getElementById("text-adress").textContent = MapAddress;
      });

    document
      .getElementById("Domicilio")
      .addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("IframeMap").src =
          CreateMapURLByAdress(address);
        document.getElementById("text-adress").textContent = address;
      });

    //exportar
    document
      .getElementById("ToImage")
      .addEventListener("click", function (event) {
        event.preventDefault();
        ExportPNG(dni.replace("-", "_"));
      });

    document
      .getElementById("ToPDF")
      .addEventListener("click", function (event) {
        event.preventDefault();
        ExportPDF(dni.replace("-", "_"));
      });

    //
    document.getElementById("post_url").value = API_HOST;
    document.getElementById("PersonName").textContent = name;
    document.getElementById("DNI_Input").value = dni;
    document.getElementById("IframeMap").src = MapURL;
    document.getElementById("text-adress").textContent = MapAddress;
    document.getElementById("code-container").textContent = JSON.stringify(
      CurrentDNI.data,
      null,
      " "
    );

    // previewResult.setAttribute("class", "visually");
    return true;
  } else {
    previewResult.innerHTML = CounterIFRAME;
    // previewResult.setAttribute("class", "visually-hidden");
    return false;
  }
};

const CreateMapURLByAdress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  const src = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedAddress}&t=p&z=17&ie=UTF8&iwloc=B&output=embed`;
  return src;
};

const CreateMapIframe = (MapUrl) => {
  const iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "600";
  iframe.src = MapUrl;

  return iframe;
};

const ExportPNG = (name) => {
  const CardDiv = document.querySelector("#CardInfo");

  html2canvas(CardDiv).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${name}.png`;
    link.click();
  });
};

const ExportPDF = (name) => {
  const CardDiv = document.querySelector("#CardInfo");
  html2canvas(CardDiv).then((canvas) => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("landscape");
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save(`${name}.pdf`);
  });
};
