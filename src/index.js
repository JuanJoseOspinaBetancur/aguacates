const API = "https://platzi-avo.vercel.app/";
const appNode = document.getElementById("app");

/* Api de internacionalizacion, sirve para dar formato a fecha y a monedas */
const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

async function getData(url) {
  const response = await fetch(`${url}api/avo`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  const datos = data.data;
  const todosItems = [];

  datos.forEach((dato) => {
    console.log(dato);
    /* Creamos */
    const imagen = document.createElement("img");
    imagen.src = `${url}${dato.image}`; //url de la imagen;
    imagen.alt = `${url}${dato.image}`;

    imagen.className = "rounded-full w-auto h-auto";
    const title = document.createElement("h2");
    title.textContent = dato.name;
    title.setAttribute("class", "text-3xl font-bold");

    const price = document.createElement("p");
    price.className = "font-bold text-black";
    price.textContent = formatPrice(dato.price);
    /* Añadimos */

    const container1 = document.createElement("div");
    container1.append(imagen);
    container1.className = "justify-center";
    const container2 = document.createElement("div");
    container2.append(title, price);

    const containerPrincipal = document.createElement("div");
    console.log("containerPrincipal", containerPrincipal);
    containerPrincipal.setAttribute(
      "class",
      "w-auto flex justify-center items-center space-x-11 rounded-lg hover:bg-gray-200 mt-11"
    );
    containerPrincipal.append(container1, container2);
    todosItems.push(containerPrincipal);
  });
  appNode.append(...todosItems);
}

getData(API);
