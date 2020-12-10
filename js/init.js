if (navigator.serviceWorker){
    if(window.location.href.includes("localhost")){
    navigator.serviceWorker.register("/sw.js");
    }else{
        navigator.serviceWorker.register("/breakingbad/sw.js");
    }
}


window.mostrar = (personajes)=>{
    const molde = document.querySelector(".molde-per");
    const contenedor = document.querySelector(".contenedor");
    for(let i=0; i < personajes.length; ++i){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector(".nombre-per").innerText = p.name;
        copia.querySelector(".img-per").src = p.img;
        contenedor.appendChild(copia);
    }


};

window.addEventListener('DOMContentLoaded',async()=>{
    let respuesta = await axios.get("https://www.breakingbadapi.com/api/characters");
    let personajes = respuesta.data;
    window.mostrar(personajes);
});