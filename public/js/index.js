const postUrl = async () => {
  const data ={
    url: document.getElementById('url-input').value
  }

  const postData = await fetch('/api/shorturl/new',
  {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
   const response = await postData.json();
   const modal = document.getElementById('myModal');
   const buttonModal = document.getElementsByClassName('close')[0];
   const dataModal = document.getElementById('modal-data');
   if(response.error){
     dataModal.textContent = `Eror en el guardado de datos, conexión incorrecta o URL invalida, intente de nuevo`;
   }else{
    dataModal.textContent = `Guardado exitoso, la url valida almacenada es: ${response.original_url}
      y su id es ${response.short_url}, pruebalo en la url!`;  
   }

   modal.style.display = 'block';
   buttonModal.onclick = () => modal.style.display = "none";
   window.onclick = (event) => event.target == modal ? modal.style.display = 'none' : '';
}