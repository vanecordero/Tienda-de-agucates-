const baseUrl= "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app");

/*
//web api
window.fetch("https://platzi-avo.vercel.app/api/avo")
.then(response => response.json())
.then(resJson =>{
  resJson.data.forEach(item => {
    console.log(item.name)
  });
});
*/

const formatPrice=(price)=>{
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style:'currency',
    currency: "USD"
  }).format(price);
  
 return newPrice;
}

fetch(`${baseUrl}/api/avo`)
	.then((res) => res.json())
	.then((data) => {
		//creamos el fragment
		let fragment = document.createDocumentFragment();
console.log(data)
		data.data.forEach((item) => {
			let image = document.createElement('img');
      image.src = baseUrl+item.image;
      image.className = "avo_img rounded-full w-2/6";

			let title = document.createElement('h2');
      title.textContent = item.name;
      title.className = "text-xl font-bold text-gray-800";

			let price = document.createElement('span');
      price.textContent = formatPrice(item.price);
      price.className = "text-lg";

			const ctnData = document.createElement('div');
      ctnData.className = "px-8 pt-6 text-left";
      ctnData.append(title, price);

			const container = document.createElement('div');
			container.append(image, ctnData);
      container.className ="w-2/5 m-3 p-2 flex flex-nowrap hover:bg-green-50 border rounded border-gray-200 hover:bg-green-200"
			//agregamos los nodos al fragment y no al DOM directamente
			fragment.appendChild(container);
		});
		//solo renderizamos una sola vez el DOM
		appNode.append(fragment);
	}); 
