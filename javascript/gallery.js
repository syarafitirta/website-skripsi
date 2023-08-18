window.addEventListener("load", function () {
  const data = [
    {
      id: 1,
      title: "food & drink",
      image: [
        "../assets/foto/food1.png",
        "../assets/foto/food2.png",
        "../assets/foto/food3.png",
        "../assets/foto/food4.png",
        "../assets/foto/food5.png",
      ],
    },
    {
      id: 2,
      title: "indoor",
      image: [
        "../assets/foto/indoor1.png",
        "../assets/foto/indoor2.png",
      ],
    },
    {
      id: 3,
      title: "outdoor",
      image: [
        "../assets/foto/outdoor1.png",
        "../assets/foto/outdoor2.png",
        
      ],
    },
    {
      id: 4,
      title: "event",
      image: [
        "../assets/foto/event1.png",
        "../assets/foto/event2.png",
        "../assets/foto/outdoor3.png",
      ],
    },
  ];

  let renderGallery = document.getElementById("gallery");

  data.map((item, index) => {
    return (renderGallery.innerHTML += `
    <section class="gallery-content" key=${index}>
        <div class="gallery-title">
        <div class="line small"></div>
            <h2>${item.title}</h2>
        </div>
        <figure class="gallery-row">
            ${item.image.map((img, index) => {
              return `
              <div key=${index} class="gallery-card">
                <img src=${img} alt="menu icon"  />  
              </div>
              `;
            })}
        </figure>
    </section>`);
  });
});
